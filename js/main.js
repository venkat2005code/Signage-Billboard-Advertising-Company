/**
 * SIGNMARK — Main JavaScript
 * Theme toggle, RTL/LTR, Navigation, Header scroll, Mobile menu
 */

(function () {
  'use strict';

  /* ──────────────────────────────────────
     THEME TOGGLE (Dark / Light)
  ────────────────────────────────────── */
  const html = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');

  function getStoredTheme() {
    return localStorage.getItem('signmark-theme') || 'dark';
  }

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('signmark-theme', theme);
  }

  function initTheme() {
    applyTheme(getStoredTheme());
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = html.getAttribute('data-theme') || 'dark';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  initTheme();


  /* ──────────────────────────────────────
     RTL / LTR TOGGLE
  ────────────────────────────────────── */
  const rtlToggle = document.getElementById('rtlToggle');
  const rtlLabel = document.getElementById('rtlLabel');

  function getStoredDir() {
    return localStorage.getItem('signmark-dir') || 'ltr';
  }

  function applyDir(dir) {
    html.setAttribute('dir', dir);
    localStorage.setItem('signmark-dir', dir);
    // Show only the ACTIVE mode
    if (rtlLabel) {
      rtlLabel.textContent = dir.toUpperCase();
    }
  }

  function initDir() {
    applyDir(getStoredDir());
  }

  if (rtlToggle) {
    rtlToggle.addEventListener('click', () => {
      const current = html.getAttribute('dir') || 'ltr';
      applyDir(current === 'ltr' ? 'rtl' : 'ltr');
    });
  }

  initDir();


  /* ──────────────────────────────────────
     HEADER SCROLL BEHAVIOUR
  ────────────────────────────────────── */
  const header = document.getElementById('siteHeader');
  let lastScroll = 0;

  function handleScroll() {
    const currentScroll = window.scrollY;

    if (header) {
      if (currentScroll > 60) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    lastScroll = currentScroll;
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();


  /* ──────────────────────────────────────
     MOBILE MENU
  ────────────────────────────────────── */
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileNav = document.getElementById('mobileNav');

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      mobileToggle.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.classList.remove('open');
        mobileToggle.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // Mobile sub-menu toggles
  document.querySelectorAll('[data-sub-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.subToggle);
      if (target) {
        target.classList.toggle('open');
        const arrow = btn.querySelector('.nav-arrow');
        if (arrow) arrow.style.transform = target.classList.contains('open') ? 'rotate(180deg)' : '';
      }
    });
  });


  /* ──────────────────────────────────────
     ACTIVE NAV LINK
  ────────────────────────────────────── */
  function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link[data-page], .mobile-nav-link[data-page]').forEach(link => {
      const page = link.getAttribute('data-page');
      if (page === currentPage) {
        link.classList.add('active');
      }
    });
  }

  setActiveNav();


  /* ──────────────────────────────────────
     PORTFOLIO DRAG SCROLL
  ────────────────────────────────────── */
  const portfolioTrack = document.querySelector('.portfolio-scroll-track');
  if (portfolioTrack) {
    let isDown = false;
    let startX;
    let scrollLeft;

    portfolioTrack.addEventListener('mousedown', (e) => {
      isDown = true;
      portfolioTrack.classList.add('active');
      startX = e.pageX - portfolioTrack.offsetLeft;
      scrollLeft = portfolioTrack.scrollLeft;
    });

    portfolioTrack.addEventListener('mouseleave', () => { isDown = false; portfolioTrack.classList.remove('active'); });
    portfolioTrack.addEventListener('mouseup', () => { isDown = false; portfolioTrack.classList.remove('active'); });
    portfolioTrack.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - portfolioTrack.offsetLeft;
      const walk = (x - startX) * 1.5;
      portfolioTrack.scrollLeft = scrollLeft - walk;
    });
  }


  /* ──────────────────────────────────────
     FORM SUBMISSION (Demo)
  ────────────────────────────────────── */
  document.querySelectorAll('.enquiry-form, .campaign-form, .brief-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        const originalText = btn.textContent;
        btn.textContent = '✓ Sent! We\'ll be in touch soon.';
        btn.style.background = '#22c55e';
        btn.disabled = true;
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.disabled = false;
          form.reset();
        }, 4000);
      }
    });
  });


  /* ──────────────────────────────────────
     TICKER / MARQUEE ANIMATION
  ────────────────────────────────────── */
  function initMarquee() {
    const marquees = document.querySelectorAll('.marquee-track');
    marquees.forEach(track => {
      const content = track.innerHTML;
      track.innerHTML = content + content; // duplicate for seamless loop
    });
  }

  initMarquee();


  /* ──────────────────────────────────────
     COUNTER ANIMATION
  ────────────────────────────────────── */
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 1800;
    const step = 16;
    const increment = target / (duration / step);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.round(current).toLocaleString();
    }, step);
  }

  // Trigger on intersection
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        entry.target.classList.add('counted');
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('span[data-target]').forEach(el => counterObserver.observe(el));


  /* ──────────────────────────────────────
     FAQ ACCORDION
  ────────────────────────────────────── */
  document.querySelectorAll('.faq-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const item = toggle.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item.open').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-toggle').setAttribute('aria-expanded', 'false');
      });

      // Open clicked if it was closed
      if (!isOpen) {
        item.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
      }
    });
  });


  /* ──────────────────────────────────────
     SERVICES TABBED INTERFACE
  ────────────────────────────────────── */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  if (tabBtns.length && tabPanes.length) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons and panes
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => {
          p.classList.remove('active');
          p.style.display = 'none';
        });

        // Add active class to clicked button and target pane
        btn.classList.add('active');
        const targetId = btn.getAttribute('data-target');
        const targetPane = document.getElementById(targetId);
        if (targetPane) {
          targetPane.classList.add('active');
          targetPane.style.display = '';
        }
      });
    });
  }

})();

  /* ──────────────────────────────────────
     INTERACTIVE MAP SCROLL
  ────────────────────────────────────── */
  document.querySelectorAll('.interactive-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      const targetId = dot.getAttribute('data-scroll-to');
      if (targetId) {
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          const headerOffset = 80;
          const elementPosition = targetEl.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
