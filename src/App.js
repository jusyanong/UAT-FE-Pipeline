import React from 'react';
import './styles/styles.css';
import usePortfolioAnimations from './hooks/usePortfolioAnimations';

function App() {
  usePortfolioAnimations();

  return (
    <div>

      {/* ── NAV ── */}
      <nav>
        <div className="nav-logo">jusyanong.DevOps</div>
        <ul className="nav-links">
          <li><a href="#overview">Overview</a></li>
          <li><a href="#pipeline">Pipeline</a></li>
          <li><a href="#architecture">Architecture</a></li>
          <li><a href="#stack">Stack</a></li>
          <li><a href="#repos">Repos</a></li>
        </ul>
      </nav>

      {/* ── HERO ── */}
      <div className="hero">
        <div className="hero-inner">
          <div className="hero-tag">DevOps Project · 2026</div>
          <h1 className="hero-title">
            <span className="line1">CI/CD</span><br />
            <span className="line2">PIPELINE</span><br />
            <span className="line3">AUTOMATION</span>
          </h1>
          <p className="hero-desc">
            Built a fully automated CI/CD pipeline using Jenkins, Docker, and AWS EC2 —
            from GitHub source code to a live containerized React application,
            monitored end-to-end with Prometheus and Grafana.
          </p>
          <div className="hero-stack">
            <span className="stack-badge blue">Jenkins</span>
            <span className="stack-badge blue">Docker</span>
            <span className="stack-badge blue">GitHub</span>
            <span className="stack-badge green">AWS EC2</span>
            <span className="stack-badge green">React</span>
            <span className="stack-badge green">Node.js</span>
            <span className="stack-badge orange">Prometheus</span>
            <span className="stack-badge orange">Grafana</span>
            <span className="stack-badge">Nginx</span>
            <span className="stack-badge">Docker Hub</span>
          </div>
        </div>
      </div>

      <div className="divider" />

      {/* ── OVERVIEW ── */}
      <section id="overview">
        <p className="section-label">Project Overview</p>
        <h2 className="section-title">What I Built</h2>
        <div className="overview-grid">
          <div className="overview-card">
            <div className="overview-num" data-target="2" data-suffix="">2</div>
            <div className="overview-label">EC2 Instances</div>
          </div>
          <div className="overview-card">
            <div className="overview-num" data-target="7" data-suffix="">7</div>
            <div className="overview-label">Pipeline Stages</div>
          </div>
          <div className="overview-card">
            <div className="overview-num" data-target="100" data-suffix="%">100%</div>
            <div className="overview-label">Automated Deploy</div>
          </div>
          <div className="overview-card">
            <div className="overview-num" data-target="24" data-suffix="/7">24/7</div>
            <div className="overview-label">Monitoring</div>
          </div>
        </div>
        <p className="overview-desc">
          This project demonstrates a production-grade DevOps workflow — starting from a GitHub repository,
          automatically triggered on every push, running through a multi-stage Jenkins pipeline,
          containerized with Docker, pushed to Docker Hub, deployed on AWS EC2,
          and monitored live through Prometheus and Grafana dashboards.
        </p>
      </section>

      <div className="divider" />

      {/* ── PIPELINE ── */}
      <section id="pipeline">
        <p className="section-label">How It Works</p>
        <h2 className="section-title">Pipeline Stages</h2>
        <div className="pipeline">

          <div className="pipeline-step">
            <div className="step-num">01</div>
            <div className="step-content">
              <h3>Source Control — GitHub</h3>
              <p>Code is pushed to a GitHub repository. Jenkins is connected via a Personal Access Token (PAT) with repo scope. A webhook triggers the pipeline automatically on every push to the master branch.</p>
              <div className="step-tags">
                <span className="step-tag">GitHub PAT</span>
                <span className="step-tag">Webhook</span>
                <span className="step-tag">SCM Polling</span>
              </div>
            </div>
          </div>

          <div className="pipeline-step">
            <div className="step-num">02</div>
            <div className="step-content">
              <h3>Checkout — Jenkins Pulls Code</h3>
              <p>Jenkins checks out the latest code from the GitHub repository using configured credentials. The Jenkinsfile in the repo root defines all pipeline stages declaratively.</p>
              <div className="step-tags">
                <span className="step-tag">Jenkinsfile</span>
                <span className="step-tag">Declarative Pipeline</span>
                <span className="step-tag">git credentials</span>
              </div>
            </div>
          </div>

          <div className="pipeline-step">
            <div className="step-num">03</div>
            <div className="step-content">
              <h3>Install Dependencies — npm install</h3>
              <p>Node.js 18 is configured as a Jenkins tool. Dependencies are installed using npm install inside the pipeline environment, with error handling that fails the build immediately on any issue.</p>
              <div className="step-tags">
                <span className="step-tag">NodeJS Plugin</span>
                <span className="step-tag">npm install</span>
                <span className="step-tag">try/catch</span>
              </div>
            </div>
          </div>

          <div className="pipeline-step">
            <div className="step-num">04</div>
            <div className="step-content">
              <h3>Build — React Production Build</h3>
              <p>The React application is compiled into a production-optimized static bundle using npm run build. CI=true flag ensures the build fails on warnings, maintaining code quality standards.</p>
              <div className="step-tags">
                <span className="step-tag">npm run build</span>
                <span className="step-tag">React</span>
                <span className="step-tag">Production optimization</span>
              </div>
            </div>
          </div>

          <div className="pipeline-step">
            <div className="step-num">05</div>
            <div className="step-content">
              <h3>Docker Build — Containerize the App</h3>
              <p>A multi-stage Dockerfile builds the application — Stage 1 compiles the React app using Node.js, Stage 2 serves it via Nginx Alpine for a minimal final image. Tagged with both build number and latest.</p>
              <div className="step-tags">
                <span className="step-tag">Multi-stage Dockerfile</span>
                <span className="step-tag">Nginx Alpine</span>
                <span className="step-tag">Image tagging</span>
              </div>
            </div>
          </div>

          <div className="pipeline-step">
            <div className="step-num">06</div>
            <div className="step-content">
              <h3>Push — Docker Hub Registry</h3>
              <p>The built image is pushed to Docker Hub using securely stored Jenkins credentials. Both versioned and latest tags are pushed, enabling rollback to any previous version.</p>
              <div className="step-tags">
                <span className="step-tag">Docker Hub</span>
                <span className="step-tag">Jenkins Credentials</span>
                <span className="step-tag">Image versioning</span>
              </div>
            </div>
          </div>

          <div className="pipeline-step">
            <div className="step-num">07</div>
            <div className="step-content">
              <h3>Deploy — Live on AWS EC2</h3>
              <p>The container is stopped and removed if running, the new image is pulled from Docker Hub, and a fresh container is launched with restart always policy — ensuring zero-downtime deployments.</p>
              <div className="step-tags">
                <span className="step-tag">AWS EC2</span>
                <span className="step-tag">Docker run</span>
                <span className="step-tag">Auto restart</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      <div className="divider" />

      {/* ── ARCHITECTURE ── */}
      <section id="architecture">
        <p className="section-label">System Design</p>
        <h2 className="section-title">Architecture</h2>
        <div className="arch-box">
  <pre>
    <span className="text-white">
{`
  ┌─────────────────────────────────────────────────────────┐
  │                    DEVELOPER MACHINE                    │
  └──────────────────────────┬──────────────────────────────┘`}</span>
    <span className="text-muted">
{`

                             │  git push
                             
                             ▼`}</span>
    <span className="text-info">
{`
  ┌─────────────────────────────────────────────────────────┐
  │                    GITHUB REPOSITORY                    │
  │              Jenkinsfile + React Source Code            │
  └──────────────────────────┬──────────────────────────────┘`}</span>
    <span className="text-warning">
{`

                             │  webhook trigger
                             
                             ▼
  ┌─────────────────────────────────────────────────────────┐
  │               EC2 INSTANCE 1 — JENKINS                  │
  │                                                         │
  │   Checkout → Install → Build → Docker Build → Push      │
  │                    → Deploy → Verify                    │
  │                                                         │
  │   Port: 8080          Exposes: /prometheus/ metrics     │
  └─────────────┬────────────────────── ┬───────────────────┘
  `}</span>
    <span className="text-success">
{`
                │                       │

          docker push            metrics scrape
                ▼                       ▼
  ┌──────────────────┐    ┌───────────────────────────────────┐
  │   DOCKER HUB     │    │   EC2 INSTANCE 2 — MONITORING     │
  │                  │    │                                   │
  │  Image Registry  │    │   Prometheus  →  Grafana          │
  │  versioned tags  │    │   Port: 9090      Port: 3001      │
  └──────────────────┘    └───────────────────────────────────┘`
  }</span>
    <span className="text-muted">
{`     
                │

                │  docker pull

                ▼`
                }</span>
    <span className="text-success">
{`
  ┌─────────────────────────────────────────────────────────┐
  │               REACT APP — LIVE ON EC2                   │
  │         Served via Nginx inside Docker container        │
  │                      Port: 80                           │
  └─────────────────────────────────────────────────────────┘`
  }</span>
  </pre>
</div>
      </section>

      <div className="divider" />

      {/* ── TECH STACK ── */}
      <section id="stack">
        <p className="section-label">Technologies Used</p>
        <h2 className="section-title">Tech Stack</h2>
        <div className="tech-grid">
          <div className="tech-card">
            <div className="tech-icon">⚙️</div>
            <div className="tech-name">Jenkins</div>
            <p className="tech-desc">Declarative pipeline with 7 stages, NodeJS plugin, Docker integration, GitHub webhook triggers, and credential management for secure deployments.</p>
          </div>
          <div className="tech-card">
            <div className="tech-icon">🐳</div>
            <div className="tech-name">Docker</div>
            <p className="tech-desc">Multi-stage builds for optimized images. Docker Hub registry for image storage. Container lifecycle management in the deploy stage.</p>
          </div>
          <div className="tech-card">
            <div className="tech-icon">☁️</div>
            <div className="tech-name">AWS EC2</div>
            <p className="tech-desc">Two Amazon Linux 2023 EC2 instances — one for Jenkins CI/CD and one for the Prometheus + Grafana monitoring stack.</p>
          </div>
          <div className="tech-card">
            <div className="tech-icon">⚛️</div>
            <div className="tech-name">React</div>
            <p className="tech-desc">Frontend application built with React 18, compiled with npm run build, served via Nginx Alpine inside a Docker container.</p>
          </div>
          <div className="tech-card">
            <div className="tech-icon">📊</div>
            <div className="tech-name">Prometheus</div>
            <p className="tech-desc">Metrics collection from Jenkins via the Prometheus plugin. Scrapes /prometheus/ endpoint every 15 seconds for real-time data.</p>
          </div>
          <div className="tech-card">
            <div className="tech-icon">📈</div>
            <div className="tech-name">Grafana</div>
            <p className="tech-desc">Dashboard visualizations for Jenkins build metrics, JVM memory, CPU usage, executor status, queue size, and build health scores.</p>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── REPOS ── */}
      <section id="repos">
        <p className="section-label">Source Code</p>
        <h2 className="section-title">Repositories</h2>
        <div className="repos-section">

          <a
            href="https://github.com/jusyanong/jusyanong-cicd.git"
            target="_blank"
            rel="noreferrer"
            className="repo-card"
          >
            <span className="repo-icon">📦</span>
            <div className="repo-info">
              <div className="repo-name">jusyanong-cicd</div>
              <div className="repo-desc">Jenkins CI/CD pipeline for React frontend with Docker deployment on AWS EC2</div>
            </div>
            <span className="repo-arrow">→</span>
          </a>

          {/* ADD MORE REPOS HERE — copy the block above */}

        </div>
      </section>

      <div className="divider" />

      {/* ── LESSONS ── */}
      <section>
        <p className="section-label">Takeaways</p>
        <h2 className="section-title">What I Learned</h2>
        <div className="lessons-grid">
          <div className="lesson-card">
            <h4>CI/CD Pipeline Design</h4>
            <p>Learned how to design a full declarative Jenkins pipeline with proper error handling, try/catch blocks, and post-build actions that keep credentials safe and builds reliable.</p>
          </div>
          <div className="lesson-card">
            <h4>Docker & Containerization</h4>
            <p>Built multi-stage Dockerfiles to minimize image size. Managed container lifecycles — stop, remove, pull, and run — automatically inside the pipeline.</p>
          </div>
          <div className="lesson-card">
            <h4>AWS Infrastructure</h4>
            <p>Configured EC2 instances, security groups, inbound rules, and IAM permissions. Learned how to separate concerns across multiple instances for CI/CD and monitoring.</p>
          </div>
          <div className="lesson-card">
            <h4>Observability & Monitoring</h4>
            <p>Set up Prometheus scraping Jenkins metrics and visualized them in Grafana. Understood how metric prefixes, data sources, and dashboard variables work together.</p>
          </div>
          <div className="lesson-card">
            <h4>Troubleshooting & Debugging</h4>
            <p>Debugged real errors — npm not found (exit 127), Docker permission issues, FilePath missing in Jenkinsfile post blocks, and Prometheus KUBECONFIG conflicts.</p>
          </div>
          <div className="lesson-card">
            <h4>Security Best Practices</h4>
            <p>Used Jenkins credential manager for GitHub PAT and Docker Hub tokens. Escaped shell variables to prevent credential leakage. Never hardcoded secrets in code.</p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <p>Built by <span>Justine Miguel Yanong</span> · CI/CD Pipeline Project · 2026</p>
        <p style={{ marginTop: '0.5rem' }}>Jenkins · Docker · AWS EC2 · React · Prometheus · Grafana</p>
      </footer>

    </div>
  );
}

export default App;