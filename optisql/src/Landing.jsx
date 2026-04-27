import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import QueryOptimizer from './components/QueryOptimizer'

function Landing() {
  const navigate = useNavigate()

  useEffect(() => {
    const onClickNav = (event) => {
      const link = event.target.closest('a[data-scroll-target]')
      if (!link) return
      event.preventDefault()
      const targetId = link.getAttribute('data-scroll-target')
      const el = document.getElementById(targetId)
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    document.addEventListener('click', onClickNav)
    return () => document.removeEventListener('click', onClickNav)
  }, [])

  return (
    <div className="landing">
      <style>{`
        :root {
          color-scheme: dark;
        }

        .landing {
          min-height: 100vh;
          background: linear-gradient(135deg, #020617, #0f172a, #1e293b);
          color: #e2e8f0;
          font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            Inter, 'Helvetica Neue', Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji';
          overflow-x: hidden;
        }

        .landing a {
          color: inherit;
          text-decoration: none;
        }

        .landing-shell {
          max-width: 1200px;
          margin: 0 auto;
          padding-left: 16px;
          padding-right: 16px;
        }

        .navbar {
          position: sticky;
          top: 0;
          z-index: 50;
          backdrop-filter: blur(10px);
          background: linear-gradient(180deg, rgba(2, 6, 23, 0.65), rgba(2, 6, 23, 0));
          border-bottom: 1px solid rgba(148, 163, 184, 0.12);
        }

        .navbar-inner {
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .logo {
          font-weight: 800;
          letter-spacing: -0.03em;
          font-size: 18px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          white-space: nowrap;
        }

        .logo-badge {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: linear-gradient(135deg, #60a5fa, #a78bfa);
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15);
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 18px;
          color: rgba(226, 232, 240, 0.9);
          font-size: 14px;
        }

        .nav-links a {
          padding: 10px 10px;
          border-radius: 10px;
          transition: background 160ms ease, color 160ms ease;
          color: rgba(226, 232, 240, 0.86);
        }

        .nav-links a:hover {
          background: rgba(148, 163, 184, 0.12);
          color: #e2e8f0;
        }

        .nav-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 14px;
          border-radius: 12px;
          border: 1px solid rgba(148, 163, 184, 0.18);
          background: rgba(15, 23, 42, 0.55);
          color: #e2e8f0;
          font-weight: 600;
          cursor: pointer;
          transition: transform 160ms ease, box-shadow 160ms ease, background 160ms ease;
          white-space: nowrap;
        }

        .nav-cta:hover {
          transform: translateY(-1px);
          background: rgba(15, 23, 42, 0.75);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
        }

        .hero {
          padding: 64px 0 44px;
          position: relative;
        }

        .hero::before {
          content: '';
          position: absolute;
          inset: -200px -100px auto -100px;
          height: 420px;
          background: radial-gradient(
            60% 60% at 50% 40%,
            rgba(59, 130, 246, 0.25),
            rgba(167, 139, 250, 0.12),
            rgba(2, 6, 23, 0)
          );
          pointer-events: none;
          filter: blur(0px);
        }

        .hero-inner {
          position: relative;
          text-align: center;
          padding: 22px 0;
        }

        .hero-title {
          margin: 0;
          font-weight: 900;
          letter-spacing: -0.04em;
          line-height: 1.05;
          font-size: clamp(34px, 4.8vw, 56px);
        }

        .hero-subtitle {
          margin: 16px auto 0;
          max-width: 880px;
          color: rgba(226, 232, 240, 0.82);
          font-size: clamp(15px, 1.55vw, 18px);
          line-height: 1.6;
        }

        .hero-cta-row {
          margin-top: 26px;
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .primary-cta {
          border: 1px solid rgba(96, 165, 250, 0.35);
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(167, 139, 250, 0.85));
          color: #0b1220;
          font-weight: 800;
          padding: 12px 16px;
          border-radius: 14px;
          cursor: pointer;
          transition: transform 160ms ease, box-shadow 160ms ease, filter 160ms ease;
          min-width: 190px;
        }

        .primary-cta:hover {
          transform: translateY(-1px);
          box-shadow: 0 18px 40px rgba(59, 130, 246, 0.18);
          filter: brightness(1.03);
        }

        .secondary-cta {
          border: 1px solid rgba(148, 163, 184, 0.22);
          background: rgba(2, 6, 23, 0.25);
          color: rgba(226, 232, 240, 0.92);
          font-weight: 650;
          padding: 12px 16px;
          border-radius: 14px;
          cursor: pointer;
          transition: transform 160ms ease, background 160ms ease;
          min-width: 190px;
        }

        .secondary-cta:hover {
          transform: translateY(-1px);
          background: rgba(2, 6, 23, 0.42);
        }

        .section {
          padding: 56px 0;
        }

        .section-title {
          margin: 0 0 10px;
          font-size: 22px;
          letter-spacing: -0.02em;
        }

        .section-label {
          text-transform: uppercase;
          letter-spacing: 0.18em;
          font-size: 12px;
          font-weight: 700;
          color: rgba(226, 232, 240, 0.7);
          margin-bottom: 10px;
        }

        .section-subtitle {
          margin: 0 0 24px;
          color: rgba(226, 232, 240, 0.78);
          line-height: 1.65;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }

        .feature-card {
          border-radius: 18px;
          border: 1px solid rgba(148, 163, 184, 0.14);
          background: rgba(2, 6, 23, 0.35);
          padding: 18px 18px;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.25);
          transition: transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease;
          min-height: 132px;
        }

        .feature-card:hover {
          transform: translateY(-2px);
          border-color: rgba(96, 165, 250, 0.32);
          box-shadow:
            0 22px 60px rgba(0, 0, 0, 0.35),
            0 0 0 1px rgba(96, 165, 250, 0.06),
            0 0 0 10px rgba(59, 130, 246, 0.05);
        }

        .feature-top {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
        }

        .feature-icon {
          font-size: 18px;
        }

        .feature-title {
          margin: 0;
          font-weight: 800;
          letter-spacing: -0.02em;
          font-size: 15px;
        }

        .feature-text {
          margin: 0;
          color: rgba(226, 232, 240, 0.78);
          line-height: 1.6;
          font-size: 14px;
        }

        .about-card {
          border-radius: 18px;
          border: 1px solid rgba(148, 163, 184, 0.14);
          background: rgba(2, 6, 23, 0.3);
          padding: 20px;
          line-height: 1.8;
          color: rgba(226, 232, 240, 0.84);
        }

        .qo {
          border-radius: 22px;
          border: 1px solid rgba(148, 163, 184, 0.14);
          background: rgba(2, 6, 23, 0.26);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.22);
          padding: 22px;
        }

        .qo-head {
          text-align: center;
          margin-bottom: 16px;
        }

        .qo-label {
          text-transform: uppercase;
          letter-spacing: 0.18em;
          font-size: 12px;
          font-weight: 800;
          color: rgba(226, 232, 240, 0.7);
        }

        .qo-title {
          margin: 10px 0 6px;
          font-size: 22px;
          letter-spacing: -0.02em;
        }

        .qo-subtitle {
          margin: 0;
          color: rgba(226, 232, 240, 0.78);
          line-height: 1.65;
        }

        .qo-grid {
          margin-top: 18px;
          display: grid;
          grid-template-columns: 1fr 1.35fr;
          gap: 16px;
          align-items: start;
        }

        .qo-editorCard,
        .qo-resultsCard {
          border-radius: 18px;
          border: 1px solid rgba(148, 163, 184, 0.14);
          background: rgba(2, 6, 23, 0.35);
          padding: 16px;
        }

        .qo-editorLabel {
          display: block;
          font-size: 12px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(226, 232, 240, 0.7);
          font-weight: 800;
          margin-bottom: 10px;
        }

        .qo-editor {
          width: 100%;
          resize: vertical;
          min-height: 160px;
          border-radius: 14px;
          border: 1px solid rgba(148, 163, 184, 0.16);
          background: rgba(2, 6, 23, 0.55);
          color: rgba(226, 232, 240, 0.92);
          padding: 12px;
          outline: none;
          font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          line-height: 1.55;
          font-size: 13px;
        }

        .qo-editor:focus {
          border-color: rgba(96, 165, 250, 0.4);
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15);
        }

        .qo-analyze {
          margin-top: 12px;
          border: 1px solid rgba(96, 165, 250, 0.35);
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(167, 139, 250, 0.85));
          color: #0b1220;
          font-weight: 900;
          padding: 11px 14px;
          border-radius: 14px;
          cursor: pointer;
          transition: transform 160ms ease, box-shadow 160ms ease, filter 160ms ease;
          width: 100%;
        }

        .qo-analyze:hover {
          transform: translateY(-1px);
          box-shadow: 0 18px 40px rgba(59, 130, 246, 0.18);
          filter: brightness(1.03);
        }

        .qo-empty {
          color: rgba(226, 232, 240, 0.78);
          line-height: 1.65;
          padding: 10px;
        }

        .qo-cards {
          display: grid;
          gap: 12px;
        }

        .qo-issue {
          border-radius: 16px;
          border: 1px solid rgba(148, 163, 184, 0.14);
          background: rgba(2, 6, 23, 0.4);
          padding: 14px;
        }

        .qo-issueTop {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
        }

        .qo-issueTitle {
          margin: 0;
          font-size: 14px;
          letter-spacing: -0.01em;
        }

        .qo-issueDetail,
        .qo-issueSuggestion {
          margin: 0;
          color: rgba(226, 232, 240, 0.78);
          line-height: 1.6;
          font-size: 13px;
        }

        .qo-issueSuggestion {
          margin-top: 8px;
        }

        .qo-muted {
          color: rgba(226, 232, 240, 0.64);
        }

        .qo-impactRow {
          margin-top: 10px;
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          color: rgba(226, 232, 240, 0.7);
          font-size: 12px;
        }

        .qo-pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 22px;
          padding: 0 10px;
          border-radius: 999px;
          border: 1px solid rgba(148, 163, 184, 0.18);
          font-weight: 900;
          letter-spacing: 0.08em;
          font-size: 10px;
        }

        .qo-pill--high {
          background: rgba(239, 68, 68, 0.12);
          border-color: rgba(239, 68, 68, 0.35);
        }

        .qo-pill--medium {
          background: rgba(245, 158, 11, 0.12);
          border-color: rgba(245, 158, 11, 0.35);
        }

        .qo-pill--low {
          background: rgba(34, 197, 94, 0.12);
          border-color: rgba(34, 197, 94, 0.35);
        }

        .qo-compare {
          margin-top: 14px;
          border-radius: 16px;
          border: 1px solid rgba(148, 163, 184, 0.14);
          background: rgba(2, 6, 23, 0.4);
          padding: 14px;
        }

        .qo-compareHead {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 10px;
        }

        .qo-compareLabel {
          text-transform: uppercase;
          letter-spacing: 0.18em;
          font-size: 11px;
          font-weight: 900;
          color: rgba(226, 232, 240, 0.7);
          margin-bottom: 6px;
        }

        .qo-compareNote {
          color: rgba(226, 232, 240, 0.72);
          font-size: 12px;
          line-height: 1.5;
        }

        .qo-score {
          border: 1px solid rgba(148, 163, 184, 0.16);
          background: rgba(2, 6, 23, 0.55);
          border-radius: 14px;
          padding: 10px 12px;
          text-align: right;
          min-width: 120px;
        }

        .qo-scoreLabel {
          display: block;
          color: rgba(226, 232, 240, 0.65);
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 2px;
          font-weight: 800;
        }

        .qo-scoreValue {
          font-weight: 900;
          font-size: 16px;
        }

        .qo-tableWrap {
          overflow-x: auto;
          border-radius: 14px;
          border: 1px solid rgba(148, 163, 184, 0.14);
        }

        .qo-table {
          width: 100%;
          border-collapse: collapse;
          font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 12px;
        }

        .qo-table th,
        .qo-table td {
          padding: 10px 10px;
          border-bottom: 1px solid rgba(148, 163, 184, 0.12);
          text-align: left;
          color: rgba(226, 232, 240, 0.82);
          white-space: nowrap;
        }

        .qo-table th {
          color: rgba(226, 232, 240, 0.65);
          text-transform: uppercase;
          letter-spacing: 0.16em;
          font-weight: 900;
          font-size: 10px;
          background: rgba(2, 6, 23, 0.55);
        }

        .footer {
          border-top: 1px solid rgba(148, 163, 184, 0.12);
          padding: 22px 0;
          color: rgba(226, 232, 240, 0.7);
          font-size: 14px;
        }

        @media (max-width: 860px) {
          .nav-links {
            display: none;
          }

          .navbar-inner {
            height: 64px;
          }
        }

        @media (max-width: 900px) {
          .features-grid {
            grid-template-columns: 1fr;
          }

          .hero {
            padding-top: 52px;
          }
        }

        @media (max-width: 767px) {
          .landing-shell {
            padding-left: 24px;
            padding-right: 24px;
          }

          .hero {
            padding: 44px 0 34px;
          }

          .hero-inner {
            padding: 16px 0;
            text-align: center;
          }

          .hero-subtitle {
            margin-top: 14px;
          }

          .section {
            padding: 44px 0;
            margin: 40px 0;
          }

          .feature-card {
            padding: 16px;
            min-height: auto;
          }

          .about-card {
            padding: 16px;
          }

          .primary-cta,
          .secondary-cta {
            width: clamp(150px, 38vw, 220px);
            margin: 0 auto;
          }

          .hero-cta-row {
            gap: 10px;
            flex-direction: column;
            align-items: center;
          }

          .qo {
            padding: 16px;
          }

          .qo-grid {
            grid-template-columns: 1fr;
          }

          .qo-compareHead {
            flex-direction: column;
            align-items: stretch;
          }

          .qo-score {
            text-align: left;
          }
        }
      `}</style>

      <header className="navbar">
        <div className="landing-shell navbar-inner">
          <Link className="logo" to="/" aria-label="OptiSQL Home">
            <span className="logo-badge" aria-hidden="true" />
            <span>OptiSQL</span>
          </Link>

          <nav className="nav-links" aria-label="Primary navigation">
            <a href="#home" data-scroll-target="home">
              Home
            </a>
            <a href="#about" data-scroll-target="about">
              About
            </a>
            <a href="#features" data-scroll-target="features">
              Features
            </a>
          </nav>

          <button className="nav-cta" type="button" onClick={() => navigate('/dashboard')}>
            Launch App
          </button>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="landing-shell hero-inner">
          <h1 className="hero-title">Write Smarter SQL. Run Faster Queries.</h1>
          <p className="hero-subtitle">
            OptiSQL analyzes your queries before execution, helping reduce execution time, system load, and
            infrastructure cost.
          </p>
          <div className="hero-cta-row">
            <button className="primary-cta" type="button" onClick={() => navigate('/dashboard')}>
              Launch Dashboard
            </button>
            <a className="secondary-cta" href="#features" data-scroll-target="features">
              See Features
            </a>
          </div>
        </div>
      </section>

      <section className="section" id="features">
        <div className="landing-shell">
          <div className="section-label">FEATURES</div>
          <h2 className="section-title">Built to help developers ship efficient SQL with confidence.</h2>

          <div className="features-grid">
            <article className="feature-card">
              <div className="feature-top">
                <span className="feature-icon" aria-hidden="true">
                  ⚡
                </span>
                <h3 className="feature-title">Query Optimization</h3>
              </div>
              <p className="feature-text">
                Detect inefficient SQL patterns before execution — SELECT *, missing indexes, unsafe updates, and
                more.
              </p>
            </article>

            <article className="feature-card">
              <div className="feature-top">
                <span className="feature-icon" aria-hidden="true">
                  📊
                </span>
                <h3 className="feature-title">Performance Insights</h3>
              </div>
              <p className="feature-text">
                Compare estimated execution time and resource usage between your original query and the optimized
                version.
              </p>
            </article>

            <article className="feature-card">
              <div className="feature-top">
                <span className="feature-icon" aria-hidden="true">
                  💰
                </span>
                <h3 className="feature-title">Cost Awareness</h3>
              </div>
              <p className="feature-text">
                Understand the potential infrastructure cost impact before your query hits production at scale.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section" aria-label="Query Optimizer demo">
        <div className="landing-shell">
          <QueryOptimizer />
        </div>
      </section>

      <section className="section" id="about">
        <div className="landing-shell">
          <div className="section-label">ABOUT</div>
          <h2 className="section-title">Why OptiSQL exists.</h2>
          <div className="about-card">
            OptiSQL is designed to help developers and learners write efficient SQL queries through real-time
            analysis and optimization suggestions. Whether you're a student learning SQL for the first time or a
            backend engineer optimizing production queries — OptiSQL gives you the feedback you need, right when
            you need it.
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="landing-shell">© 2026 OptiSQL — Built by Developers, for Developers</div>
      </footer>
    </div>
  )
}

export default Landing

