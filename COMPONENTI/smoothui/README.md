# SmoothUI

210 componenti copiati da [educlopez/smoothui](https://github.com/educlopez/smoothui) (commit `b6312bc`), il sorgente di [smoothui.dev](https://smoothui.dev). Licenza MIT: vedi [`LICENSE`](LICENSE), che va tenuto insieme ai file.

SmoothUI non pubblica i file di registro nel suo repository: qui c'è il
sorgente di ogni componente, con gli import già riscritti come fa il loro
sito. Per installarne uno con le dipendenze giuste, da un computer con
accesso a internet:

```
npx shadcn@latest add @smoothui/<nome>
```

| Componente | Cosa fa | Dipendenze npm |
|---|---|---|
| [`agent-avatar`](agent-avatar/) | Canvas-based generative pixel avatar for AI agents, unique per seed. | — |
| [`ai-approval`](ai-approval/) | Human-in-the-loop approval card where the chosen option expands to fill the card while the alternatives collapse away. | `lucide-react`, `motion` |
| [`ai-artifact`](ai-artifact/) | Generated-artifact frame whose preview and code panes swap along a shared axis rather than cross-fading. | `lucide-react`, `motion` |
| [`ai-branch`](ai-branch/) | An interactive AI branch component for displaying conversation flows. | `lucide-react`, `motion` |
| [`ai-citation`](ai-citation/) | Inline citation pill that opens an origin-aware source card, anchored to the pill it came from. | `lucide-react`, `motion` |
| [`ai-context-meter`](ai-context-meter/) | Context window meter whose ring fills and shifts hue at the warning threshold, never changing size. | `lucide-react`, `motion` |
| [`ai-conversation`](ai-conversation/) | Thread scroll container that follows the bottom only while the reader is already there, offering a jump-to-latest pill when it stops. | `lucide-react`, `motion` |
| [`ai-core`](ai-core/) | Shared AI state contract, per-state motion presets and microphone amplitude hooks for SmoothUI AI components. | `motion` |
| [`ai-diff`](ai-diff/) | Proposed code or data edit where added lines wipe in from the left and rejected lines collapse to nothing. | `lucide-react`, `motion` |
| [`ai-input`](ai-input/) | Deprecated alias for morph-surface. Kept for one release so existing installs keep resolving. | — |
| [`ai-loader`](ai-loader/) | Family of AI waiting indicators — dots, sweep bar and pixel grid — sharing one cycle length, with an optional elapsed counter. | `motion` |
| [`ai-message`](ai-message/) | Chat message bubble whose action row slides out of the bubble's own edge, revealed on hover and on focus. | `lucide-react`, `motion` |
| [`ai-orb-face`](ai-orb-face/) | Cartoon character orb whose expression carries the AI state — cursor-following gaze, natural blinks, thinking saccades, happy arcs and spiral eyes. | `motion` |
| [`ai-prompt-input`](ai-prompt-input/) | AI prompt composer with autogrowing textarea, attachment chips and a send-to-stop path morph. | `lucide-react`, `motion` |
| [`ai-reasoning`](ai-reasoning/) | Collapsible AI reasoning trace that shimmers only while the model works, reports how long it took and gets out of the way. | `lucide-react`, `motion` |
| [`ai-response`](ai-response/) | Streaming assistant text where words animate in as they arrive, with a caret that rides the last glyph and inline citation pills. | `motion` |
| [`ai-sources`](ai-sources/) | Favicon stack that fans out on hover and expands into a source list, with each favicon morphing into its row. | `lucide-react`, `motion` |
| [`ai-suggestions`](ai-suggestions/) | Prompt suggestion chips that radiate in from the centre of the row rather than sweeping left to right. | `lucide-react`, `motion` |
| [`ai-task-list`](ai-task-list/) | Live agent plan with nested steps, a drawn checkmark on completion and a travelling underline on whatever is running. | `lucide-react`, `motion` |
| [`ai-tool-call`](ai-tool-call/) | Collapsible tool invocation whose status badge is one ring that evolves — breathing, spinning, then drawing a check or a cross. | `lucide-react`, `motion` |
| [`animated-avatar-group`](animated-avatar-group/) | Stack of overlapping avatars with smooth expand/collapse animation | `motion` |
| [`animated-file-upload`](animated-file-upload/) | Animated drag-and-drop file upload component | `motion` |
| [`animated-input`](animated-input/) | A AnimatedInput component for SmoothUI. | `motion` |
| [`animated-list`](animated-list/) | A list that animates additions, removals and reordering, with an optional auto-feed mode. | `motion` |
| [`animated-number-input`](animated-number-input/) | A numeric field with rolling digits, keyboard stepping and horizontal scrub-to-change. | `motion`, `lucide-react` |
| [`animated-o-t-p-input`](animated-o-t-p-input/) | A AnimatedOTPInput component for SmoothUI. | `motion`, `lucide-react`, `input-otp` |
| [`animated-progress-bar`](animated-progress-bar/) | A AnimatedProgressBar component for SmoothUI. | `motion` |
| [`animated-stepper`](animated-stepper/) | Animated stepper/wizard component with step transitions | `motion` |
| [`animated-tabs`](animated-tabs/) | Animated tabs component with sliding indicator | `motion` |
| [`animated-tags`](animated-tags/) | A AnimatedTags component for SmoothUI. | `motion`, `lucide-react` |
| [`animated-toggle`](animated-toggle/) | Animated toggle switch with morph and icon variants | `motion` |
| [`animated-tooltip`](animated-tooltip/) | Spring-animated tooltip with multiple placement options | `motion` |
| [`aperture-blur-transition`](aperture-blur-transition/) | Persistent WebGL shader transition wrapper that swaps content behind a cinematic aperture bloom. | `motion` |
| [`app-download-stack`](app-download-stack/) | A AppDownloadStack component for SmoothUI. | `motion`, `lucide-react` |
| [`apple-invites`](apple-invites/) | A AppleInvites component for SmoothUI. | `@smoothui/data`, `motion`, `lucide-react`, `popmotion` |
| [`arcade-pixel`](arcade-pixel/) | An ArcadePixel component for SmoothUI. | `motion` |
| [`ascii-render`](ascii-render/) | An AsciiRender component for SmoothUI. | `motion` |
| [`aurora-curtain`](aurora-curtain/) | An AuroraCurtain background component for SmoothUI. | `motion` |
| [`auth-form`](auth-form/) | A presentation-only sign-in / sign-up form that reveals fields progressively and stays fully accessible. | `lucide-react`, `motion` |
| [`basic-accordion`](basic-accordion/) | A BasicAccordion component for SmoothUI. | `motion`, `lucide-react` |
| [`basic-dropdown`](basic-dropdown/) | A BasicDropdown component for SmoothUI. | `motion`, `lucide-react` |
| [`basic-modal`](basic-modal/) | A BasicModal component for SmoothUI. | `motion`, `lucide-react`, `usehooks-ts` |
| [`basic-toast`](basic-toast/) | A BasicToast component for SmoothUI. | `motion`, `lucide-react` |
| [`block-ctas`](block-ctas/) | — | — |
| [`block-faqs`](block-faqs/) | — | — |
| [`block-features`](block-features/) | — | — |
| [`block-footers`](block-footers/) | — | — |
| [`block-headers`](block-headers/) | — | — |
| [`block-logos`](block-logos/) | — | — |
| [`block-pricing`](block-pricing/) | — | — |
| [`block-stats`](block-stats/) | — | — |
| [`block-team`](block-team/) | — | — |
| [`block-testimonials`](block-testimonials/) | — | — |
| [`blur-out-up`](blur-out-up/) | A BlurOutUp text animation component for SmoothUI. | `motion` |
| [`book`](book/) | A 3D CSS book component with perspective transforms and hover animation | `motion` |
| [`border-beam`](border-beam/) | A BorderBeam component for SmoothUI. | `motion` |
| [`bottom-up-letters`](bottom-up-letters/) | A BottomUpLetters text animation component for SmoothUI. | `motion` |
| [`breadcrumb`](breadcrumb/) | Animated breadcrumb navigation with stagger-in animation | `motion`, `lucide-react` |
| [`breakpoint-indicator`](breakpoint-indicator/) | A BreakpointIndicator component for SmoothUI. | `motion` |
| [`button-copy`](button-copy/) | A ButtonCopy component for SmoothUI. | `motion`, `lucide-react` |
| [`card-swipe-deck`](card-swipe-deck/) | A CardSwipeDeck component for SmoothUI. | `motion` |
| [`checkbox`](checkbox/) | An animated Checkbox component for SmoothUI with checkmark and indeterminate state animations. | `motion`, `radix-ui` |
| [`chroma-blur-transition`](chroma-blur-transition/) | Persistent WebGL shader transition wrapper that swaps content under a soft chromatic blur wash. | `motion` |
| [`clip-corners-button`](clip-corners-button/) | A ClipCornersButton component for SmoothUI. | `motion` |
| [`code-block`](code-block/) | A CodeBlock component for SmoothUI. | `motion`, `lucide-react` |
| [`combobox`](combobox/) | An animated Combobox component for SmoothUI with text filtering, async search, and keyboard navigation. | `motion`, `lucide-react` |
| [`context-menu`](context-menu/) | An animated Context Menu component for SmoothUI with spring animations, nested submenus, and keyboard navigation. | `motion` |
| [`contribution-graph`](contribution-graph/) | A ContributionGraph component for SmoothUI. | `motion` |
| [`country-dialog`](country-dialog/) | A CountryDialog component for SmoothUI. | `motion`, `lucide-react` |
| [`coverflow-carousel`](coverflow-carousel/) | A CoverflowCarousel component for SmoothUI. | `motion` |
| [`cursor-follow`](cursor-follow/) | A CursorFollow component for SmoothUI. | `motion` |
| [`cursor-image-trail`](cursor-image-trail/) | A CursorImageTrail component for SmoothUI. | `motion` |
| [`depth-parallax-words`](depth-parallax-words/) | A DepthParallaxWords text animation component for SmoothUI. | `motion` |
| [`dialog`](dialog/) | Animated Dialog and AlertDialog components for SmoothUI. | `lucide-react`, `motion`, `radix-ui` |
| [`dither-chart`](dither-chart/) | A DitherChart component for SmoothUI. | `motion` |
| [`dither-image`](dither-image/) | A DitherImage component for SmoothUI. | `motion` |
| [`dock`](dock/) | A Dock component for SmoothUI. | `motion` |
| [`dot-morph-button`](dot-morph-button/) | A DotMorphButton component for SmoothUI. | `motion` |
| [`drawer`](drawer/) | An animated Drawer component for SmoothUI that slides from any side. | `motion` |
| [`drawing-cursor`](drawing-cursor/) | A DrawingCursor component for SmoothUI. | `motion` |
| [`dropdown-menu`](dropdown-menu/) | An animated Dropdown Menu component for SmoothUI with spring animations, nested submenus, and keyboard navigation. | `motion` |
| [`duration-picker`](duration-picker/) | A DurationPicker component for SmoothUI. | `motion` |
| [`dynamic-island`](dynamic-island/) | A DynamicIsland component for SmoothUI. | `motion`, `lucide-react` |
| [`emboss-surface`](emboss-surface/) | An EmbossSurface component for SmoothUI. | `motion` |
| [`emoji-reaction`](emoji-reaction/) | A reaction bar with particle bursts, a rolling odometer count, and a hover/focus emoji picker. | `motion`, `lucide-react` |
| [`expandable-cards`](expandable-cards/) | A ExpandableCards component for SmoothUI. | `motion`, `lucide-react` |
| [`expandable-navbar`](expandable-navbar/) | An ExpandableNavbar component for SmoothUI. | `motion` |
| [`exposure-slider`](exposure-slider/) | iOS-style exposure slider with draggable ticker and progress ring | `motion` |
| [`fade-through`](fade-through/) | A FadeThrough text animation component for SmoothUI. | `motion` |
| [`favicon-search`](favicon-search/) | A keyboard-driven search field that shows each result's favicon, with a combobox listbox and highlighted matches. | `lucide-react`, `motion` |
| [`figma-comment`](figma-comment/) | A FigmaComment component for SmoothUI. | `motion` |
| [`file-tree`](file-tree/) | A FileTree component for SmoothUI. | `motion`, `lucide-react` |
| [`floating-navbar`](floating-navbar/) | A FloatingNavbar component for SmoothUI. | `motion` |
| [`focus-blur-resolve`](focus-blur-resolve/) | A FocusBlurResolve text animation component for SmoothUI. | `motion` |
| [`folder-reveal`](folder-reveal/) | A FolderReveal component for SmoothUI. | `motion` |
| [`form`](form/) | A lightweight, composable Form component with animated error messages and full accessibility support. | `lucide-react`, `motion` |
| [`github-stars-animation`](github-stars-animation/) | A GitHubStarsAnimation component for SmoothUI. | `motion`, `lucide-react` |
| [`glass-card`](glass-card/) | A GlassCard component for SmoothUI. | `motion` |
| [`glow-hover-card`](glow-hover-card/) | A GlowHoverCards component for SmoothUI. | `motion` |
| [`gooey-filter`](gooey-filter/) | A GooeyFilter component for SmoothUI. | — |
| [`gooey-popover`](gooey-popover/) | A GooeyPopover component for SmoothUI. | `gsap` |
| [`gravity-letters`](gravity-letters/) | A GravityLetters component for SmoothUI. | `motion` |
| [`gravity-stars`](gravity-stars/) | A GravityStars particle background component for SmoothUI. | `motion` |
| [`grid-loader`](grid-loader/) | 3x3 grid-based loading animation with preset patterns | `motion` |
| [`holographic-foil`](holographic-foil/) | A HolographicFoil component for SmoothUI. | `motion` |
| [`hover-expand`](hover-expand/) | A HoverExpand component for SmoothUI. | `motion` |
| [`hover-image-list`](hover-image-list/) | A HoverImageList component for SmoothUI. | `motion`, `lucide-react` |
| [`image-generation-panel`](image-generation-panel/) | A text-to-image generation console — prompt and settings up top, a full-width 2x2 batch resolving from low-res mosaic to sharp below. | `lucide-react`, `motion` |
| [`image-metadata-preview`](image-metadata-preview/) | A ImageMetadataPreview component for SmoothUI. | `motion`, `lucide-react`, `react-use-measure` |
| [`infinite-slider`](infinite-slider/) | A InfiniteSlider component for SmoothUI. | `motion`, `react-use-measure` |
| [`inline-testimonials`](inline-testimonials/) | Testimonial quotes woven into a paragraph that expand inline on hover or focus. | `motion`, `lucide-react` |
| [`interactive-image-selector`](interactive-image-selector/) | A InteractiveImageSelector component for SmoothUI. | `motion`, `lucide-react` |
| [`job-listing-component`](job-listing-component/) | A JobListingComponent component for SmoothUI. | `motion`, `usehooks-ts` |
| [`kinetic-center-build`](kinetic-center-build/) | A KineticCenterBuild text animation component for SmoothUI. | `motion` |
| [`kinetic-type-scroll`](kinetic-type-scroll/) | A KineticTypeScroll text animation component for SmoothUI. | `motion` |
| [`line-by-line-slide`](line-by-line-slide/) | A LineByLineSlide text animation component for SmoothUI. | `motion` |
| [`liquid-metal`](liquid-metal/) | A LiquidMetal component for SmoothUI. | `motion` |
| [`mac-terminal`](mac-terminal/) | A MacTerminal component for SmoothUI. | `motion` |
| [`magnetic-button`](magnetic-button/) | Button that subtly follows the cursor with magnetic effect | `@radix-ui/react-slot`, `class-variance-authority`, `motion` |
| [`magnetic-field`](magnetic-field/) | A MagneticField component for SmoothUI. | `motion` |
| [`mask-reveal-up`](mask-reveal-up/) | A MaskRevealUp text animation component for SmoothUI. | `motion` |
| [`micro-scale-fade`](micro-scale-fade/) | A MicroScaleFade text animation component for SmoothUI. | `motion` |
| [`morph-icon`](morph-icon/) | A MorphIcon component for SmoothUI. | `motion` |
| [`morph-surface`](morph-surface/) | Feedback dock that morphs from a compact pill into a panel and back, with a spring layout transition. | `class-variance-authority`, `motion` |
| [`motion-loader`](motion-loader/) | A MotionLoader component for SmoothUI. | `motion` |
| [`music-toggle`](music-toggle/) | A play/pause control shaped like a spinning record, with a live waveform and seekable progress ring. | `motion`, `lucide-react` |
| [`notification-badge`](notification-badge/) | Animated notification badge with count and status variants | `motion` |
| [`number-flow`](number-flow/) | A NumberFlow component for SmoothUI. | `lucide-react` |
| [`orb`](orb/) | An Orb component for SmoothUI. | `motion` |
| [`orbital-image-wheel`](orbital-image-wheel/) | An OrbitalImageWheel component for SmoothUI. | `motion` |
| [`organic-merge-transition`](organic-merge-transition/) | A soft-min SDF merge transition with two organic expanding shapes. | — |
| [`page-preloader`](page-preloader/) | A page-preloader curtain that plays once and then uncovers the page. | `motion` |
| [`pagination`](pagination/) | Animated pagination with spring-based active page indicator | `motion`, `lucide-react` |
| [`parallax-layers`](parallax-layers/) | Multi-layer depth parallax for hero sections, with optional pointer-driven parallax. | `motion` |
| [`per-character-rise`](per-character-rise/) | A PerCharacterRise text animation component for SmoothUI. | `motion` |
| [`per-word-crossfade`](per-word-crossfade/) | A PerWordCrossfade text animation component for SmoothUI. | `motion` |
| [`perspective-text-3d`](perspective-text-3d/) | A PerspectiveText3D text animation component for SmoothUI. | `motion` |
| [`photo-stack`](photo-stack/) | A PhotoStack component for SmoothUI. | `motion` |
| [`phototab`](phototab/) | A Phototab component for SmoothUI. | `motion`, `@radix-ui/react-tabs` |
| [`pinned-list`](pinned-list/) | A list where selected items pin to the top and animate out of the flow into a pinned section. | `motion`, `lucide-react` |
| [`pixel-brush-canvas`](pixel-brush-canvas/) | A PixelBrushCanvas component for SmoothUI. | `motion` |
| [`pixel-flow-field`](pixel-flow-field/) | A PixelFlowField background component for SmoothUI. | `motion` |
| [`power-off-slide`](power-off-slide/) | A PowerOffSlide component for SmoothUI. | `motion`, `lucide-react` |
| [`price-flow`](price-flow/) | A PriceFlow component for SmoothUI. | — |
| [`prism-sweep-transition`](prism-sweep-transition/) | A persistent WebGL prism sweep transition wrapper for route and state changes. | `motion` |
| [`product-card`](product-card/) | Animated product card component for ecommerce | `motion` |
| [`progressive-blur`](progressive-blur/) | A ProgressiveBlur component for SmoothUI. | `motion` |
| [`radial-circles-transition`](radial-circles-transition/) | A radial SDF circle pattern transition inspired by the Codrops radial circles step. | — |
| [`radio-group`](radio-group/) | An animated Radio Group component for SmoothUI with selection indicator spring animation. | `motion`, `radix-ui` |
| [`ransom-note`](ransom-note/) | A RansomNote component for SmoothUI. | `motion` |
| [`reveal-text`](reveal-text/) | A RevealText component for SmoothUI. | `motion` |
| [`reviews-carousel`](reviews-carousel/) | A ReviewsCarousel component for SmoothUI. | `motion`, `lucide-react` |
| [`rich-popover`](rich-popover/) | A RichPopover component for SmoothUI. | `motion`, `lucide-react`, `@radix-ui/react-popover` |
| [`rolling-text`](rolling-text/) | A RollingText text animation component for SmoothUI. | `motion` |
| [`scale-down-fade`](scale-down-fade/) | A ScaleDownFade text animation component for SmoothUI. | `motion` |
| [`scramble-hover`](scramble-hover/) | A ScrambleHover component for SmoothUI. | — |
| [`scroll-image-reveal`](scroll-image-reveal/) | An image revealed by an animated mask as it scrolls into view, with a counter-parallax on the image. | `motion` |
| [`scroll-progress`](scroll-progress/) | A reading-progress indicator with bar, ring, number and segmented variants. | `motion` |
| [`scroll-reveal-paragraph`](scroll-reveal-paragraph/) | A ScrollRevealParagraph component for SmoothUI. | `motion` |
| [`scrollable-card-stack`](scrollable-card-stack/) | A ScrollableCardStack component for SmoothUI. | `motion` |
| [`scrubber`](scrubber/) | Design-tool style scrubber slider with animated thumb and built-in label | `motion` |
| [`sdf-blob-transition`](sdf-blob-transition/) | A persistent WebGL SDF blob transition wrapper for route and state changes. | `motion` |
| [`sdf-circle-transition`](sdf-circle-transition/) | A clean SDF circle reveal based on the first Codrops shader step. | — |
| [`searchable-dropdown`](searchable-dropdown/) | A SearchableDropdown component for SmoothUI. | `motion`, `lucide-react` |
| [`select`](select/) | An animated Select dropdown component for SmoothUI wrapping Radix Select with smooth animations. | `lucide-react`, `motion` |
| [`shader-reveal-circle-transition`](shader-reveal-circle-transition/) | Demo 3 adaptation: noisy circular reveal with radial interpolation. | — |
| [`shader-reveal-luma-transition`](shader-reveal-luma-transition/) | Demo 5 adaptation: luminance-style vertical displacement translated into a shader overlay. | — |
| [`shader-reveal-noise-transition`](shader-reveal-noise-transition/) | Demo 1 adaptation: 4D-noise threshold transition with an organic shader gate. | — |
| [`shader-reveal-planetary-transition`](shader-reveal-planetary-transition/) | Demo 6 adaptation: rotated displacement vectors with a planetary swirl feel. | — |
| [`shader-reveal-push-transition`](shader-reveal-push-transition/) | Demo 8 adaptation: procedural noise push/pull displacement. | — |
| [`shader-reveal-stripes-transition`](shader-reveal-stripes-transition/) | Demo 7 adaptation: divided UV stripe displacement with diagonal motion. | — |
| [`shader-reveal-transition`](shader-reveal-transition/) | A shared WebGL transition engine with eight shader-driven reveal variants. | `motion` |
| [`shader-reveal-wipe-transition`](shader-reveal-wipe-transition/) | Demo 4 adaptation: displacement-noise horizontal wipe with a sharp eased edge. | — |
| [`shader-reveal-zoom-transition`](shader-reveal-zoom-transition/) | Demo 2 adaptation: vertical-progress zoom mix translated into a UI frame transition. | — |
| [`shared-axis-x`](shared-axis-x/) | A SharedAxisX text animation component for SmoothUI. | `motion` |
| [`shared-axis-y`](shared-axis-y/) | A SharedAxisY text animation component for SmoothUI. | `motion` |
| [`shared-axis-z`](shared-axis-z/) | A SharedAxisZ text animation component for SmoothUI. | `motion` |
| [`shimmer-sweep`](shimmer-sweep/) | A ShimmerSweep text animation component for SmoothUI. | `motion` |
| [`shine-text`](shine-text/) | A ShineText light-sweep text animation component for SmoothUI. | `motion` |
| [`short-slide-down`](short-slide-down/) | A ShortSlideDown text animation component for SmoothUI. | `motion` |
| [`short-slide-right`](short-slide-right/) | A ShortSlideRight text animation component for SmoothUI. | `motion` |
| [`siri-orb`](siri-orb/) | A beautiful animated orb component inspired by Siri's visual design. | `motion` |
| [`skeleton-loader`](skeleton-loader/) | Animated skeleton loading placeholders | — |
| [`smooth-button`](smooth-button/) | A polished button component with gradient variants and press animation | `@radix-ui/react-slot`, `class-variance-authority`, `motion` |
| [`social-hover-card`](social-hover-card/) | A profile hover card: avatar/handle trigger that expands into a preview with stats, bio and a follow action. | `motion`, `lucide-react` |
| [`social-selector`](social-selector/) | A SocialSelector component for SmoothUI. | `motion` |
| [`soft-blur-in`](soft-blur-in/) | A SoftBlurIn text animation component for SmoothUI. | `motion` |
| [`spring-scale-in`](spring-scale-in/) | A SpringScaleIn text animation component for SmoothUI. | `motion` |
| [`squircle`](squircle/) | A Squircle component for SmoothUI. | — |
| [`stagger-from-center`](stagger-from-center/) | A StaggerFromCenter text animation component for SmoothUI. | `motion` |
| [`stagger-from-edges`](stagger-from-edges/) | A StaggerFromEdges text animation component for SmoothUI. | `motion` |
| [`svg-clip-mask`](svg-clip-mask/) | Reveals any children through a custom SVG shape mask that can morph on a loop, on scroll, or on hover. | `motion` |
| [`svg-draw-on-scroll`](svg-draw-on-scroll/) | An SVG path that draws itself as you scroll, optionally with a marker riding the tip. | `motion` |
| [`swap-panel`](swap-panel/) | A SwapPanel component for SmoothUI. | `motion`, `lucide-react` |
| [`switchboard-card`](switchboard-card/) | A SwitchboardCard component with light grid illustration for SmoothUI. | — |
| [`text-morph`](text-morph/) | A TextMorph text animation component for SmoothUI. | `motion` |
| [`theme-toggle`](theme-toggle/) | A light/dark/system theme switch with sun-moon, pill, switch and orb visual treatments. | `motion`, `lucide-react` |
| [`tilt-card`](tilt-card/) | A TiltCard component for SmoothUI. | `motion` |
| [`time-machine-stack`](time-machine-stack/) | A TimeMachineStack component for SmoothUI. | `motion` |
| [`top-down-letters`](top-down-letters/) | A TopDownLetters text animation component for SmoothUI. | `motion` |
| [`tweet-card`](tweet-card/) | A beautiful tweet card component for displaying Twitter/X posts. | `react-tweet` |
| [`typewriter-text`](typewriter-text/) | A TypewriterText component for SmoothUI. | — |
| [`unlock-face-id`](unlock-face-id/) | An UnlockFaceId component for SmoothUI. | `motion` |
| [`user-account-avatar`](user-account-avatar/) | A UserAccountAvatar component for SmoothUI. | `motion`, `lucide-react`, `@radix-ui/react-popover` |
| [`vector-editor-toolbar`](vector-editor-toolbar/) | A Figma-style floating vector toolbar with tool selection, nested flyouts and a contextual properties bar. | `lucide-react`, `motion` |
| [`video-ambient`](video-ambient/) | A video with a two-pass Ambilight-style glow sampled live from its own frames, with a CORS-safe static fallback. | `motion` |
| [`video-modal`](video-modal/) | A video thumbnail that morphs into a full accessible player inside a modal, with a custom keyboard-operable control bar. | `lucide-react`, `motion` |
| [`wallet-card`](wallet-card/) | A WalletCard component for SmoothUI. | `motion`, `lucide-react` |
| [`warped-circle-transition`](warped-circle-transition/) | A wavy perimeter circle reveal inspired by the Codrops circle warping step. | — |
| [`wave-text`](wave-text/) | A WaveText component for SmoothUI. | `motion` |
