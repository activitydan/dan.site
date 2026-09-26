# Cult UI

79 componenti copiati da [nolly-studio/cult-ui](https://github.com/nolly-studio/cult-ui) (commit `ee98a5d`), il sorgente di [www.cult-ui.com](https://www.cult-ui.com). Licenza MIT: vedi [`LICENSE.md`](LICENSE.md), che va tenuto insieme ai file.

Per usarne uno, dalla cartella del progetto:

```
npx shadcn@latest add ./COMPONENTI/cult-ui/<nome>/<nome>.json
```

| Componente | Cosa fa | Dipendenze npm |
|---|---|---|
| [`ai-instructions`](ai-instructions/) | Manage and toggle AI instructions with a popover, search, and create-dialog | `@hugeicons/core-free-icons`, `@hugeicons/react` |
| [`animated-number`](animated-number/) | Number component with smooth counting animations and customizable formatting | `motion` |
| [`bg-animate-button`](bg-animate-button/) | Button component with animated background effects and gradient transitions | — |
| [`bg-animated-fractal-dot-grid`](bg-animated-fractal-dot-grid/) | Background animated fractal dot grid with performance optimization and responsive design | `motion` |
| [`bg-animated-gradient`](bg-animated-gradient/) | Animated gradient background component with customizable color transitions | `motion` |
| [`bg-image-texture`](bg-image-texture/) | Background texture component with multiple texture variants and customizable opacity | — |
| [`bg-media`](bg-media/) | Background media component with video/image support and overlay effects | — |
| [`border-beam-button`](border-beam-button/) | Shadcn Button wrapped in Border Beam: animated border glow with compact icon and text variants | `border-beam` |
| [`canvas-fractal-grid`](canvas-fractal-grid/) | Interactive canvas-based fractal dot grid with mouse tracking and wave effects | `motion` |
| [`choice-poll`](choice-poll/) | Poll component with single or multiple selection, optional results, and keyboard navigation | `@radix-ui/react-use-controllable-state`, `lucide-react` |
| [`code-block`](code-block/) | A beautiful code block component with tabs, copy functionality, and smooth animations | `motion` |
| [`color-picker`](color-picker/) | Interactive color picker component with HSL support and preset colors | `motion` |
| [`cosmic-button`](cosmic-button/) | Animated button/link with cosmic gradient border effect, renders as anchor or button | — |
| [`cutout-card`](cutout-card/) | Image card with cutout corners, hover motion, inset labels, pins, and reveal actions | `motion`, `@radix-ui/react-use-controllable-state` |
| [`direction-aware-tabs`](direction-aware-tabs/) | Tab component with direction-aware animations and smooth transitions | `motion`, `react-use-measure` |
| [`distorted-glass`](distorted-glass/) | A glass morphism effect component using SVG filters with fractal noise to create visual transitions between sections | — |
| [`dither-image`](dither-image/) | Compound Next.js image figure with CSS Bayer dither via dither-plugin, partial reveal overlays, and typed tuning props | `dither-plugin` |
| [`dither-image-demo-upload`](dither-image-demo-upload/) | — | — |
| [`dock`](dock/) | macOS-style dock component with hover effects and smooth animations | `motion` |
| [`dynamic-island`](dynamic-island/) | iOS-style dynamic island component with expandable content and smooth animations | `motion` |
| [`edge-blur`](edge-blur/) | Stacked backdrop-blur layers with a gradient mask for soft top or bottom screen edges | — |
| [`expandable`](expandable/) | Expandable component system with smooth animations and customizable presets | `motion` |
| [`expandable-screen`](expandable-screen/) | A full-screen expandable component with morphing animations using shared layout IDs for smooth transitions | `motion`, `lucide-react` |
| [`family-button`](family-button/) | Button component with family-style design and interactive hover effects | — |
| [`family-drawer`](family-drawer/) | A multi-view drawer component with smooth animations, view navigation, and customizable content views | `motion`, `react-use-measure`, `vaul`, `@radix-ui/react-slot` |
| [`feature-carousel`](feature-carousel/) | Feature carousel component with smooth transitions and customizable layouts | `motion` |
| [`feature-poll`](feature-poll/) | Feature poll component with single or multiple selection, optional results, and keyboard navigation | `@radix-ui/react-use-controllable-state`, `lucide-react` |
| [`feature-voting`](feature-voting/) | List of features with up-vote support, optional sorting by vote count, and controlled or uncontrolled state | `@radix-ui/react-use-controllable-state` |
| [`floating-panel`](floating-panel/) | Floating panel component with backdrop blur and position-aware animations | `motion` |
| [`gradient-button-group`](gradient-button-group/) | Premium layered button group with animated active state, gradient ring accents, and theme toggle underlay | `motion` |
| [`gradient-heading`](gradient-heading/) | Heading component with gradient text effects and customizable styling | `@radix-ui/react-slot` |
| [`grid-beam`](grid-beam/) | Canvas grid beam animation with palette presets, SVG dividers, and composable headless pieces via useGridBeam | — |
| [`hero-color-panel`](hero-color-panel/) | Split-layout hero section with responsive ColorPanels shader visuals, CTA, and tech stack badges | `@paper-design/shaders-react` |
| [`hero-dithering`](hero-dithering/) | Split-layout hero section with responsive dithering shader visuals, CTA, and tech stack badges | `@paper-design/shaders-react` |
| [`hero-heatmap`](hero-heatmap/) | Split-layout hero section with responsive Heatmap shader visuals, CTA, and tech stack badges | `@paper-design/shaders-react` |
| [`hero-liquid-metal`](hero-liquid-metal/) | Split-layout hero section with responsive LiquidMetal shader visuals, CTA, and tech stack badges | `@paper-design/shaders-react` |
| [`hero-static-radial-gradient`](hero-static-radial-gradient/) | Split-layout hero section with responsive StaticRadialGradient shader visuals, CTA, and tech stack badges | `@paper-design/shaders-react` |
| [`hover-video-player`](hover-video-player/) | Video player component that plays on hover with smooth animations | `motion` |
| [`intro-disclosure`](intro-disclosure/) | Intro disclosure component with expandable content and smooth animations | `motion`, `react-use-measure` |
| [`lightboard`](lightboard/) | Interactive lightboard component with customizable grid and lighting effects | — |
| [`loading-carousel`](loading-carousel/) | Loading carousel component with smooth transitions and customizable content | `embla-carousel-autoplay`, `lucide-react`, `motion` |
| [`logo-carousel`](logo-carousel/) | Animated logo carousel with staggered animations and customizable columns | `motion` |
| [`metal-button`](metal-button/) | Shadcn Button wrapped in MetalFx: animated liquid metal ring with text and icon variants | `metal-fx` |
| [`minimal-card`](minimal-card/) | Clean and minimal card component with subtle styling and hover effects | — |
| [`mock-browser-window`](mock-browser-window/) | A customizable browser window mockup component with support for Chrome, Safari, and generic styles, customizable sidebars, and themes | — |
| [`morph-surface`](morph-surface/) | A morphing surface component with smooth animations, customizable dimensions, and configurable content | `motion` |
| [`neumorph-button`](neumorph-button/) | Neumorphic button component with soft shadows and tactile interaction effects | — |
| [`neumorph-eyebrow`](neumorph-eyebrow/) | Neumorphic eyebrow component with soft shadow effects and modern styling | — |
| [`onboarding`](onboarding/) | Composable multi-step onboarding primitives: Onboarding root with step navigation, FeatureCarousel, ChoiceGroup radio selector, TipsList, and StepIndicator with dots and pills variants | `@radix-ui/react-use-controllable-state`, `class-variance-authority` |
| [`pixel-heading-character`](pixel-heading-character/) | Per-character pixel-font heading with four animation modes using Geist pixel fonts | `geist` |
| [`pixel-heading-word`](pixel-heading-word/) | Whole-word pixel-font heading that swaps or cycles fonts on hover using Geist pixel fonts | `geist` |
| [`pixel-paragraph-words`](pixel-paragraph-words/) | Paragraph where specific words render in an interactive pixel font that swaps or cycles on hover | `geist` |
| [`pixel-paragraph-words-inverse`](pixel-paragraph-words-inverse/) | Paragraph in pixel font where specific words escape into interactive sans/mono with hover swap or cycle | `geist` |
| [`poll-widget`](poll-widget/) | Poll widget with inline, popover, and dialog modes, optional results, and animations | `@radix-ui/react-use-controllable-state`, `class-variance-authority`, `lucide-react`, `motion` |
| [`popover`](popover/) | Animated popover component with form support and smooth transitions | `motion` |
| [`popover-form`](popover-form/) | Form popover component with success states and animated transitions | `motion` |
| [`prompt-library`](prompt-library/) | Browse, insert, and manage prompt templates with categories and custom prompts | `@hugeicons/core-free-icons`, `@hugeicons/react` |
| [`shader-lens-blur`](shader-lens-blur/) | WebGL shader component with lens blur effects and mouse interaction | `motion`, `three`, `jotai` |
| [`shift-card`](shift-card/) | Card component with shift animation effects and hover interactions | — |
| [`side-panel`](side-panel/) | Sliding side panel component with customizable positioning and animations | — |
| [`sortable-list`](sortable-list/) | Drag-and-drop sortable list component with smooth animations and reordering | `motion`, `react-use-measure` |
| [`squiggle-arrow`](squiggle-arrow/) | A playful, hand-drawn squiggly arrow component with customizable variants, directions, and sizes | — |
| [`stripe-bg-guides`](stripe-bg-guides/) | Stripe-style background guides component with animated patterns and effects | `motion` |
| [`svg-bands`](svg-bands/) | Wide SVG section bands, battlement and zigzag trims, steep hero edges, and ornamental frames | — |
| [`svg-shapes`](svg-shapes/) | Wide-aspect SVG shape and panel components for backgrounds and hero decorations | — |
| [`svg-shapes-animated`](svg-shapes-animated/) | Scroll-triggered stroke-draw animations for wide SVG shapes and panels using Motion | `motion` |
| [`terminal-animation`](terminal-animation/) | Composable terminal animation primitives with typed command playback, tabbed scenarios, and customizable output rendering | `@radix-ui/react-slot`, `@radix-ui/react-use-controllable-state` |
| [`text-animate`](text-animate/) | Animated text component with customizable reveal effects and timing | `motion` |
| [`text-gif`](text-gif/) | Text component with GIF-like animation effects and customizable styling | — |
| [`texture-button`](texture-button/) | Button component with texture overlay effects and customizable variants | `@radix-ui/react-slot` |
| [`texture-card`](texture-card/) | Card component with texture background and customizable styling options | — |
| [`texture-overlay`](texture-overlay/) | Texture overlay component with various CSS gradient patterns for adding visual texture to backgrounds | — |
| [`three-d-carousel`](three-d-carousel/) | 3D carousel component with perspective effects and smooth item transitions | — |
| [`timer`](timer/) | Countdown timer component with customizable duration and visual styles | — |
| [`toolbar-expandable`](toolbar-expandable/) | Expandable toolbar component with step-based navigation, smooth animations, and enhanced scrolling | `motion`, `@radix-ui/react-scroll-area` |
| [`tweet-grid`](tweet-grid/) | Grid layout component for displaying tweet-like content cards | — |
| [`typewriter`](typewriter/) | Typewriter effect component with customizable typing speed and cursor animation | `motion` |
| [`vote-tally`](vote-tally/) | List of items with up-vote support, optional sorting by vote count, and controlled or uncontrolled state | `@radix-ui/react-use-controllable-state` |
| [`youtube-video-player`](youtube-video-player/) | YouTube video player component with custom controls and smooth animations | `motion` |
