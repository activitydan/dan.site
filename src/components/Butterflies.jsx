import { useEffect, useRef } from 'react';
import { butterfliesBackground } from '../lib/threejs-toys-patched.js';

// The swarm is instanced from a four-frame sprite sheet of wing positions.
// Drawing it here rather than shipping a PNG keeps the palette in code and
// saves a request, and the sheet is small enough to build on the main thread.
function makeButterfliesTexture() {
  const FRAMES = 4;
  const FW = 128;
  const FH = 128;
  const canvas = document.createElement('canvas');
  canvas.width = FW * FRAMES;
  canvas.height = FH;
  const ctx = canvas.getContext('2d');

  for (let f = 0; f < FRAMES; f++) {
    const cx = f * FW + FW / 2;
    const cy = FH / 2 + 10;

    // How far the wings are spread in this frame, cycling across the sheet.
    const open = 0.4 + 0.55 * Math.abs(Math.sin((f / FRAMES) * Math.PI));

    // White wings with grey veins. Each butterfly samples one frame of the
    // sheet, so spreading the whites across the four keeps the swarm from
    // reading as one flat tone against the near-black page while every
    // individual still reads as white.
    const palette = [
      ['rgba(255,255,255,0.98)', 'rgba(214,214,214,0.9)'],
      ['rgba(236,236,236,0.98)', 'rgba(198,198,198,0.9)'],
      ['rgba(248,248,248,0.98)', 'rgba(206,206,206,0.9)'],
      ['rgba(224,224,224,0.98)', 'rgba(188,188,188,0.9)'],
    ];
    const [fill, vein] = palette[f];

    for (const side of [-1, 1]) {
      // Upper wing
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.bezierCurveTo(
        cx + side * 55 * open, cy - 55,
        cx + side * 65 * open, cy - 20,
        cx, cy - 6,
      );
      ctx.fillStyle = fill;
      ctx.fill();

      // Lower wing
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.bezierCurveTo(
        cx + side * 42 * open, cy + 28,
        cx + side * 30 * open, cy + 48,
        cx, cy + 16,
      );
      ctx.fillStyle = fill;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(cx, cy - 6);
      ctx.lineTo(cx + side * 30 * open, cy - 30);
      ctx.strokeStyle = vein;
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }

    // Body and head
    ctx.beginPath();
    ctx.ellipse(cx, cy + 5, 2.5, 20, 0, 0, Math.PI * 2);
    // Kept dark so the silhouette still reads against the white wings.
    ctx.fillStyle = 'rgba(10,10,10,0.92)';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx, cy - 8, 3.5, 0, Math.PI * 2);
    ctx.fill();
  }

  return canvas.toDataURL('image/png');
}

export default function Butterflies({ isHeroPage = true }) {
  const hostRef = useRef(null);
  const instanceRef = useRef(null);
  const isHeroPageRef = useRef(isHeroPage);

  useEffect(() => {
    isHeroPageRef.current = isHeroPage;
  }, [isHeroPage]);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return undefined;

    let mounted = true;
    let instance = null;

    const init = () => {
      if (!mounted) return;
      try {
        instance = butterfliesBackground({
          el,
          // 68x68 positions computed on the GPU, so ~4600 butterflies.
          gpgpuSize: 68,
          background: 0x050505,
          material: 'basic',
          materialParams: { transparent: true, alphaTest: 0.1 },
          texture: makeButterfliesTexture(),
          textureCount: 4,
          wingsScale: [1, 1, 1],
          wingsWidthSegments: 4,
          wingsHeightSegments: 4,
          wingsSpeed: 0.75,
          wingsDisplacementScale: 1.25,
          noiseCoordScale: 0.01,
          noiseTimeCoef: 0.0005,
          noiseIntensity: 0.0025,
          attractionRadius1: 100,
          attractionRadius2: 150,
          maxVelocity: 0.1,
          orbitControls: false,
          antialias: false,
        });
        instanceRef.current = instance;
        // Landing on another route mounts the swarm already hidden, so it
        // must start paused rather than wait for the first route change.
        instance.three.setPaused(!isHeroPageRef.current);
      } catch (err) {
        console.error('butterflies init failed:', err);
      }
    };

    // Defer the WebGL and GPGPU setup slightly so it does not compete with
    // the first paint and the preloader's opening frames.
    const hasIdleCallback = typeof window.requestIdleCallback === 'function';
    const idleHandle = hasIdleCallback
      ? window.requestIdleCallback(init, { timeout: 300 })
      : undefined;
    const timeoutHandle = hasIdleCallback ? undefined : setTimeout(init, 150);

    return () => {
      mounted = false;
      if (idleHandle !== undefined) window.cancelIdleCallback?.(idleHandle);
      if (timeoutHandle !== undefined) clearTimeout(timeoutHandle);
      instanceRef.current = null;
      // Without this the library keeps its render loop, resize listener and
      // WebGL context alive; StrictMode's double mount would leave two.
      instance?.three?.dispose();
    };
  }, []);

  // Off the hero the swarm is invisible, so stop rendering it instead of
  // paying for a hidden GPGPU pass on every other page.
  useEffect(() => {
    instanceRef.current?.three?.setPaused(!isHeroPage);
  }, [isHeroPage]);

  return (
    <div className={`three-hero-bg-wrapper ${isHeroPage ? 'hero-visible' : 'hero-hidden'}`}>
      <div className="butterflies-host" ref={hostRef}></div>
      <div className="bg-overlay bg-overlay-butterflies"></div>
    </div>
  );
}
