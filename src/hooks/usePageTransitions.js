import { useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import { stopLenis, resetLenis } from './useLenis';

gsap.registerPlugin(Observer);

const ROUTES = ['/', '/about', '/work', '/skills', '/contact'];

// What each section is called on screen. The URL and the name are separate on
// purpose: /skills is labelled Core, and anything that names a section reads
// this rather than echoing the path, so the dock, the drawer and the scroll
// hint cannot end up disagreeing.
export const ROUTE_LABELS = {
  '/': 'Home',
  '/about': 'About',
  '/work': 'Work',
  '/skills': 'Core',
  '/contact': 'Contact',
};
const COOLDOWN_MS = 850;

// How much more vertical than horizontal a drag has to be before it counts as
// a page change, and how far it has to travel. Without this, dragging a skills
// card sideways carries enough stray vertical movement past the observer's
// tolerance to flip the route. A wheel or trackpad scroll has no start point
// and is never filtered.
const VERTICAL_RATIO = 1.8;
const MIN_DRAG_PX = 60;

const isVerticalDrag = (self) => {
  if (!self || self.event?.type === 'wheel') return true;
  const dx = Math.abs(self.x - self.startX);
  const dy = Math.abs(self.y - self.startY);
  // Anything that is not a drag reports no start point; leave it alone.
  if (!Number.isFinite(dx) || !Number.isFinite(dy)) return true;
  return dy >= MIN_DRAG_PX && dy >= dx * VERTICAL_RATIO;
};

export default function usePageTransitions({ isActive }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isNavigating = useRef(false);
  const observerRef = useRef(null);
  const cooldownTimer = useRef(null);

  const isModalOrMenuOpen = useCallback(() => {
    return (
      document.querySelector('.project-modal-overlay') !== null ||
      document.querySelector('.mobile-nav-drawer.open') !== null ||
      document.body.style.overflow === 'hidden'
    );
  }, []);

  const transitionTo = useCallback((direction) => {
    if (isNavigating.current || isModalOrMenuOpen()) return;

    const currentIndex = ROUTES.indexOf(location.pathname);
    if (currentIndex === -1) return;

    let nextIndex = -1;
    if (direction === 'next' && currentIndex < ROUTES.length - 1) {
      nextIndex = currentIndex + 1;
    } else if (direction === 'prev' && currentIndex > 0) {
      nextIndex = currentIndex - 1;
    }

    if (nextIndex === -1) return;

    isNavigating.current = true;
    if (observerRef.current) {
      observerRef.current.disable();
    }
    stopLenis();

    const targetRoute = ROUTES[nextIndex];

    // Silky GSAP exit fade on outgoing section
    gsap.to('.page-transition-wrapper', {
      opacity: 0,
      duration: 0.28,
      ease: 'power2.in',
      onComplete: () => {
        window.scrollTo(0, 0);
        if (document.documentElement) document.documentElement.scrollTop = 0;
        if (document.body) document.body.scrollTop = 0;
        resetLenis();
        navigate(targetRoute);
      }
    });
  }, [location.pathname, navigate, isModalOrMenuOpen]);

  // Re-enable observer and release navigation lock after new route has settled
  useEffect(() => {
    clearTimeout(cooldownTimer.current);
    cooldownTimer.current = setTimeout(() => {
      isNavigating.current = false;
      if (observerRef.current) {
        observerRef.current.enable();
      }
    }, COOLDOWN_MS);

    return () => clearTimeout(cooldownTimer.current);
  }, [location.pathname]);

  // Initialize GSAP Observer section snapper
  useEffect(() => {
    if (!isActive) return;

    observerRef.current = Observer.create({
      // No 'pointer': that is what let a held left button drag the page from
      // one route to the next, which made reaching left for a skills card a
      // coin toss. With 'touch' and no 'pointer', Observer ignores any pointer
      // event whose pointerType is not 'touch', so a mouse drag stops counting
      // even on a laptop with a touchscreen, while the wheel still works.
      type: 'wheel,touch',
      wheelSpeed: -1,
      tolerance: 45,
      preventDefault: false, // Allow normal internal scrolling inside page content
      onUp: (self) => {
        // onUp = user scrolled down / swiped up (intent to move forward)
        if (isNavigating.current || isModalOrMenuOpen()) return;
        if (!isVerticalDrag(self)) return;

        const isHero = location.pathname === '/';
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = window.innerHeight;
        const atBottom = clientHeight + Math.round(scrollY) >= scrollHeight - 15;

        // On Hero, single intentional scroll down moves to About
        if (isHero) {
          transitionTo('next');
          return;
        }

        // On inner content pages, only transition to next section when resting at bottom
        if (atBottom) {
          transitionTo('next');
        }
      },
      onDown: (self) => {
        // onDown = user scrolled up / swiped down (intent to move backward)
        if (isNavigating.current || isModalOrMenuOpen()) return;
        if (!isVerticalDrag(self)) return;

        const isHero = location.pathname === '/';
        if (isHero) return; // Cannot go backward from Hero

        const scrollY = window.scrollY || document.documentElement.scrollTop;
        const atTop = scrollY <= 8;

        // On inner content pages, only transition to previous section when resting at top
        if (atTop) {
          transitionTo('prev');
        }
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.kill();
        observerRef.current = null;
      }
    };
  }, [isActive, location.pathname, transitionTo, isModalOrMenuOpen]);

  const currentIndex = ROUTES.indexOf(location.pathname);
  return {
    currentIndex,
    hasPrev: currentIndex > 0,
    hasNext: currentIndex !== -1 && currentIndex < ROUTES.length - 1,
    prevRoute: currentIndex > 0 ? ROUTES[currentIndex - 1] : null,
    nextRoute: currentIndex < ROUTES.length - 1 ? ROUTES[currentIndex + 1] : null,
    transitionTo
  };
}
