import { useEffect } from 'react';

const usePortfolioAnimations = () => {
  useEffect(() => {

    // ── NAV SCROLL EFFECT ──
    const nav = document.querySelector('nav');
    const handleNavScroll = () => {
      if (!nav) return;
      nav.style.background = window.scrollY > 50
        ? 'rgba(8,12,16,0.98)'
        : 'rgba(8,12,16,0.85)';
    };
    window.addEventListener('scroll', handleNavScroll);

    // ── SMOOTH SCROLL ──
    const anchors = document.querySelectorAll('a[href^="#"]');
    const handleAnchorClick = function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    anchors.forEach(a => a.addEventListener('click', handleAnchorClick));

    // ── ANIMATE ON SCROLL ──
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    const animateGroup = (selector, delay = 0.08) => {
      document.querySelectorAll(selector).forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.5s ${i * delay}s ease, transform 0.5s ${i * delay}s ease`;
        observer.observe(el);
      });
    };

    animateGroup('.pipeline-step', 0.08);
    animateGroup('.tech-card',     0.08);
    animateGroup('.lesson-card',   0.08);
    animateGroup('.overview-card', 0.10);

    // ── COUNT UP ANIMATION ──
    const countUpObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const numEl  = entry.target;
          const target = numEl.getAttribute('data-target');
          const suffix = numEl.getAttribute('data-suffix') || '';
          if (!target) return;

          const steps     = 60;
          const increment = parseFloat(target) / steps;
          let step        = 0;

          const timer = setInterval(() => {
            step++;
            const current = Math.min(parseFloat(target), increment * step);
            numEl.textContent = Math.floor(current) + suffix;
            if (step >= steps) {
              numEl.textContent = target + suffix;
              clearInterval(timer);
            }
          }, 1500 / steps);

          countUpObserver.unobserve(numEl);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.overview-num').forEach(el => {
      countUpObserver.observe(el);
    });

    // ── ACTIVE NAV LINK ──
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    const handleActiveNav = () => {
      let current = '';
      sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 100) {
          current = section.getAttribute('id');
        }
      });
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
          link.style.color = 'var(--accent)';
        }
      });
    };
    window.addEventListener('scroll', handleActiveNav);

    // ── CLEANUP ──
    return () => {
      window.removeEventListener('scroll', handleNavScroll);
      window.removeEventListener('scroll', handleActiveNav);
      anchors.forEach(a => a.removeEventListener('click', handleAnchorClick));
      observer.disconnect();
      countUpObserver.disconnect();
    };

  }, []);
};

export default usePortfolioAnimations;