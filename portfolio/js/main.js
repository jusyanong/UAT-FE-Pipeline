// ── NAV SCROLL EFFECT ──
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 50) {
    nav.style.background = 'rgba(8,12,16,0.98)';
  } else {
    nav.style.background = 'rgba(8,12,16,0.85)';
  }
});

// ── SMOOTH SCROLL FOR NAV LINKS ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── ANIMATE ELEMENTS ON SCROLL ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

// Observe pipeline steps
document.querySelectorAll('.pipeline-step').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = `opacity 0.5s ${i * 0.08}s ease, transform 0.5s ${i * 0.08}s ease`;
  observer.observe(el);
});

// Observe tech cards
document.querySelectorAll('.tech-card').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = `opacity 0.5s ${i * 0.08}s ease, transform 0.5s ${i * 0.08}s ease`;
  observer.observe(el);
});

// Observe lesson cards
document.querySelectorAll('.lesson-card').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = `opacity 0.5s ${i * 0.08}s ease, transform 0.5s ${i * 0.08}s ease`;
  observer.observe(el);
});

// Observe overview cards
document.querySelectorAll('.overview-card').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = `opacity 0.5s ${i * 0.1}s ease, transform 0.5s ${i * 0.1}s ease`;
  observer.observe(el);
});

// ── COUNT UP ANIMATION FOR OVERVIEW NUMBERS ──
const countUpObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const numEl = entry.target;
      const target = numEl.getAttribute('data-target');
      const suffix = numEl.getAttribute('data-suffix') || '';

      if (!target) return;

      const duration = 1500;
      const steps = 60;
      const increment = parseFloat(target) / steps;
      let current = 0;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        current = Math.min(parseFloat(target), increment * step);
        numEl.textContent = (Number.isInteger(parseFloat(target))
          ? Math.floor(current)
          : current.toFixed(0)) + suffix;
        if (step >= steps) {
          numEl.textContent = target + suffix;
          clearInterval(timer);
        }
      }, duration / steps);

      countUpObserver.unobserve(numEl);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.overview-num').forEach(el => {
  countUpObserver.observe(el);
});

// ── ACTIVE NAV LINK ON SCROLL ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = 'var(--accent)';
    }
  });
});