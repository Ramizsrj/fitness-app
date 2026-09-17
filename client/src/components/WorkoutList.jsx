import { useMemo, useState } from 'react'

export function WorkoutList({ workouts, onDelete }) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const sorted = [...workouts].sort((a, b) => new Date(b.date) - new Date(a.date))
    if (!query.trim()) return sorted
    return sorted.filter((w) => w.exercise.toLowerCase().includes(query.trim().toLowerCase()))
  }, [workouts, query])

  return (
    <div className="workout-list">
      <div className="list-header">
        <h2>Workout History</h2>
        <input
          type="text"
          placeholder="Search exercise..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <p className="empty-state">No workouts logged yet. Add one above to get started.</p>
      ) : (
        <ul>
          {filtered.map((w) => (
            <li key={w.id} className="workout-item">
              <div className="workout-item-main">
                <span className="workout-exercise">{w.exercise}</span>
                <span className="workout-category">{w.category}</span>
              </div>
              <div className="workout-item-details">
                <span>{w.sets} sets × {w.reps} reps @ {w.weight} kg</span>
                <span>{w.date}</span>
              </div>
              {w.notes && <p className="workout-notes">{w.notes}</p>}
              <button className="delete-btn" onClick={() => onDelete(w.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
