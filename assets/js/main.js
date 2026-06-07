/* ============================================================
   KDO DIGITAL — MAIN JS
   GSAP hero word-reveal + ScrollTrigger reveals
   Nav glass / mobile menu / countup
   ============================================================ */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── NAV: glass on scroll ── */
  const nav = document.getElementById('nav');
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── MOBILE MENU ── */
  const ham     = document.getElementById('navHam');
  const mobMenu = document.getElementById('mobileMenu');

  if (ham && mobMenu) {
    const toggleMenu = (forceClose) => {
      const isOpen = forceClose ? false : !mobMenu.classList.contains('open');
      mobMenu.classList.toggle('open', isOpen);
      ham.classList.toggle('open', isOpen);
      ham.setAttribute('aria-expanded', String(isOpen));
      mobMenu.setAttribute('aria-hidden', String(!isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    ham.addEventListener('click', () => toggleMenu());

    /* Close on any link click inside the menu */
    mobMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => toggleMenu(true));
    });

    /* Close on Escape */
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') toggleMenu(true);
    });
  }

  /* ══════════════════════════════════════════
     ANIMATIONS — wait for GSAP to load (defer)
  ══════════════════════════════════════════ */
  function initAnimations() {

    /* ── HERO: word-slide-up reveal (text clips via overflow:hidden on .h1-line) ── */
    if (!prefersReducedMotion && typeof gsap !== 'undefined') {

      gsap.registerPlugin(ScrollTrigger);

      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      /* 1. Label fades up */
      tl.to('.hero-label', {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay: 0.1,
      });

      /* 2. "DIGITAL THAT" — each word slides up from under clip */
      tl.to('.h1-word', {
        opacity: 1,
        y: '0%',
        duration: 1,
        stagger: 0.14,
      }, '-=0.4');

      /* 3. "actually works." italic — slides up with slight extra delay */
      tl.to('.h1-italic', {
        opacity: 1,
        y: '0%',
        duration: 1.1,
        ease: 'power3.out',
      }, '-=0.6');

      /* 4. Sub text */
      tl.to('.hero-sub', {
        opacity: 1,
        y: 0,
        duration: 0.8,
      }, '-=0.5');

      /* 5. CTA buttons */
      tl.to('.hero-actions', {
        opacity: 1,
        y: 0,
        duration: 0.7,
      }, '-=0.5');

      /* 6. Stats bar at bottom */
      tl.to('.hero-stats', {
        opacity: 1,
        y: 0,
        duration: 0.7,
      }, '-=0.4');

    } else {
      /* Reduced motion / GSAP unavailable — show everything immediately */
      [
        '.hero-label', '.h1-word', '.h1-italic',
        '.hero-sub', '.hero-actions', '.hero-stats',
      ].forEach(sel => {
        document.querySelectorAll(sel).forEach(el => {
          el.style.opacity = '1';
          el.style.transform = 'none';
        });
      });
    }

    /* ── SCROLL REVEALS ── */
    if (!prefersReducedMotion && typeof ScrollTrigger !== 'undefined') {

      /* Use GSAP ScrollTrigger for section reveals */
      document.querySelectorAll('.reveal-up, .reveal-left').forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 92%',
          onEnter: () => el.classList.add('is-visible'),
        });
      });

    } else {
      /* Fallback: IntersectionObserver */
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

      document.querySelectorAll('.reveal-up, .reveal-left').forEach(el => {
        observer.observe(el);
      });
    }
  }

  /* ── COUNT-UP for stat numbers ── */
  function initCountUp() {
    const els = document.querySelectorAll('[data-count]');
    if (!els.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el     = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        const dur    = prefersReducedMotion ? 0 : 1400;
        const start  = performance.now();

        const tick = (now) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / dur, 1);
          const eased = 1 - Math.pow(1 - progress, 3); /* ease-out-cubic */
          el.textContent = Math.round(eased * target) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        };

        if (dur === 0) {
          el.textContent = target + suffix;
        } else {
          requestAnimationFrame(tick);
        }

        observer.unobserve(el);
      });
    }, { threshold: 0.5 });

    els.forEach(el => observer.observe(el));
  }

  /* ── WAIT FOR GSAP (scripts are deferred, execute in order) ── */
  function waitForGSAP(cb, deadline = 3000) {
    const t0 = Date.now();
    const poll = () => {
      if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        cb();
      } else if (Date.now() - t0 < deadline) {
        setTimeout(poll, 40);
      } else {
        cb(); /* run anyway — GSAP paths gracefully degrade */
      }
    };
    poll();
  }

  /* ── BOOT ── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      waitForGSAP(() => {
        initAnimations();
        initCountUp();
      });
    });
  } else {
    waitForGSAP(() => {
      initAnimations();
      initCountUp();
    });
  }

}());
