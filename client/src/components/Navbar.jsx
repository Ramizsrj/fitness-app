const TABS = ['Workouts', 'Dashboard']

export function Navbar({ activeTab, onTabChange }) {
  return (
    <nav className="navbar">
      <span className="navbar-brand">🏋️ Fitness Workout Log</span>
      <div className="navbar-tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={tab === activeTab ? 'active' : ''}
            onClick={() => onTabChange(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </nav>
  )
}
