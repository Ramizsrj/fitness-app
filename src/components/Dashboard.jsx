import {
  currentStreak,
  mostFrequentExercise,
  totalVolume,
  totalWorkouts,
  weeklyVolume,
} from '../utils/stats'

export function Dashboard({ workouts }) {
  const stats = [
    { label: 'Total Workouts', value: totalWorkouts(workouts) },
    { label: 'Total Volume', value: `${totalVolume(workouts).toLocaleString()} kg` },
    { label: 'This Week', value: `${weeklyVolume(workouts).toLocaleString()} kg` },
    { label: 'Current Streak', value: `${currentStreak(workouts)} day(s)` },
    { label: 'Top Exercise', value: mostFrequentExercise(workouts) || 'N/A' },
  ]

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="stat-grid">
        {stats.map((s) => (
          <div className="stat-card" key={s.label}>
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
