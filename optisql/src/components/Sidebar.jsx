const menuItems = [
  { label: 'Query Editor', icon: '⌘' },
  { label: 'Upload Dataset', icon: '⬆' },
  { label: 'Query History', icon: '🕒' },
]

function Sidebar({ sidebarOpen }) {
  return (
    <aside className={`sidebar${sidebarOpen ? ' sidebar--open' : ''}`}>
      <div className="sidebar-logo">
        <span className="sidebar-logo-dot" />
        <span>OptiSQL</span>
      </div>
      <nav>
        <ul className="sidebar-menu">
          {menuItems.map((item) => (
            <li key={item.label} className={item.label === 'Query Editor' ? 'active' : ''}>
              <span className="sidebar-menu-icon" aria-hidden="true">
                {item.icon}
              </span>
              <span className="sidebar-menu-label">{item.label}</span>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
