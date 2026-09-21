import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useAudio } from '../hooks/useAudio';
import {
  WebArchitectureCanvas,
  ChatUpSocketStreamCanvas,
  RoastingAITokenStreamCanvas,
  EdgeResumeATSParserCanvas
} from './TimelineVisualizers';
import MaskedTitle from './MaskedTitle';
import { useLanguage } from '../i18n/context';
import burnTheBoats from '../assets/burn-the-boats.mp4';

// A stage whose slot holds footage rather than a canvas. Muted and inline are
// what let it start on its own on a phone; it only runs while its stage is the
// one on screen, the same rule the canvases follow.
function StageVideo({ src, isActive }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (isActive) {
      const started = el.play();
      // Autoplay can still be refused; there is nothing to do about it here
      // and an unhandled rejection would show up as an error.
      if (started && typeof started.catch === 'function') started.catch(() => {});
    } else {
      el.pause();
    }
  }, [isActive]);

  return (
    <video
      ref={ref}
      className="stage-video stage-video-boat"
      src={src}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
    />
  );
}

export default function Timeline() {
  const { playHoverSound, playClickSound } = useAudio();
  const [activeEpochIndex, setActiveEpochIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { t } = useLanguage();

  // Titles, headlines and summaries come from the translation catalogue; what
  // stays here is the language-independent data for each stage.
  const epochData = [
    {
      epoch: '01',
      date: 'DEC 2025 – MAR 2026',
      stageLabel: 'STAGE 01',
      category: 'THE SPARK',
      dockLabel: 'FOUNDATIONS',
      video: burnTheBoats,
      metrics: [
        { label: 'Timeline', value: 'Dec 2025 – Mar 2026' },
        { label: 'Focus', value: 'Web Foundations' },
        { label: 'Core Tools', value: 'HTML, CSS & Java' }
      ],
      techStack: ['HTML5', 'CSS3', 'Tailwind CSS', 'JavaScript', 'Java', 'Git'],
      Visualizer: WebArchitectureCanvas
    },
    {
      epoch: '02',
      date: '2026 • JUNE (5-DAY SPRINT)',
      stageLabel: 'STAGE 02',
      category: 'REAL-TIME SPRINT',
      dockLabel: '5-DAY SPRINT',
      metrics: [
        { label: 'Sprint Speed', value: '5 Days (June 2026)' },
        { label: 'Latency', value: '< 25ms Ping' },
        { label: 'Architecture', value: 'Socket.io + MongoDB' }
      ],
      techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io', 'JWT'],
      Visualizer: ChatUpSocketStreamCanvas
    },
    {
      epoch: '03',
      date: '2026 • JUNE (3-DAY SPRINT)',
      stageLabel: 'STAGE 03',
      category: 'APPLIED GENAI SPRINT',
      dockLabel: '3-DAY SPRINT',
      metrics: [
        { label: 'Sprint Speed', value: '3 Days (June 2026)' },
        { label: 'AI Engine', value: 'Google Gemini API' },
        { label: 'Stream Speed', value: '< 540ms TTFB' }
      ],
      techStack: ['React.js', 'Node.js', 'Gemini API', '@google/generative-ai', 'Tailwind CSS'],
      Visualizer: RoastingAITokenStreamCanvas
    },
    {
      epoch: '04',
      date: '2026 • PRODUCTION SAAS',
      stageLabel: 'STAGE 04',
      category: 'CLOUD & EDGE SAAS',
      dockLabel: 'PROD SAAS',
      metrics: [
        { label: 'Edge TTFB', value: '< 85ms Latency' },
        { label: 'Security', value: 'Google OAuth 2.0' },
        { label: 'Deployment', value: 'Cloudflare Pages' }
      ],
      techStack: ['Next.js', 'Cloudflare Pages', 'PostgreSQL', 'Prisma', 'Google OAuth 2.0', 'Express.js'],
      Visualizer: EdgeResumeATSParserCanvas
    }
  ];

  const epochs = useMemo(
    () => epochData.map((epoch, i) => ({ ...epoch, ...t('timeline.items')[i] })),
    // epochData is rebuilt every render and holds only static values, so the
    // language is the only thing that can actually change the result.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t],
  );

  // Auto-running loop across 4 stages (pauses on hover so user can read)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveEpochIndex((prev) => (prev + 1) % epochs.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused, epochs.length]);

  // Move button controls (loops infinitely in both directions)
  const handleNext = useCallback(() => {
    playClickSound();
    setActiveEpochIndex((prev) => (prev + 1) % epochs.length);
  }, [epochs.length, playClickSound]);

  const handlePrev = useCallback(() => {
    playClickSound();
    setActiveEpochIndex((prev) => (prev - 1 + epochs.length) % epochs.length);
  }, [epochs.length, playClickSound]);

  const goToEpoch = useCallback((targetIndex) => {
    if (targetIndex < 0 || targetIndex >= epochs.length) return;
    playClickSound();
    setActiveEpochIndex(targetIndex);
  }, [epochs.length, playClickSound]);

  // Keyboard Arrow navigation for accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  return (
    <section className="container timeline-section" id="experience">
      {/* Aligned Section Header matching #about, #work, #skills */}
      <div className="timeline-header">
        <div className="gsap-reveal">
          <MaskedTitle text="Philosophies" />
          <div className="divider" />
        </div>
        <div className="timeline-header-meta font-label">
          <div className="timeline-meta-pill">
            <span className={`meta-pulse-dot ${isPaused ? 'is-paused' : ''}`} />
            <span className="meta-pill-text">
              STAGE 0{activeEpochIndex + 1}/04 • {isPaused ? 'INTERACTIVE' : 'AUTO-RUNNING'}
            </span>
          </div>
          <div className="timeline-jump-strip">
            {epochs.map((ep, i) => (
              <button
                key={ep.epoch}
                type="button"
                onClick={() => goToEpoch(i)}
                onMouseEnter={playHoverSound}
                className={`timeline-jump-pill hoverable ${activeEpochIndex === i ? 'is-active' : ''}`}
                aria-label={`Jump to stage 0${i + 1}`}
              >
                0{i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Stage Slider with Side Navigation Arrows & Auto-running Loop */}
      <div
        className="timeline-stage-wrapper"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <button
          type="button"
          className="timeline-side-arrow timeline-arrow-prev hoverable font-label"
          onClick={handlePrev}
          onMouseEnter={playHoverSound}
          aria-label="Previous phase"
          title="Previous stage"
        >
          ‹
        </button>

        <div className="timeline-carousel-shell">
          <div
            className="timeline-cards-track"
            style={{ transform: `translateX(-${activeEpochIndex * 100}%)` }}
          >
            {epochs.map((item, idx) => {
              const Visualizer = item.Visualizer;
              const isActive = activeEpochIndex === idx;

              return (
                <div
                  key={item.epoch}
                  className={`timeline-card-slide ${isActive ? 'is-active' : ''}`}
                  onMouseEnter={() => {
                    if (!isActive) playHoverSound();
                  }}
                >
                  {/* The card is two sides and nothing else: words on the
                      left, a slot for a 2D or 3D animation on the right. */}
                  <div className="timeline-stage-card hoverable">
                    <div className="timeline-narrative-pane stage-copy">
                      <h3 className="stage-copy-title uppercase">{item.title}</h3>
                      <p className="stage-copy-text uppercase">{item.summary}</p>
                      {item.closing && (
                        <p className="stage-copy-closing uppercase">{item.closing}</p>
                      )}
                    </div>

                    {/* The animation slot: footage when the stage carries a
                        video, its own canvas otherwise. */}
                    <div className={`timeline-simulation-pane ${item.video ? 'is-video-stage' : ''}`}>
                      <div className="terminal-canvas-wrapper">
                        {item.video ? (
                          <StageVideo src={item.video} isActive={isActive} />
                        ) : (
                          <Visualizer isActive={isActive} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          className="timeline-side-arrow timeline-arrow-next hoverable font-label"
          onClick={handleNext}
          onMouseEnter={playHoverSound}
          aria-label="Next phase"
          title="Next stage"
        >
          ›
        </button>
      </div>
    </section>
  );
}
