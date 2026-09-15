import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { Pass, FullScreenQuad } from 'three/examples/jsm/postprocessing/Pass.js';
import { RAY_VERT, RAY_FRAG, COMPOSITE_VERT, COMPOSITE_FRAG, ACCUM_FRAG, COPY_FRAG } from './shaders.js';

// Blends each new, sub-pixel jittered raymarch frame into a running history.
// One sample per pixel in a small buffer shows aliased edges; averaged over a
// few frames it converges to a supersampled image at no extra raymarch cost.
class AccumulatePass extends Pass {
  constructor(rtType) {
    super();
    this.history = new THREE.WebGLRenderTarget(2, 2, { type: rtType, depthBuffer: false });
    this.blend = 1;
    this.resetPending = true;
    this.material = new THREE.ShaderMaterial({
      vertexShader: COMPOSITE_VERT,
      fragmentShader: ACCUM_FRAG,
      uniforms: {
        tDiffuse: { value: null },
        tHistory: { value: this.history.texture },
        uBlend: { value: 1 },
      },
      depthTest: false,
      depthWrite: false,
    });
    this.copyMaterial = new THREE.ShaderMaterial({
      vertexShader: COMPOSITE_VERT,
      fragmentShader: COPY_FRAG,
      uniforms: { tDiffuse: { value: null } },
      depthTest: false,
      depthWrite: false,
    });
    this.fsQuad = new FullScreenQuad(this.material);
  }

  setSize(width, height) {
    this.history.setSize(width, height);
    this.resetPending = true; // stale history at the old size
  }

  render(renderer, writeBuffer, readBuffer) {
    this.material.uniforms.tDiffuse.value = readBuffer.texture;
    this.material.uniforms.uBlend.value = this.resetPending ? 1 : this.blend;
    this.resetPending = false;
    this.fsQuad.material = this.material;
    renderer.setRenderTarget(writeBuffer);
    this.fsQuad.render(renderer);

    // The blended result becomes next frame's history.
    this.copyMaterial.uniforms.tDiffuse.value = writeBuffer.texture;
    this.fsQuad.material = this.copyMaterial;
    renderer.setRenderTarget(this.history);
    this.fsQuad.render(renderer);
  }

  dispose() {
    this.history.dispose();
    this.material.dispose();
    this.copyMaterial.dispose();
    this.fsQuad.dispose();
  }
}

// Halton low-discrepancy sequence: evenly spread sub-pixel offsets.
const halton = (index, base) => {
  let result = 0;
  let f = 1;
  for (let i = index; i > 0; i = Math.floor(i / base)) {
    f /= base;
    result += f * (i % base);
  }
  return result;
};

export default function ThreeBackground({ isHeroPage = true }) {
  const canvasRef = useRef(null);
  const [isInteractive, setIsInteractive] = useState(false);
  const isInteractiveRef = useRef(false);
  const isHeroPageRef = useRef(isHeroPage);

  // Sync refs with state/props for use inside animation loop
  useEffect(() => {
    isInteractiveRef.current = isInteractive;
  }, [isInteractive]);

  useEffect(() => {
    isHeroPageRef.current = isHeroPage;
  }, [isHeroPage]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    let renderer, composer, bloomPass, compositePass, controls;
    let animationFrameId;
    let lastRenderMs = 0;
    const cpuCores = navigator.hardwareConcurrency || 8;
    const deviceMemory = navigator.deviceMemory || 8;
    const isLowPowerDevice = cpuCores <= 4 || deviceMemory <= 4;

    // The raymarcher costs per pixel, so it renders into a buffer smaller than
    // the canvas and the composite pass upscales the result. Where the GPU
    // exposes timer queries the scale adapts to the measured cost of our own
    // render, so it is independent of whatever else the page is doing: weak
    // GPUs settle on a size they can sustain, fast ones climb to full size.
    const MIN_SCALE = 0.25;
    const MAX_SCALE = 1.0;
    const GPU_BUDGET_MS = 8;
    let renderScale = isLowPowerDevice ? 0.35 : 0.5;

    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: false,
        powerPreference: 'high-performance',
        alpha: false,
      });
    } catch (e) {
      console.error('WebGL Initialization Error:', e);
      return;
    }

    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    renderer.toneMapping = THREE.NoToneMapping;

    // Detect half-float support for high dynamic range bloom
    let halfFloatOK = true;
    try {
      const gl = renderer.getContext();
      halfFloatOK = !!(
        gl.getExtension('EXT_color_buffer_float') ||
        gl.getExtension('EXT_color_buffer_half_float')
      );
    } catch {
      halfFloatOK = false;
    }

    // Timer queries exist in Chrome on desktop and Android. Without them the
    // scale stays fixed and only shrinks if the page clearly struggles.
    const gl = renderer.getContext();
    const timerExt = gl.getExtension('EXT_disjoint_timer_query_webgl2');
    let pendingQuery = null;
    let gpuSamples = [];
    let slowAccum = 0;
    let slowCount = 0;

    // Fullscreen raymarching quad
    const fsScene = new THREE.Scene();
    const fsCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const FIXED_PARAMS = {
      // With the doubled step length in the shader, 100 iterations let every
      // ray finish; fewer would truncate rays near the disk. Cost is controlled
      // by the render scale below instead.
      uSteps: 100,
      uDin: 2.75,
      uDout: 40.0,
      uDopMax: 1.85,
      uOpNear: 0.90,
      uOpFar: 0.80,
      // Give the accretion disk enough presence behind the hero typography
      // without bringing back the expensive always-on bloom pass.
      uDiskBright: 1.42,
      uStarBright: 1.2,
      uSkyFloor: 0.0,
      // Visible differential rotation: inner rings move faster than outer ones,
      // giving the accretion disk a continuous living motion at no extra cost.
      uRotSpeed: 0.24,
      bloomStrength: 0.55,
      bloomRadius: 0.35,
      bloomThreshold: 0.55,
      vignette: 0.62,
      grain: 0.04,
      ca: 0.0008,
      fov: 44.0,
    };

    const uniforms = {
      uRes: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uTime: { value: 0 },
      uCamPos: { value: new THREE.Vector3(0, 1.05, 23.98) },
      uCamTarget: { value: new THREE.Vector3(0, 0, 0) },
      uFov: { value: 1 / Math.tan(THREE.MathUtils.degToRad(FIXED_PARAMS.fov) / 2) },
      uSteps: { value: FIXED_PARAMS.uSteps | 0 },
      uRotSign: { value: 1.0 },
      uDebug: { value: 0 },
      uDin: { value: FIXED_PARAMS.uDin },
      uDout: { value: FIXED_PARAMS.uDout },
      uDopMax: { value: FIXED_PARAMS.uDopMax },
      uOpNear: { value: FIXED_PARAMS.uOpNear },
      uOpFar: { value: FIXED_PARAMS.uOpFar },
      uDiskBright: { value: FIXED_PARAMS.uDiskBright },
      uStarBright: { value: FIXED_PARAMS.uStarBright },
      uSkyFloor: { value: FIXED_PARAMS.uSkyFloor },
      uRotSpeed: { value: FIXED_PARAMS.uRotSpeed },
      uJitter: { value: new THREE.Vector2(0, 0) },
    };

    const fsMat = new THREE.ShaderMaterial({
      vertexShader: RAY_VERT,
      fragmentShader: RAY_FRAG,
      uniforms,
      depthTest: false,
      depthWrite: false,
    });
    fsScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), fsMat));

    // Observer Camera: fixed home view, centred at yaw 0° and pitch 2.5°.
    // This keeps the accretion disk horizontal, like the chosen reference.
    const camera = new THREE.PerspectiveCamera(FIXED_PARAMS.fov, window.innerWidth / window.innerHeight, 0.01, 200);
    camera.position.set(0, 1.05, 23.98);
    camera.lookAt(0, 0, 0);

    // OrbitControls for interactive double-click exploration
    controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 0, 0);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.minDistance = 2.0;
    controls.maxDistance = 150.0;
    controls.rotateSpeed = 0.6;
    controls.zoomSpeed = 0.8;
    controls.enabled = false; // Disabled initially in normal browsing mode

    // Post-processing pipeline (Bloom + Tone Mapping + Grain)
    const rtType = halfFloatOK ? THREE.HalfFloatType : THREE.UnsignedByteType;
    const rt = new THREE.WebGLRenderTarget(2, 2, { type: rtType, depthBuffer: false });
    composer = new EffectComposer(renderer, rt);
    composer.setPixelRatio(1); // buffers are sized explicitly in applyRenderScale
    composer.addPass(new RenderPass(fsScene, fsCam));

    const accumPass = new AccumulatePass(rtType);
    composer.addPass(accumPass);

    bloomPass = new UnrealBloomPass(
      new THREE.Vector2(2, 2),
      FIXED_PARAMS.bloomStrength,
      FIXED_PARAMS.bloomRadius,
      FIXED_PARAMS.bloomThreshold
    );
    // Bloom costs several extra fullscreen passes. Reserve it for the optional
    // Orbit Mode, where it is worth the GPU work.
    bloomPass.enabled = false;
    composer.addPass(bloomPass);

    compositePass = new ShaderPass(
      new THREE.ShaderMaterial({
        vertexShader: COMPOSITE_VERT,
        fragmentShader: COMPOSITE_FRAG,
        uniforms: {
          tDiffuse: { value: null },
          uRes: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
          uTime: { value: 0 },
          uVignette: { value: FIXED_PARAMS.vignette },
          uGrain: { value: FIXED_PARAMS.grain },
          uCA: { value: FIXED_PARAMS.ca },
        },
      })
    );
    composer.addPass(compositePass);

    // Cursor Responsiveness (Smooth Damped LERP Parallax in normal mode)
    let mouseX = 0;
    let mouseY = 0;
    let smoothMouseX = 0;
    let smoothMouseY = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      mouseY = (event.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    };

    const handleMouseLeave = () => {
      mouseX = 0;
      mouseY = 0;
    };

    // A scroll should always settle the page back to the home composition.
    const handleScroll = () => {
      mouseX = 0;
      mouseY = 0;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Double-click toggle handler
    const handleDoubleClick = (e) => {
      const target = e.target;
      // Do not trigger if double-clicking inside interactive inputs/modals/buttons
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.closest('.project-modal-backdrop') ||
        target.closest('a') ||
        target.closest('button')
      ) {
        return;
      }

      setIsInteractive((prev) => {
        const next = !prev;
        if (next) {
          canvas.style.pointerEvents = 'auto';
          canvas.style.zIndex = '9999'; // Elevate canvas above page content for direct, exclusive drag
          canvas.style.cursor = 'grab';
          document.body.style.userSelect = 'none';
          controls.enabled = true;
          controls.target.set(0, 0, 0);
          controls.update();
        } else {
          canvas.style.pointerEvents = 'none';
          canvas.style.zIndex = '-1'; // Return behind content for normal browsing
          canvas.style.cursor = 'default';
          document.body.style.userSelect = '';
          controls.enabled = false;
          mouseX = 0;
          mouseY = 0;
        }
        return next;
      });
    };

    const handlePointerDown = () => {
      if (isInteractiveRef.current) {
        canvas.style.cursor = 'grabbing';
      }
    };

    const handlePointerUp = () => {
      if (isInteractiveRef.current) {
        canvas.style.cursor = 'grab';
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsInteractive(false);
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '-1';
        canvas.style.cursor = 'default';
        document.body.style.userSelect = '';
        controls.enabled = false;
        mouseX = 0;
        mouseY = 0;
      }
    };

    window.addEventListener('dblclick', handleDoubleClick);
    window.addEventListener('keydown', handleKeyDown);
    canvas.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);

    const _dbSize = new THREE.Vector2();
    const applyRenderScale = () => {
      renderer.getDrawingBufferSize(_dbSize);
      const rw = Math.max(1, Math.round(_dbSize.x * renderScale));
      const rh = Math.max(1, Math.round(_dbSize.y * renderScale));
      composer.setSize(rw, rh);
      uniforms.uRes.value.set(rw, rh);
    };

    const setRenderScale = (next) => {
      const clamped = Math.round(Math.min(MAX_SCALE, Math.max(MIN_SCALE, next)) * 100) / 100;
      if (clamped === renderScale) return;
      renderScale = clamped;
      applyRenderScale();
    };

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      // The canvas stays at (capped) native resolution so the composite pass
      // keeps vignette and grain crisp; only the raymarch buffer shrinks.
      const dpr = Math.min(window.devicePixelRatio || 1, 1.0);

      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h, false);

      camera.aspect = w / Math.max(h, 1);
      camera.updateProjectionMatrix();

      renderer.getDrawingBufferSize(_dbSize);
      compositePass.uniforms.uRes.value.copy(_dbSize);
      applyRenderScale();
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const initTime = performance.now();
    const prevCamPos = camera.position.clone();
    let jitterIndex = 0;

    // Render Animation Loop
    const tick = () => {
      // If we are not on the hero page, skip rendering entirely to free up 100% of GPU
      if (!isHeroPageRef.current) {
        animationFrameId = window.requestAnimationFrame(tick);
        return;
      }

      // If user has scrolled past the hero, pause raymarching completely (0% GPU usage)
      const isHeroVisible = window.scrollY < window.innerHeight * 1.05;
      if (!isHeroVisible && !isInteractiveRef.current) {
        animationFrameId = window.requestAnimationFrame(tick);
        return;
      }

      const now = performance.now();
      const elapsedTime = (now - initTime) * 0.001;

      if (isInteractiveRef.current) {
        // Free Orbit Mode: OrbitControls has full 3D authority
        controls.update();
      } else {
        // The non-interactive site smoothly glides with subtle mouse parallax
        smoothMouseX += (mouseX - smoothMouseX) * 0.05;
        smoothMouseY += (mouseY - smoothMouseY) * 0.05;

        const radius = 24.0;
        const baseAngle = 0; // Centered horizontal yaw: 0°
        const curAzimuth = baseAngle + smoothMouseX * 0.035;
        const baseInc = THREE.MathUtils.degToRad(2.5);
        const curInclination = THREE.MathUtils.clamp(baseInc - smoothMouseY * 0.025, 0.01, 0.16);

        const targetX = radius * Math.cos(curInclination) * Math.sin(curAzimuth);
        const targetY = radius * Math.sin(curInclination);
        const targetZ = radius * Math.cos(curInclination) * Math.cos(curAzimuth);

        // Smoothly glide back if exiting interactive mode
        camera.position.x += (targetX - camera.position.x) * 0.05;
        camera.position.y += (targetY - camera.position.y) * 0.05;
        camera.position.z += (targetZ - camera.position.z) * 0.05;

        camera.lookAt(0, 0, 0);
      }

      // Temporal accumulation: jitter the sample and weight the new frame by
      // how far the camera moved, so a fast orbit drag never ghosts while a
      // still or slowly gliding view converges to a clean supersampled image.
      jitterIndex = (jitterIndex % 16) + 1;
      uniforms.uJitter.value.set(halton(jitterIndex, 2) - 0.5, halton(jitterIndex, 3) - 0.5);
      accumPass.blend = Math.min(1, 0.2 + camera.position.distanceTo(prevCamPos) * 25);
      prevCamPos.copy(camera.position);

      // Sync uniforms
      uniforms.uTime.value = elapsedTime;
      uniforms.uCamPos.value.copy(camera.position);
      uniforms.uCamTarget.value.set(0, 0, 0);
      compositePass.uniforms.uTime.value = elapsedTime;

      // Render smoothly synced with display VSync
      if (now - lastRenderMs >= 16) {
        const delta = now - lastRenderMs;
        bloomPass.enabled = halfFloatOK && isInteractiveRef.current;

        if (timerExt) {
          // One query in flight at a time; its result is read back on a later
          // frame once the GPU has finished, so this never stalls the pipeline.
          if (pendingQuery && gl.getQueryParameter(pendingQuery, gl.QUERY_RESULT_AVAILABLE)) {
            if (!gl.getParameter(timerExt.GPU_DISJOINT_EXT)) {
              gpuSamples.push(gl.getQueryParameter(pendingQuery, gl.QUERY_RESULT) / 1e6);
            }
            gl.deleteQuery(pendingQuery);
            pendingQuery = null;
          }
          if (!pendingQuery) {
            pendingQuery = gl.createQuery();
            gl.beginQuery(timerExt.TIME_ELAPSED_EXT, pendingQuery);
            composer.render();
            gl.endQuery(timerExt.TIME_ELAPSED_EXT);
          } else {
            composer.render();
          }
          if (gpuSamples.length >= 20) {
            // The median ignores the odd outlier (shader compile, a stall).
            gpuSamples.sort((a, b) => a - b);
            const median = gpuSamples[gpuSamples.length >> 1];
            gpuSamples = [];
            if (median > GPU_BUDGET_MS * 1.15) {
              setRenderScale(renderScale * 0.85);
            } else if (median < GPU_BUDGET_MS * 0.6) {
              setRenderScale(renderScale * 1.1);
            }
          }
        } else {
          composer.render();
          if (delta < 250) {
            slowAccum += delta;
            slowCount++;
          }
          if (slowAccum >= 1000) {
            // Sustained < 25 fps: shrink, and never grow back without a timer.
            if (slowAccum / slowCount > 40) setRenderScale(renderScale * 0.8);
            slowAccum = 0;
            slowCount = 0;
          }
        }
        lastRenderMs = now;
      }
      animationFrameId = window.requestAnimationFrame(tick);
    };

    tick();

    // WebGL Context Loss Handlers
    const handleContextLost = (e) => {
      e.preventDefault();
      cancelAnimationFrame(animationFrameId);
    };
    const handleContextRestored = () => {
      handleResize();
      tick();
    };

    canvas.addEventListener('webglcontextlost', handleContextLost, false);
    canvas.addEventListener('webglcontextrestored', handleContextRestored, false);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('dblclick', handleDoubleClick);
      window.removeEventListener('keydown', handleKeyDown);
      canvas.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);
      window.cancelAnimationFrame(animationFrameId);
      if (pendingQuery) gl.deleteQuery(pendingQuery);
      if (controls) controls.dispose();
      if (composer) composer.dispose();
      if (renderer) renderer.dispose();
    };
  }, []);

  return (
    <div
      className={`three-hero-bg-wrapper ${isHeroPage ? 'hero-visible' : 'hero-hidden'}${isInteractive ? ' orbit-active' : ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: isInteractive ? 9999 : -1,
        pointerEvents: isHeroPage ? (isInteractive ? 'auto' : 'none') : 'none',
        opacity: isHeroPage ? 1 : 0,
        visibility: isHeroPage ? 'visible' : 'hidden',
      }}
    >
      <canvas id="webgl-canvas" ref={canvasRef}></canvas>
      <div className={`bg-overlay${isInteractive ? ' orbit-active' : ''}`}></div>

      {isInteractive && (
        <div className="orbit-mode-badge" role="status" aria-live="polite">
          <span className="badge-title">✦ 3D ORBIT ACTIVE</span>
          <span className="badge-hint">DRAG TO ROTATE · SCROLL TO ZOOM · DOUBLE-CLICK OR ESC TO EXIT</span>
        </div>
      )}
    </div>
  );
}
