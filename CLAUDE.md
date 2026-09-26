# Notes for Claude Code

Context for this repo that is not obvious from the code. Written during the
rework that replaced the template author's identity, swapped the hero
background and added the language switch.

## Workflow

- Develop on `claude/github-site-work-8x8cwj`, then fast-forward `main` onto it
  and push both. The owner asked for the merge to happen on every change,
  without being asked each time.
- Deploy is **manual and not part of the merge**: no GitHub Actions here, the
  site goes live with `npm run deploy` (build + `wrangler deploy` to the
  `portfolio` Worker). It needs Cloudflare credentials the CI container does
  not have, so the owner runs it.

## Pre-existing lint baseline: 5 errors

`npx eslint .` reports **5 errors** on a clean tree: `process` undefined in
`vite.config.js` (x2), `src/worker.js` and `functions/api/send-email.js`; and
unused `ctx` in `src/worker.js`. A run that reports 5 has introduced nothing.
It was 6 until the stage video gave `useRef` in `src/components/Timeline.jsx`
something to do. `src/lib/threejs-toys-patched.js` is excluded in
`eslint.config.js` because it is a vendored upstream bundle.

## Known cleanup, deliberately left alone

Each of these was found and verified, then left because it was outside the task
at hand. Worth picking up during a debug or cleanup pass.

1. **Three redundant `user-select: none` rules.** `src/styles/tokens.css` now
   turns selection off on `body` site-wide, so the per-component copies in
   `src/styles/pages/hero.css`, `src/styles/pages/skills.css` and
   `src/styles/components/project-modal.css` no longer do anything. Harmless,
   but they suggest the rule is local when it is global.
2. **`ThreeBackground.jsx` and `shaders.js` are unused.** They are the raymarched
   black hole the butterfly swarm replaced. Nothing imports them, so the
   bundler drops them; they were kept so the old background can be restored
   without digging through history. `src/assets/penrose-triangle.png` is the
   same story: the owner supplied it for a version of timeline stage 01 that
   was reverted, and Vite only emits assets something imports, so it costs the
   build nothing.
3. **The template author's links are still live.** The email is the owner's,
   and the telemetry deck no longer carries any of these, but the rest do:
   `Footer.jsx` (GitHub `DineshS36`, the LinkedIn profile, the WhatsApp
   number), the three project repos in `Work.jsx`, and the GitHub API calls in
   `src/worker.js` that read that account's stats. The owner chose to defer
   these.
4. **`canonical` and `og:url` point at `dinesh-portfolio.pages.dev`.** Search
   engines will treat that domain as the original of this site, and social
   previews will look for the image there.
5. **The project content is not the owner's.** The three projects in `Work.jsx`
   and the timeline entries describe the template author's work. They are
   translated into good Italian, which makes this easy to miss.

## Conventions worth keeping

- **Translation scope.** `src/i18n/translations.js` holds prose only. Navigation,
  section badges, metric labels, tech names, product titles and form field
  labels stay English in both languages by design. Inside a content block,
  headings are translated with their paragraph, so no card mixes an English
  heading over Italian text. Italian is the default; a missing key falls back
  to it rather than rendering blank.
- **`.font-label` is the bold UI face, not a monospace one.** It was called
  `.font-mono` until the site moved to Helvetica Neue. Only two things still use
  a different face, both pinned explicitly: the `WEB` / `DEVELOPER` headline
  (`--font-display`, Inter) and the globe's `EXPLORE` / `[ ABOUT ]` label
  (`--font-mono`, Space Mono).
- **Helvetica has two cuts.** Weights are 400 or 700 everywhere; the headline's
  900 is the single exception, and it is on Inter.
- **The dock and the controls pill share `--dock-inner-height`.** They are meant
  to read as one bar. Changing one without the other breaks that.
- **`useAudio` is not safe to call twice.** It keeps `isMuted` in component state
  while the gain node behind it is a module singleton, so a second caller
  renders a control that disagrees with what you hear. `SiteControls` takes the
  audio state as props for this reason.
- **The vendored `threejs-toys` build carries local changes.** Beyond the
  upstream `vUv` → `vMapUv` patch it has a `dispose()` and a `setPaused()` that
  upstream lacks; without them the render loop, resize listener and WebGL
  context outlive the component, and StrictMode's double mount leaves two.
  Re-vendoring from upstream would silently drop both.

## Component libraries: installed, not used yet

The owner asked for these to be available for future components. Nothing
imports them yet, and the build was byte-identical to the one before they were
added (bar `class="dark"` on `<html>`).

- **Packages.** `motion` (Framer Motion's current name; import from
  `motion/react`), `@react-three/fiber` + `@react-three/drei`,
  `@splinetool/react-spline` + `@splinetool/runtime`, `@tsparticles/react` +
  `@tsparticles/engine` + `@tsparticles/slim`, and `clsx` + `tailwind-merge`
  behind `cn()` in `src/lib/utils.js`. GSAP and three were already here.
  TresJS was left out: it is Vue.
- **Tailwind is scoped to `src/components/ui`.** It exists for the copy-paste
  collections, not the site: no preflight, unlayered utilities, and only `ui/`
  is scanned. `src/styles/tailwind.css` says why each of the three matters.
  `dark:` keys off the `dark` class on `<html>`, since the site is always dark.
- **Copy-paste collections come in through the shadcn CLI.** `components.json`
  registers `@aceternity`, `@cult-ui` and `@motion-primitives`, so
  `npx shadcn@latest add @aceternity/aurora-background` converts the component
  to JSX and writes it into `ui/`. Both the `ui` and `components` aliases point
  there so Tailwind sees everything the CLI writes. The container's network
  policy blocks those hosts and ui.shadcn.com. Open-source collections publish
  the same registry JSON on GitHub (Motion Primitives: `public/c/<name>.json`),
  and `REGISTRY_URL=https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/v4/public/r`
  covers the file the CLI itself fetches.
- **`manualChunks` names seven packages exactly, on purpose.** Every named
  chunk loads on the first visit, and under Rolldown a named chunk takes the
  dependencies of what it matches with it. The old substring rules (`'react'`,
  `'three'`, a catch-all) shipped any new library up front, lazy or not: a test
  build put the whole 4 MB Spline runtime there. Load the heavy ones (Spline,
  R3F, particles) behind `React.lazy` and they stay out of the first load.
- **R3F costs about 200 KB up front even when lazy.** It imports the whole
  THREE namespace, and three is one module shared with the butterflies, so
  `vendor-three` stops being tree-shaken: 544 KB became 746 KB in a test build.
- **tsParticles is v4.** `initParticlesEngine` is gone, and most examples
  online still use it. Wrap the tree in `<ParticlesProvider init={fn}>`, with
  `fn` defined at module level: the provider throws if it changes.

## Checking a change

There are no tests. What this repo has instead:

```
npm run lint    # expect 5 errors, see above
npm run build
```

For anything visual, drive the built site in a browser rather than trusting the
diff. Chromium and Playwright are available in the Claude Code container
(`/opt/pw-browsers/chromium`). Two things do not render faithfully there:
Helvetica Neue is not installed on Linux, and Google Fonts fails to load
because Chromium does not trust the proxy CA, so Inter and Space Mono fall back
too. Computed `font-family` and `font-weight` can still be asserted; the glyphs
on screen cannot. The butterfly swarm runs on SwiftShader there, so frame times
are useful for comparing two builds and meaningless as absolute numbers. That
Chromium also ships without H.264: `canPlayType('video/mp4; codecs="avc1..."')`
comes back empty and the stage video fails with DEMUXER_ERROR_NO_SUPPORTED_
STREAMS, so its picture cannot be checked there. The bundled ffmpeg under
`/opt/pw-browsers/ffmpeg-1011` cannot decode it either; it is built for webm
only. Everything around the video still can be: the element, its attributes,
the box it fills, and that the file is served.

## MCP servers

`.mcp.json` registers three stdio servers, pre-approved in
`.claude/settings.json`: `context7` (library docs), `browser` (Puppeteer) and
`thinking` (sequential thinking). They load at session start, not mid-session.

- **`browser` needs `DOCKER_CONTAINER=true`.** Without it the server launches a
  headed Chrome, and as root Chromium refuses to start without `--no-sandbox`.
  The flag switches it to headless with the sandbox off. It drives Puppeteer's
  own Chrome 131, downloaded on first run, not `/opt/pw-browsers`. The package
  is deprecated upstream but still works.
- **There is no Figma entry on purpose.** `npx @composio/mcp setup figma` is a
  deprecated one-shot installer, not a server: it writes a broken entry into
  Claude Desktop's config and exits. Figma comes from the claude.ai connector.
