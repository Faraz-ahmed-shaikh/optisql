function ThemeToggle({ theme, onThemeChange }) {
  const handleToggle = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    localStorage.setItem('optisql-theme', nextTheme)
    onThemeChange(nextTheme)
  }

  return (
    <button className="theme-toggle" type="button" onClick={handleToggle}>
      {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
    </button>
  )
}

export default ThemeToggle
