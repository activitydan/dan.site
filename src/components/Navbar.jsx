import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAudio } from '../hooks/useAudio';
import SiteControls from './SiteControls';

function ConvexText({ text }) {
  if (!text) return null;
  const chars = Array.from(String(text));

  return (
    <span className="convex-word">
      {chars.map((char, i) => (
        <span key={i} className="convex-char">
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}

function NavLink({ to, children, className, onMouseEnter, onClick }) {
  return (
    <Link to={to} className={className} onMouseEnter={onMouseEnter} onClick={onClick}>
      <ConvexText text={children} />
    </Link>
  );
}

export default function Navbar({ isHeroPage }) {
  const { isMuted, toggleMute, playHoverSound, playClickSound } = useAudio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const ticking = useRef(false);

  // Close mobile drawer on route change (render-time adjustment per React 19 standards)
  const [prevPath, setPrevPath] = useState(location.pathname);
  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname);
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  }

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [mobileMenuOpen]);

  // Close on Escape key press
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  useEffect(() => {
    // If not on hero page, keep it always visible without attaching scroll listener.
    if (!isHeroPage) {
      return;
    }

    const updateNavVisibility = () => {
      setIsScrolled(window.scrollY > 120);
    };

    const handleScroll = () => {
      if (ticking.current) return;
      window.requestAnimationFrame(() => {
        updateNavVisibility();
        ticking.current = false;
      });
      ticking.current = true;
    };

    updateNavVisibility();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateNavVisibility);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateNavVisibility);
    };
  }, [isHeroPage]);

  const navRoutes = [
    { path: '/', label: 'Home', number: '01' },
    { path: '/about', label: 'About', number: '02' },
    { path: '/work', label: 'Work', number: '03' },
    { path: '/skills', label: 'Skills', number: '04' },
    { path: '/contact', label: 'Contact', number: '05' },
  ];

  return (
    <>
      {/* 1. Top-Left Logo (Only visible on Hero page) */}
      <div
        className={`hero-logo ${!isHeroPage ? 'fade-out' : 'fade-in'}`}
        style={{
          position: 'fixed',
          top: '2rem',
          left: '2rem',
          zIndex: 1000,
          pointerEvents: isHeroPage ? 'auto' : 'none'
        }}
      >
        <Link
          to="/"
          className="logo hoverable text-glow"
          onMouseEnter={playHoverSound}
          onClick={playClickSound}
          style={{ textDecoration: 'none', color: '#fff', fontSize: '1.5rem', fontWeight: 700, letterSpacing: '0.1em' }}
        >
          <ConvexText text="DAN" />
        </Link>
      </div>

      {/* Site-wide switches, in the corner the resume link used to occupy */}
      <SiteControls
        isMuted={isMuted}
        toggleMute={toggleMute}
        playClickSound={playClickSound}
        playHoverSound={playHoverSound}
      />

      {/* 2. Glass Dock Navigation (Visible everywhere) */}
      <nav className={`dock-mode ${isHeroPage && isScrolled ? 'nav-hidden' : 'nav-visible'}`}>
        <div className="container nav-inner">
          {/* Mobile brand badge inside dock */}
          <Link
            to="/"
            className="mobile-brand-link font-label uppercase text-glow"
            onClick={() => { playClickSound(); setMobileMenuOpen(false); }}
          >
            Dan
          </Link>

          {/* Desktop Navigation Links */}
          <div className="nav-links font-label uppercase">
            {!isHeroPage && (
              <NavLink to="/" className="nav-link hoverable text-glow" onMouseEnter={playHoverSound} onClick={playClickSound}>Home</NavLink>
            )}
            <NavLink to="/about" className="nav-link hoverable text-glow" onMouseEnter={playHoverSound} onClick={playClickSound}>About</NavLink>
            <NavLink to="/work" className="nav-link hoverable text-glow" onMouseEnter={playHoverSound} onClick={playClickSound}>Work</NavLink>
            <NavLink to="/skills" className="nav-link hoverable text-glow" onMouseEnter={playHoverSound} onClick={playClickSound}>Skills</NavLink>
            <NavLink to="/contact" className="nav-link hoverable text-glow" onMouseEnter={playHoverSound} onClick={playClickSound}>Contact</NavLink>
          </div>

          <div className="nav-actions">
            {/* Language and sound, shown here only on phones; on wider screens
                they render in the floating pill above instead. */}
            <SiteControls
              variant="inline"
              isMuted={isMuted}
              toggleMute={toggleMute}
              playClickSound={playClickSound}
              playHoverSound={playHoverSound}
            />

            {/* Mobile Hamburger Menu Toggle Button */}
            <button
              type="button"
              className="mobile-menu-toggle hoverable"
              onClick={() => {
                setMobileMenuOpen(prev => !prev);
                playClickSound();
              }}
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              <span className={`hamburger-bar ${mobileMenuOpen ? 'open top' : ''}`} />
              <span className={`hamburger-bar ${mobileMenuOpen ? 'open bot' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* 3. Luxury Full-Screen Mobile Navigation Drawer */}
      <div
        className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
      >
        <div className="mobile-drawer-header font-label">
          <span className="mobile-drawer-tag text-gray">NAVIGATION</span>
          <button
            type="button"
            className="mobile-drawer-close hoverable"
            onClick={() => { setMobileMenuOpen(false); playClickSound(); }}
            aria-label="Close navigation menu"
          >
            ✕
          </button>
        </div>

        <div className="mobile-nav-links font-label">
          {navRoutes.map((route) => {
            const isActive = location.pathname === route.path;
            return (
              <Link
                key={route.path}
                to={route.path}
                className={`mobile-nav-item hoverable ${isActive ? 'active' : ''}`}
                onClick={() => {
                  setMobileMenuOpen(false);
                  playClickSound();
                }}
              >
                <span className="mobile-nav-num text-gray">{route.number}</span>
                <span className="mobile-nav-label uppercase text-glow">{route.label}</span>
                {isActive && <span className="mobile-nav-indicator">●</span>}
              </Link>
            );
          })}
        </div>

        <div className="mobile-drawer-footer font-label">
          <div className="mobile-footer-meta text-gray">
            <span>FULL STACK DEVELOPER & AIML</span>
            <span>PORTFOLIO v2.0</span>
          </div>
        </div>
      </div>
    </>
  );
}
