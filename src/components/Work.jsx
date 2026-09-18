
import { useMemo, useState } from 'react';
import ProjectModal from './ProjectModal';
import MaskedTitle from './MaskedTitle';
import { useLanguage } from '../i18n/context';

import roast1 from '../assets/roast-1.webp';
import roast2 from '../assets/roast-2.webp';
import roast3 from '../assets/roast-3.webp';

export default function Work() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(null);

  const { t } = useLanguage();

  // Only the language-independent data lives here. Every piece of prose comes
  // from the translation catalogue and is merged in below, so a project's copy
  // and its assets never drift apart.
  // A single project, shown as one full-width card. Only the language-
  // independent data lives here; the prose comes from the catalogue below.
  const projectData = useMemo(
    () => [
      {
        bgClass: 'bg-2',
        shortTitle: 'AI Roast Generator',
        category: 'APPLIED GENAI \u2022 PROMPT ARCHITECTURE',
        techStack: ['React', 'Node.js', 'Gemini API'],
        architectureFlow: [
          { step: '01', tech: 'React \u2022 Glassmorphism' },
          { step: '02', tech: 'Edge Middleware' },
          { step: '03', tech: 'Google Gemini API' },
          { step: '04', tech: 'Chunked Stream' },
        ],
        metrics: [
          { label: 'First Token Latency', value: '< 620ms' },
          { label: 'Humor Archetypes', value: '8 Modes' },
          { label: 'Context Hit Rate', value: '100%' },
          { label: 'FPS Performance', value: '60 FPS' },
        ],
        title: 'AI Roast Generator',
        images: [roast1, roast2, roast3],
        githubUrl: 'https://github.com/DineshS36/Roasting_AI',
        liveDemoUrl: 'https://roasting-ai.pages.dev',
        exploreUrl: 'https://roasting-ai.pages.dev'
      }
    ],
    []
  );

  const projects = useMemo(
    () => {
      const copy = t('work.projects');
      return projectData.map((proj, i) => ({
        ...proj,
        ...copy[i],
        // Flow nodes keep their step number and tech label from the data above
        // and take only the wording from the catalogue.
        architectureFlow: proj.architectureFlow.map((node, n) => ({
          ...node,
          ...copy[i].architectureFlow[n],
        })),
      }));
    },
    [projectData, t]
  );

  const activeProject = activeProjectIndex === null ? null : projects[activeProjectIndex];

  return (
    <section id="work" className="container work-page-section">
      <div className="gsap-reveal work-header">
        <MaskedTitle number="2." text="Featured Work" />
        <div className="divider" />
      </div>

      <div className="work-grid">
        {projects.map((proj, index) => (
          <div
            key={proj.title}
            className="project-card hoverable gsap-work-card"
            role="button"
            tabIndex={0}
            onClick={() => setActiveProjectIndex(index)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') setActiveProjectIndex(index);
            }}
            aria-label={`Open project: ${proj.title}`}
          >
            <div className={`project-bg ${proj.bgClass}`} />
            <div className="project-overlay" />
            <div className="project-info">
              <p className="font-label project-category text-gray uppercase">{proj.category}</p>
              <h3 className="project-title text-glow uppercase">{proj.title}</h3>
            </div>
          </div>
        ))}
      </div>

      <ProjectModal
        open={activeProjectIndex !== null}
        onClose={() => setActiveProjectIndex(null)}
        project={activeProject}
      />
    </section>
  );
}
