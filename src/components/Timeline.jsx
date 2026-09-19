import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useAudio } from '../hooks/useAudio';
import {
  ChatUpSocketStreamCanvas,
  RoastingAITokenStreamCanvas,
  EdgeResumeATSParserCanvas
} from './TimelineVisualizers';
import MaskedTitle from './MaskedTitle';
import penroseTriangle from '../assets/penrose-triangle.png';
import { useLanguage } from '../i18n/context';

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
      // A philosophy stage: two passages instead of metrics and a tech list,
      // answered by two figures instead of a live canvas.
      kind: 'philosophy'
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
              const isPhilosophy = item.kind === 'philosophy';

              return (
                <div
                  key={item.epoch}
                  className={`timeline-card-slide ${isActive ? 'is-active' : ''}`}
                  onMouseEnter={() => {
                    if (!isActive) playHoverSound();
                  }}
                >
                  {/* Stage Container Card */}
                  <div className="timeline-stage-card hoverable">
                    {/* Left Pane: Narrative & Technical Telemetry */}
                    <div className="timeline-narrative-pane">
                      <div className="stage-topbar font-label">
                        {/* A philosophy card is not a dated milestone, so it
                            carries only its stage number. */}
                        {!isPhilosophy && (
                          <div className="stage-topbar-left">
                            <span className="stage-badge uppercase">{item.category}</span>
                            <span className="stage-date uppercase">{item.date}</span>
                          </div>
                        )}
                        <span className="stage-step-tag text-gray">{item.stageLabel}</span>
                      </div>

                      {!isPhilosophy && (
                        <div className="stage-title-wrap">
                          <h3 className="stage-title uppercase text-glow">{item.title}</h3>
                          <div className="stage-headline font-label text-gray uppercase">{item.headline}</div>
                        </div>
                      )}

                      {isPhilosophy ? (
                        <div className="stage-philosophy-list">
                          {item.philosophies.map((passage, pIdx) => (
                            <p key={pIdx} className="stage-philosophy uppercase">{passage}</p>
                          ))}
                        </div>
                      ) : (
                        <>
                          <p className="stage-summary text-gray">{item.summary}</p>

                          {/* Telemetry Metrics Grid */}
                          <div className="stage-metrics-grid font-label">
                            {item.metrics.map((m, mIdx) => (
                              <div key={mIdx} className="stage-metric-box">
                                <span className="metric-lbl text-gray">{m.label}</span>
                                <span className="metric-val">{m.value}</span>
                              </div>
                            ))}
                          </div>

                          {/* Tech Stack Pills matching .skill-pill */}
                          <div className="stage-tech-pills font-label">
                            {item.techStack.map((tech, tIdx) => (
                              <span key={tIdx} className="stage-pill">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </>
                      )}
                    </div>

                    {/* Right Pane: a live visualizer, or for a philosophy
                        stage the two figures the passages refer to */}
                    <div className="timeline-simulation-pane">
                      {isPhilosophy ? (
                        <div className="philosophy-figures">
                          {/* In this order each figure sits beside the passage
                              that describes it: the delta, then the triangle. */}
                          <div className="philosophy-figure">
                            <span className="philosophy-glyph" aria-hidden="true">Δ</span>
                          </div>
                          <span className="philosophy-figures-divider" />
                          <div className="philosophy-figure">
                            <img
                              src={penroseTriangle}
                              alt="Triangolo di Penrose"
                              className="philosophy-figure-img"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="terminal-canvas-wrapper">
                          <Visualizer isActive={isActive} />
                        </div>
                      )}
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
