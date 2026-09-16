import danPhoto from '../assets/MYphoto.jpeg';
import { useLanguage } from '../i18n/context';
import EngineeringTelemetry from './EngineeringTelemetry';
import Timeline from './Timeline';
import MaskedTitle from './MaskedTitle';

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="about-page-wrapper">
      {/* 1. Core Background & Engineering Philosophy */}
      <section id="about" className="container about-intro-section">
        <div className="about-grid">
          <div className="gsap-reveal">
            <MaskedTitle number="1." text="About Me" />
            <div className="divider" />
            <p className="text-gray about-text">
              {t('about.bio')}
            </p>
            <div className="font-label text-gray skill-list text-sm">
              <p><span style={{ color: '#fff' }}></span> System Architecture & Data Flows</p>
              <p><span style={{ color: '#fff' }}></span> AI-Augmented Code Synthesis & Prompting</p>
              <p><span style={{ color: '#fff' }}></span> UI Layout Craft (HTML, CSS, Tailwind)</p>
              <p><span style={{ color: '#fff' }}></span> Cloud & Edge Deployments (Cloudflare & Vercel)</p>
            </div>
          </div>

          <div className="abstract-box hoverable gsap-reveal">
            <div className="about-photo-wrapper">
              <img
                src={danPhoto}
                alt="Dan - Full Stack Developer & AI Engineer"
                className="about-photo-img"
                loading="eager"
              />
            </div>
          </div>
        </div>

        {/* Real-Time Engineering Telemetry & Verified Command Channels */}
        <EngineeringTelemetry />
      </section>

      {/* 2. Interactive Evolution Roadmap (Auto-looping + Move Buttons) */}
      <Timeline />
    </div>
  );
}


