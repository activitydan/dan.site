
import { useMemo, useState } from 'react';
import ProjectModal from './ProjectModal';
import MaskedTitle from './MaskedTitle';
import { useLanguage } from '../i18n/context';

import chatup1 from '../assets/chatup-1.webp';
import chatup2 from '../assets/chatup-2.webp';

import roast1 from '../assets/roast-1.webp';
import roast2 from '../assets/roast-2.webp';
import roast3 from '../assets/roast-3.webp';

import resumeMain from '../assets/resume.webp';
import resume1 from '../assets/resume1.webp';
import resume2 from '../assets/resume2.webp';
import resume3 from '../assets/resume3.webp';

export default function Work() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(null);

  const { t } = useLanguage();

  // Only the language-independent data lives here. Every piece of prose comes
  // from the translation catalogue and is merged in below, so a project's copy
  // and its assets never drift apart.
  const projectData = useMemo(
    () => [
      {
        bgClass: 'bg-3',
        shortTitle: 'AI Resume Builder',
        category: 'SAAS \u2022 SYSTEM ARCHITECTURE \u2022 AI DIRECTION',
        techStack: [
          'Next.js',
          'Express',
          'PostgreSQL',
          'Prisma',
          'Google OAuth',
          'Gemini API',
          'Cloudflare Pages'
        ],
        architectureFlow: [
          { step: '01', tech: 'Next.js \u2022 Cloudflare' },
          { step: '02', tech: 'Google OAuth 2.0' },
          { step: '03', tech: 'Node.js \u2022 Express' },
          { step: '04', tech: 'Gemini Flash \u2022 PostgreSQL' },
        ],
        metrics: [
          { label: 'Edge TTFB', value: '< 85ms' },
          { label: 'ATS Match Accuracy', value: '98.6%' },
          { label: 'Avg AI Stream Time', value: '1.2s' },
          { label: 'Security Standard', value: 'OAuth 2.0' },
        ],
        title: 'AI Resume Builder',
        images: [resumeMain, resume1, resume2, resume3],
        githubUrl: 'https://github.com/DineshS36/resume-analyser',
        liveDemoUrl: 'https://resume-analyser.pages.dev',
        exploreUrl: 'https://resume-analyser.pages.dev'
      },
      {
        bgClass: 'bg-1',
        shortTitle: 'ChatUp',
        category: 'REAL-TIME ARCHITECTURE \u2022 FULL STACK',
        techStack: ['React', 'Node.js', 'Express.js', 'Socket.io', 'MongoDB'],
        architectureFlow: [
          { step: '01', tech: 'React \u2022 State Sync' },
          { step: '02', tech: 'Socket.io Cluster' },
          { step: '03', tech: 'Node.js \u2022 Express API' },
          { step: '04', tech: 'MongoDB Atlas' },
        ],
        metrics: [
          { label: 'Socket Ping', value: '< 25ms' },
          { label: 'Delivery Guarantee', value: '99.99%' },
          { label: 'Re-connect Time', value: '< 400ms' },
          { label: 'Data Protocol', value: 'WebSockets' },
        ],
        title: 'ChatUp',
        images: [chatup1, chatup2],
        githubUrl: 'https://github.com/DineshS36/chatup',
        liveDemoUrl: 'https://chatup-phi.vercel.app',
        exploreUrl: 'https://chatup-phi.vercel.app'
      },
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
