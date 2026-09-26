# Magic UI

78 componenti copiati da [magicuidesign/magicui](https://github.com/magicuidesign/magicui) (commit `d7207e5`), il sorgente di [magicui.design](https://magicui.design). Licenza MIT: vedi [`LICENSE.md`](LICENSE.md), che va tenuto insieme ai file.

Per usarne uno, dalla cartella del progetto:

```
npx shadcn@latest add ./COMPONENTI/magicui/<nome>/<nome>.json
```

| Componente | Cosa fa | Dipendenze npm |
|---|---|---|
| [`android`](android/) | A mockup of an Android device. | — |
| [`animated-beam`](animated-beam/) | An animated beam of light which travels along a path. Useful for showcasing the integration features of a website. | `motion` |
| [`animated-circular-progress-bar`](animated-circular-progress-bar/) | Animated Circular Progress Bar is a component that displays a circular gauge with a percentage value. | — |
| [`animated-gradient-text`](animated-gradient-text/) | An animated gradient background which transitions between colors for text. | — |
| [`animated-grid-pattern`](animated-grid-pattern/) | A animated background grid pattern made with SVGs, fully customizable using Tailwind CSS. | `motion` |
| [`animated-list`](animated-list/) | A list that animates each item in sequence with a delay. Used to showcase notifications or events on your landing page. | `motion` |
| [`animated-shiny-text`](animated-shiny-text/) | A light glare effect which pans across text making it appear as if it is shimmering. | — |
| [`animated-theme-toggler`](animated-theme-toggler/) | Theme toggle with View Transitions and animated clip-path masks (circle, polygons, star), optional viewport-centered origin. | `lucide-react` |
| [`aurora-text`](aurora-text/) | A beautiful aurora text effect | — |
| [`avatar-circles`](avatar-circles/) | Overlapping circles of avatars. | — |
| [`backlight`](backlight/) | A backlight glow effect for videos, images, and SVGs. | — |
| [`bento-grid`](bento-grid/) | Bento grid is a layout used to showcase the features of a product in a simple and elegant way. | `@radix-ui/react-icons` |
| [`blur-fade`](blur-fade/) | Blur fade in and out animation. Used to smoothly fade in and out content. | `motion` |
| [`border-beam`](border-beam/) | An animated beam of light which travels along the border of its container. | `motion` |
| [`client-tweet-card`](client-tweet-card/) | A client-side version of the tweet card that displays a tweet with the author's name, handle, and profile picture. | `react-tweet` |
| [`code-comparison`](code-comparison/) | A component which compares two code snippets. | `shiki`, `next-themes` |
| [`comic-text`](comic-text/) | Comic text animation | `motion` |
| [`confetti`](confetti/) | Confetti animations are best used to delight your users when something special happens | `canvas-confetti`, `@types/canvas-confetti` |
| [`cool-mode`](cool-mode/) | Cool mode effect for buttons, links, and other DOMs | — |
| [`dia-text-reveal`](dia-text-reveal/) | A horizontal color band sweeps across text, revealing a gradient shine before settling on the base color. | `motion` |
| [`dock`](dock/) | An implementation of the MacOS dock using react + tailwindcss + motion | `motion` |
| [`dot-pattern`](dot-pattern/) | A background dot pattern made with SVGs, fully customizable using Tailwind CSS. | — |
| [`dotted-map`](dotted-map/) | A component with a dotted map. | `svg-dotted-map` |
| [`file-tree`](file-tree/) | A component used to showcase the folder and file structure of a directory. | — |
| [`flickering-grid`](flickering-grid/) | A flickering grid background made with SVGs, fully customizable using Tailwind CSS. | — |
| [`floating-3d-particles`](floating-3d-particles/) | A canvas-based pseudo-3D particle field with perspective projection, continuous rotation and buoyant drift. | — |
| [`glare-hover`](glare-hover/) | A diagonal glare on hover using a ::before gradient and CSS variables (angle, size, duration, color). | — |
| [`globe`](globe/) | An autorotating, interactive, and highly performant globe made using WebGL. | `cobe@^0.6.4`, `motion` |
| [`glyph-matrix`](glyph-matrix/) | An animated grid of subtly shifting glyphs with fade effect and theme support. | — |
| [`grid-pattern`](grid-pattern/) | A background grid pattern made with SVGs, fully customizable using Tailwind CSS. | — |
| [`hero-video-dialog`](hero-video-dialog/) | A hero video dialog component. | `motion` |
| [`hexagon-pattern`](hexagon-pattern/) | A background hexagon pattern made with SVGs, fully customizable using Tailwind CSS. | — |
| [`highlighter`](highlighter/) | A text highlighter that mimics the effect of a human-drawn marker stroke. | `motion`, `rough-notation` |
| [`hyper-text`](hyper-text/) | A text animation that scrambles letters before revealing the final text. | `motion` |
| [`icon-cloud`](icon-cloud/) | An interactive 3D tag cloud component | `lucide-react` |
| [`interactive-grid-pattern`](interactive-grid-pattern/) | A interactive background grid pattern made with SVGs, fully customizable using Tailwind CSS. | — |
| [`interactive-hover-button`](interactive-hover-button/) | — | — |
| [`iphone`](iphone/) | A mockup of the iPhone | — |
| [`kinetic-text`](kinetic-text/) | A text component that animates font weight of characters on hover. | — |
| [`lens`](lens/) | A interactive component that enables zooming into images, videos and other elements. | `motion` |
| [`light-rays`](light-rays/) | A component with animated light rays which shine down from above. | `motion` |
| [`line-shadow-text`](line-shadow-text/) | A text component with a moving line shadow. | `motion` |
| [`magic-card`](magic-card/) | A spotlight effect that follows your mouse cursor and highlights borders on hover. | `motion`, `next-themes` |
| [`marquee`](marquee/) | An infinite scrolling component that can be used to display text, images, or videos. | — |
| [`meteors`](meteors/) | A meteor shower effect. | — |
| [`morphing-text`](morphing-text/) | A dynamic text morphing component for Magic UI. | — |
| [`neon-gradient-card`](neon-gradient-card/) | A beautiful neon card effect | — |
| [`noise-texture`](noise-texture/) | An SVG fractal noise layer using feTurbulence, desaturation, and contrast controls for subtle texture overlays. | — |
| [`number-ticker`](number-ticker/) | Animate numbers to count up or down to a target number | `motion` |
| [`orbiting-circles`](orbiting-circles/) | A collection of circles which move in orbit along a circular path | — |
| [`particles`](particles/) | Particles are a fun way to add some visual flair to your website. They can be used to create a sense of depth, movement, and interactivity. | — |
| [`pixel-image`](pixel-image/) | A component that displays an image with a pixelated effect, creating a retro aesthetic. | — |
| [`pointer`](pointer/) | A component that displays a pointer when hovering over an element | `motion` |
| [`progressive-blur`](progressive-blur/) | The Progressive Blur component adds a smooth blur gradient effect to scrollable content, indicating more content below or above. | — |
| [`pulsating-button`](pulsating-button/) | An animated pulsating button useful for capturing attention of users. | — |
| [`rainbow-button`](rainbow-button/) | An animated button with a rainbow effect. | — |
| [`retro-grid`](retro-grid/) | An animated scrolling retro grid effect | — |
| [`ripple`](ripple/) | An animated ripple effect typically used behind elements to emphasize them. | — |
| [`ripple-button`](ripple-button/) | An animated button with ripple useful for user engagement. | — |
| [`safari`](safari/) | A safari browser mockup to showcase your website. | — |
| [`scroll-based-velocity`](scroll-based-velocity/) | Scrolling text whose speed changes based on scroll speed | `motion` |
| [`scroll-progress`](scroll-progress/) | Animated Scroll Progress for your pages | `motion` |
| [`shimmer-button`](shimmer-button/) | A button with a shimmering light which travels around the perimeter. | — |
| [`shine-border`](shine-border/) | Shine border is an animated background border effect. | — |
| [`shiny-button`](shiny-button/) | A shiny button component with dynamic styles in the dark mode or light mode. | `motion` |
| [`smooth-cursor`](smooth-cursor/) | A customizable, physics-based smooth cursor animation component with spring animations and rotation effects | `motion` |
| [`sparkles-text`](sparkles-text/) | A dynamic text that generates continuous sparkles with smooth transitions, perfect for highlighting text with animated stars. | `motion` |
| [`spinning-text`](spinning-text/) | The Spinning Text component animates text in a circular motion with customizable speed, direction, color, and transitions for dynamic and engaging effects. | `motion` |
| [`striped-pattern`](striped-pattern/) | A background striped pattern made with SVGs, fully customizable using Tailwind CSS. | — |
| [`terminal`](terminal/) | A terminal component | — |
| [`text-3d-flip`](text-3d-flip/) | A text effect that flips each letter in 3D with a staggered animation on hover. | `motion` |
| [`text-animate`](text-animate/) | A text animation component that animates text using a variety of different animations. | `motion` |
| [`text-reveal`](text-reveal/) | Fade in text as you scroll down the page. | `motion` |
| [`tweet-card`](tweet-card/) | A card that displays a tweet with the author's name, handle, and profile picture. | `react-tweet` |
| [`typing-animation`](typing-animation/) | Characters appearing in typed animation | `motion` |
| [`video-text`](video-text/) | A component that displays text with a video playing in the background. | — |
| [`warp-background`](warp-background/) | A card with a time warping background effect. | `motion` |
| [`word-rotate`](word-rotate/) | A vertical rotation of words | `motion` |
