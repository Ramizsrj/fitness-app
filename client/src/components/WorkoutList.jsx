import { useState } from 'react'

export function WorkoutList({ workouts, onDelete }) {
  const [query, setQuery] = useState('')

  // newest workout first
  const sortedWorkouts = [...workouts].sort(function (a, b) {
    return new Date(b.date) - new Date(a.date)
  })

  // if there's something typed in the search box, only keep matching exercises
  let visibleWorkouts = sortedWorkouts
  if (query.trim() !== '') {
    visibleWorkouts = sortedWorkouts.filter(function (workout) {
      return workout.exercise.toLowerCase().includes(query.trim().toLowerCase())
    })
  }

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

      {visibleWorkouts.length === 0 ? (
        <p className="empty-state">No workouts logged yet. Add one above to get started.</p>
      ) : (
        <ul>
          {visibleWorkouts.map((workout) => (
            <li key={workout.id} className="workout-item">
              <div className="workout-item-main">
                <span className="workout-exercise">{workout.exercise}</span>
                <span className="workout-category">{workout.category}</span>
              </div>
              <div className="workout-item-details">
                <span>
                  {workout.sets} sets × {workout.reps} reps @ {workout.weight} kg
                </span>
                <span>{workout.date}</span>
              </div>
              {workout.notes && <p className="workout-notes">{workout.notes}</p>}
              <button className="delete-btn" onClick={() => onDelete(workout.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
