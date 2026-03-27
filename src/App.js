import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [count, setCount] = useState({ deploys: 0, uptime: 0, builds: 0 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const targets = { deploys: 128, uptime: 99, builds: 512 };
    const duration = 1800;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount({
        deploys: Math.floor(targets.deploys * ease),
        uptime: Math.floor(targets.uptime * ease),
        builds: Math.floor(targets.builds * ease),
      });
      if (step >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="app">

      {/* NAV */}
      <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
        <div className="nav__logo">UAT<span>FE</span></div>
        <div className="nav__links">
          <a href="#features">Features</a>
          <a href="#pipeline">Pipeline</a>
          <a href="#contact">Contact</a>
        </div>
        <a href="#contact" className="nav__cta">Get Started</a>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero__noise" />
        <div className="hero__grid" />
        <div className="hero__content">
          <div className="hero__badge">CI/CD Pipeline · v1.0</div>
          <h1 className="hero__title">
            Ship frontend<br />
            <span className="hero__title--accent">fearlessly.</span>
          </h1>
          <p className="hero__subtitle">
            Automated testing, building, and deployment — from GitHub to production without breaking a sweat.
          </p>
          <div className="hero__actions">
            <a href="#pipeline" className="btn btn--primary">View Pipeline</a>
            <a href="#features" className="btn btn--ghost">Learn More</a>
          </div>
        </div>
        <div className="hero__visual">
          <div className="terminal">
            <div className="terminal__bar">
              <span /><span /><span />
              <p>jenkinsfile</p>
            </div>
            <div className="terminal__body">
              <p><span className="t-blue">pipeline</span> {'{'}</p>
              <p>&nbsp;&nbsp;<span className="t-blue">agent</span> any</p>
              <p>&nbsp;&nbsp;<span className="t-green">stages</span> {'{'}</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;<span className="t-yellow">stage</span>(<span className="t-orange">'Build'</span>) {'{'}</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;steps {'{'}</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="t-green">sh</span> <span className="t-orange">'npm run build'</span></p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'}'}</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;{'}'}</p>
              <p>&nbsp;&nbsp;{'}'}</p>
              <p>{'}'}</p>
              <p className="t-cursor">▋</p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats">
        <div className="stats__item">
          <span className="stats__number">{count.deploys}+</span>
          <span className="stats__label">Deployments</span>
        </div>
        <div className="stats__divider" />
        <div className="stats__item">
          <span className="stats__number">{count.uptime}%</span>
          <span className="stats__label">Uptime</span>
        </div>
        <div className="stats__divider" />
        <div className="stats__item">
          <span className="stats__number">{count.builds}+</span>
          <span className="stats__label">Builds Run</span>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features" id="features">
        <div className="section__header">
          <p className="section__label">What We Do</p>
          <h2 className="section__title">Built for modern<br />frontend teams.</h2>
        </div>
        <div className="features__grid">
          {[
            { icon: '⚡', title: 'Fast Builds', desc: 'Optimized npm pipelines with caching and parallel execution.' },
            { icon: '🐳', title: 'Docker Ready', desc: 'Containerized deployments with multi-stage builds for lean images.' },
            { icon: '🔒', title: 'Secure by Default', desc: 'Credentials managed via Jenkins vault — no secrets in code.' },
            { icon: '🔄', title: 'Auto Rollback', desc: 'Failed deployments automatically revert to the last stable image.' },
            { icon: '📊', title: 'Build Logs', desc: 'Timestamped console output for every stage of your pipeline.' },
            { icon: '🧪', title: 'Test First', desc: 'CI=true test runs block broken code from ever reaching production.' },
          ].map((f, i) => (
            <div className="feature-card" key={i} style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="feature-card__icon">{f.icon}</div>
              <h3 className="feature-card__title">{f.title}</h3>
              <p className="feature-card__desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PIPELINE STEPS */}
      <section className="pipeline" id="pipeline">
        <div className="section__header">
          <p className="section__label">How It Works</p>
          <h2 className="section__title">From push to<br />production.</h2>
        </div>
        <div className="pipeline__steps">
          {[
            { step: '01', title: 'Checkout', desc: 'Jenkins pulls latest code from GitHub via secure PAT credentials.' },
            { step: '02', title: 'Install', desc: 'Dependencies installed with npm install inside the pipeline environment.' },
            { step: '03', title: 'Test', desc: 'Automated tests run in CI mode — failures stop the pipeline immediately.' },
            { step: '04', title: 'Build', desc: 'React app compiled and optimized for production with npm run build.' },
            { step: '05', title: 'Dockerize', desc: 'App bundled into a lightweight Nginx Docker image and tagged with build number.' },
            { step: '06', title: 'Deploy', desc: 'Container pushed to Docker Hub and deployed live on the target server.' },
          ].map((s, i) => (
            <div className="pipeline__step" key={i}>
              <div className="pipeline__step-num">{s.step}</div>
              <div className="pipeline__step-content">
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
              {i < 5 && <div className="pipeline__connector" />}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta" id="contact">
        <div className="cta__inner">
          <h2 className="cta__title">Ready to automate<br />your deployments?</h2>
          <p className="cta__sub">Set up your Jenkins pipeline in minutes.</p>
          <a href="https://github.com/jusyanong/UAT-FE-Pipeline" className="btn btn--primary btn--lg" target="_blank" rel="noreferrer">
            View on GitHub →
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2025 UAT-FE-Pipeline · Built with React + Jenkins + Docker</p>
      </footer>

    </div>
  );
}

export default App;
