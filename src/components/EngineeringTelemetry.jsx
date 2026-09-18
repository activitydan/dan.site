import { useAudio } from '../hooks/useAudio';
import danPhoto from '../assets/MYphoto.jpeg';
import { useLanguage } from '../i18n/context';

export default function EngineeringTelemetry() {
  const { playHoverSound, playClickSound } = useAudio();
  const { t } = useLanguage();

  return (
    <div className="telemetry-command-deck gsap-reveal font-label">
      {/* Top Header Bar - Clean and Professional */}
      <div className="telemetry-header">
        <div className="telemetry-header-left">
          <span className="telemetry-live-dot" />
          <span className="telemetry-hud-tag">Current Activity & Profiles</span>
        </div>
        <span className="telemetry-hud-status">Active in 2026 • Open for Opportunities</span>
      </div>

      {/* 3-Column Profile & Activity Grid */}
      <div className="telemetry-grid">
        {/* Card 1: What I'm Working On */}
        <div className="telemetry-card hoverable">
          <div className="telemetry-card-top">
            <span className="card-badge">CURRENT FOCUS</span>
            <span className="card-indicator">Active</span>
          </div>
          <h3 className="telemetry-card-title">{t('telemetry.focus.title')}</h3>
          <p className="telemetry-card-text text-gray">
            {t('telemetry.focus.text')}
          </p>
          <div className="telemetry-meta-row text-gray">
            <span>CORE STACK:</span>
            <span className="meta-highlight">Next.js, Vercel, Claude Code, Google Gemini</span>
          </div>
        </div>

        {/* Card 2: Trading, before the switch to engineering. No action link:
            this one is history, not somewhere to go. */}
        <div className="telemetry-card hoverable">
          <div className="telemetry-card-top">
            <span className="card-badge">PAST FOCUS</span>
            <span className="card-indicator">Inactive from 2024</span>
          </div>
          <h3 className="telemetry-card-title">{t('telemetry.past.title')}</h3>
          <p className="telemetry-card-text text-gray">
            {t('telemetry.past.text')}
          </p>

          {/* Identity chip, anchored to the foot of the card the way the core
              stack row is, so the three cards line up along the bottom. */}
          <div className="profile-preview">
            <img
              src={danPhoto}
              alt="Dan"
              className="profile-preview-avatar"
            />
            <div className="profile-preview-info">
              <div className="profile-preview-name">
                <span>Dan</span>
                <span className="profile-check" title="Verified Profile">✓</span>
              </div>
              <div className="profile-preview-role text-gray">
                {t('telemetry.profile.role')}
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Profile & Quick Contact */}
        <div className="telemetry-card telemetry-card-comms hoverable">
          <div className="telemetry-card-top">
            <span className="card-badge">PROFESSIONAL PROFILE</span>
            <span className="card-indicator">Open to Roles</span>
          </div>

          <p className="telemetry-card-text text-gray" style={{ marginBottom: '1rem' }}>
            {t('telemetry.profile.text')}
          </p>

          <div className="telemetry-actions-list">
            <a
              href="https://wa.me/919345380487?text=Hi%20Dinesh,%20saw%20your%20portfolio%20and%20wanted%20to%20connect!"
              target="_blank"
              rel="noopener noreferrer"
              className="telemetry-btn telemetry-btn-ping hoverable"
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
            >
              <span>Chat on WhatsApp</span>
              <span className="telemetry-arrow">💬</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
