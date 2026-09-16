import { useLanguage } from '../i18n/context';

const LABELS = { it: 'ITA', en: 'ENG' };

// The two site-wide switches, language and sound, in their own glass pill at
// the top right, where the resume link used to sit. They are deliberately
// outside the navigation dock: the dock is for going somewhere, these two
// change how the whole site behaves.
//
// Audio state is passed in rather than read from useAudio here, because that
// hook keeps isMuted in component state while the gain node behind it is a
// module singleton; a second caller would render a button that disagrees with
// what you actually hear.
//
// Two placements, one markup: "pill" is the floating top-right capsule, and
// "inline" sits inside the dock on phones, where the dock already spans the
// top band and a floating pill would land on top of it. CSS shows exactly one
// of them at any width.
export default function SiteControls({ variant = 'pill', isMuted, toggleMute, playClickSound, playHoverSound }) {
  const { lang, toggleLang } = useLanguage();
  const nextLang = lang === 'it' ? 'en' : 'it';

  return (
    <div className={variant === 'inline' ? 'site-controls-inline' : 'site-controls'}>
      <button
        type="button"
        onClick={() => { toggleLang(); playClickSound(); }}
        onMouseEnter={playHoverSound}
        className="site-control-btn hoverable font-label uppercase text-glow"
        aria-label={`Switch language to ${LABELS[nextLang]}`}
      >
        {LABELS[lang]}
      </button>

      <span className="site-controls-divider" aria-hidden="true" />

      <button
        type="button"
        onClick={() => { toggleMute(); playClickSound(); }}
        onMouseEnter={playHoverSound}
        className="site-control-btn hoverable font-label uppercase text-glow"
        aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
        aria-pressed={!isMuted}
      >
        {isMuted ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
        )}
      </button>
    </div>
  );
}
