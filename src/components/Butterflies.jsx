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

  const shouldPause = () => document.hidden || !isHeroPageRef.current;

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return undefined;

    let mounted = true;
    let instance = null;

    // Nothing here watches the frame rate and lowers the instance count. That
    // was tried and it is visible: thinning the swarm raises the frame rate,
    // which trips the restore, which lowers it again, so the count never
    // settles and butterflies blink in and out for the whole session. Measured
    // over 32s it swung 1600 -> 819 -> 1209 -> 938 and kept going. Widening
    // the hysteresis only slows the pump down. The size of the swarm is
    // decided once below, before the first frame, where nobody can see it
    // change; if it needs to come down, lower gpgpuSize.

    const init = () => {
      if (!mounted) return;
      try {
        // Each butterfly is 32 double-sided triangles, so the grid size is
        // the main cost: 67x67 is ~4500 of them, ~144k triangles a frame.
        // Weak GPUs and phones get a smaller swarm, which still fills the
        // frame because the individuals are what read, not the count.
        // The count is the square of this number, so it only moves in steps:
        // 67 is 4489 and 39 is 1521.
        const cpuCores = navigator.hardwareConcurrency || 8;
        const deviceMemory = navigator.deviceMemory || 8;
        const isLowPowerDevice = cpuCores <= 4 || deviceMemory <= 4;
        const isSmallViewport = window.innerWidth <= 768;

        instance = butterfliesBackground({
          el,
          gpgpuSize: isLowPowerDevice || isSmallViewport ? 39 : 67,
          background: 0x050505,
          material: 'basic',
          // alphaTest alone cuts the sprite's background, and leaving the
          // material opaque keeps depth writes and early-z, so overlapping
          // butterflies stop paying for a full-screen blend every frame.
          // The wings are 98% opaque anyway, so nothing looks different.
          materialParams: { alphaTest: 0.1 },
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

        // A phone sees the swarm a little smaller. The library pins the camera
        // to (0, 50, 70) and takes no override, so the distance is set here
        // afterwards, along the same line so the framing and the angle are
        // untouched: only how far away it stands. Nothing is unlocked by this
        // — orbitControls stays false and the camera is set once, never from
        // an input — and the resize handler only ever touches the aspect, so
        // it survives a rotation.
        if (isSmallViewport) {
          const PULL_BACK = 1.12;
          instance.three.camera.position.set(0, 50 * PULL_BACK, 70 * PULL_BACK);
          instance.three.camera.lookAt(0, 0, 0);
        }

        // Landing on another route mounts the swarm already hidden, so it
        // must start paused rather than wait for the first route change.
        instance.three.setPaused(shouldPause());
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

  // Off the hero the swarm is invisible, and in a background tab nobody is
  // looking, so stop rendering instead of paying for the GPGPU pass.
  useEffect(() => {
    instanceRef.current?.three?.setPaused(shouldPause());
  }, [isHeroPage]);

  useEffect(() => {
    const onVisibilityChange = () => {
      instanceRef.current?.three?.setPaused(shouldPause());
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, []);

  return (
    <div className={`three-hero-bg-wrapper ${isHeroPage ? 'hero-visible' : 'hero-hidden'}`}>
      <div className="butterflies-host" ref={hostRef}></div>
      <div className="bg-overlay bg-overlay-butterflies"></div>
    </div>
  );
}
