/**
 * SIGNMARK — Scroll Animations & Parallax
 */

(function () {
  'use strict';

  /* ──────────────────────────────────────
     SCROLL REVEAL (Intersection Observer)
  ────────────────────────────────────── */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px',
    }
  );

  function initReveal() {
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => {
      revealObserver.observe(el);
    });
  }

  /* ──────────────────────────────────────
     STAGGERED CHILDREN
  ────────────────────────────────────── */
  function initStagger() {
    document.querySelectorAll('[data-stagger]').forEach((parent) => {
      const children = parent.children;
      Array.from(children).forEach((child, i) => {
        child.style.transitionDelay = `${i * 0.08}s`;
        child.classList.add('reveal');
        revealObserver.observe(child);
      });
    });
  }

  /* ──────────────────────────────────────
     HERO TEXT SPLIT ANIMATION
  ────────────────────────────────────── */
  function initHeroAnimation() {
    const heroTitle = document.querySelector('.h1-hero-title, .h2-hero-title');
    if (!heroTitle) return;

    heroTitle.style.opacity = '0';
    heroTitle.style.transform = 'translateY(30px)';

    setTimeout(() => {
      heroTitle.style.transition = 'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)';
      heroTitle.style.opacity = '1';
      heroTitle.style.transform = 'translateY(0)';
    }, 100);

    const heroSubtitle = document.querySelector('.h1-hero-subtitle, .h2-hero-body');
    if (heroSubtitle) {
      heroSubtitle.style.opacity = '0';
      heroSubtitle.style.transform = 'translateY(20px)';
      setTimeout(() => {
        heroSubtitle.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s';
        heroSubtitle.style.opacity = '1';
        heroSubtitle.style.transform = 'translateY(0)';
      }, 100);
    }

    const heroCta = document.querySelector('.h1-hero-actions, .h2-hero-cta-row');
    if (heroCta) {
      heroCta.style.opacity = '0';
      heroCta.style.transform = 'translateY(16px)';
      setTimeout(() => {
        heroCta.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.35s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.35s';
        heroCta.style.opacity = '1';
        heroCta.style.transform = 'translateY(0)';
      }, 100);
    }

    const heroEyebrow = document.querySelector('.h1-hero-eyebrow, .h2-hero-tag');
    if (heroEyebrow) {
      heroEyebrow.style.opacity = '0';
      heroEyebrow.style.transform = 'translateY(12px)';
      setTimeout(() => {
        heroEyebrow.style.transition = 'opacity 0.7s ease 0.05s, transform 0.7s ease 0.05s';
        heroEyebrow.style.opacity = '1';
        heroEyebrow.style.transform = 'translateY(0)';
      }, 100);
    }
  }

  /* ──────────────────────────────────────
     PARALLAX ON HERO BG
  ────────────────────────────────────── */
  function initParallax() {
    const heroBg = document.querySelector('.h1-hero-bg img');
    if (!heroBg) return;

    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const rate = scrolled * 0.3;
      heroBg.style.transform = `translateY(${rate}px)`;
    }, { passive: true });
  }

  /* ──────────────────────────────────────
     NUMBER TICKER (client stats)
  ────────────────────────────────────── */
  function initTicker() {
    const ticker = document.querySelector('.ticker-wrapper');
    if (!ticker) return;

    // Already handled by CSS animation via marquee-track
  }

  /* ──────────────────────────────────────
     SMOOTH ANCHOR LINKS
  ────────────────────────────────────── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          e.preventDefault();
          const headerHeight = document.getElementById('siteHeader')?.offsetHeight || 80;
          const targetY = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
          window.scrollTo({ top: targetY, behavior: 'smooth' });
        }
      });
    });
  }

  /* ──────────────────────────────────────
     INIT ALL
  ────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    initReveal();
    initStagger();
    initHeroAnimation();
    initParallax();
    initTicker();
    initSmoothScroll();
  });

})();
