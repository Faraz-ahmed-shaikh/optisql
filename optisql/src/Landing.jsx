import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

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
          <h2 className="section-title">Features</h2>
          <p className="section-subtitle">Built to help developers ship efficient SQL with confidence.</p>

          <div className="features-grid">
            <article className="feature-card">
              <div className="feature-top">
                <span className="feature-icon" aria-hidden="true">
                  ⚡
                </span>
                <h3 className="feature-title">Query Optimization</h3>
              </div>
              <p className="feature-text">Detect inefficient SQL before execution.</p>
            </article>

            <article className="feature-card">
              <div className="feature-top">
                <span className="feature-icon" aria-hidden="true">
                  📊
                </span>
                <h3 className="feature-title">Performance Insights</h3>
              </div>
              <p className="feature-text">Compare execution time and resource usage.</p>
            </article>

            <article className="feature-card">
              <div className="feature-top">
                <span className="feature-icon" aria-hidden="true">
                  💰
                </span>
                <h3 className="feature-title">Cost Awareness</h3>
              </div>
              <p className="feature-text">Understand potential infrastructure cost impact.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section" id="about">
        <div className="landing-shell">
          <h2 className="section-title">About</h2>
          <p className="section-subtitle">Why OptiSQL exists.</p>
          <div className="about-card">
            OptiSQL is designed to help developers and learners write efficient SQL queries through real-time
            analysis and optimization suggestions.
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="landing-shell">© 2026 OptiSQL — Built for Developers</div>
      </footer>
    </div>
  )
}

export default Landing

