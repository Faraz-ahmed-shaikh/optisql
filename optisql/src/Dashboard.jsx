import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import SqlEditor from './components/SqlEditor'
import ResultsTable from './components/ResultsTable'
import ThemeToggle from './components/ThemeToggle'

function Dashboard() {
  const navigate = useNavigate()
  const [theme, setTheme] = useState(() => localStorage.getItem('optisql-theme') || 'dark')
  const [results, setResults] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className={`dashboard dashboard--${theme}`}>
      <Sidebar sidebarOpen={sidebarOpen} />
      {sidebarOpen && (
        <button
          type="button"
          className="sidebar-backdrop"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <main className="dashboard-main">
        <header className="app-topbar">
          <div className="dashboard-header-left">
            <button type="button" className="home-button" onClick={() => navigate('/')}>
              Home
            </button>
            <button
              type="button"
              className="sidebar-toggle"
              aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
              aria-expanded={sidebarOpen}
              onClick={() => setSidebarOpen((prev) => !prev)}
            >
              <span aria-hidden="true">☰</span>
            </button>
            <button type="button" className="app-title-link" onClick={() => navigate('/')}>
              <span className="app-title">OptiSQL</span>
            </button>
          </div>
          <div className="topbar-actions">
            <label className="db-select-wrapper">
              <span className="db-select-label">Database</span>
              <select className="db-select" defaultValue="primary" aria-label="Select database">
                <option value="primary">Primary</option>
                <option value="analytics">Analytics</option>
                <option value="staging">Staging</option>
              </select>
            </label>
            <ThemeToggle theme={theme} onThemeChange={setTheme} />
            <div className="user-avatar" aria-label="User">
              U
            </div>
          </div>
        </header>
        <section className="dashboard-editor">
          <SqlEditor theme={theme} onResults={setResults} />
        </section>
        <section className="dashboard-results">
          <h2>Results</h2>
          <ResultsTable results={results} />
        </section>
      </main>
    </div>
  )
}

export default Dashboard
