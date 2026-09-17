import { useEffect, useState } from 'react'
import { Navbar } from './components/Navbar'
import { WorkoutForm } from './components/WorkoutForm'
import { WorkoutList } from './components/WorkoutList'
import { Dashboard } from './components/Dashboard'
import { fetchWorkouts, createWorkout, deleteWorkout as deleteWorkoutRequest } from './api'
import './App.css'

function App() {
  const [workouts, setWorkouts] = useState([])
  const [activeTab, setActiveTab] = useState('Workouts')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchWorkouts()
      .then(setWorkouts)
      .catch(() => setError('Could not reach the server. Is the API running on port 3001?'))
      .finally(() => setLoading(false))
  }, [])

  async function addWorkout(workout) {
    const created = await createWorkout(workout)
    setWorkouts((prev) => [...prev, created])
  }

  async function deleteWorkout(id) {
    await deleteWorkoutRequest(id)
    setWorkouts((prev) => prev.filter((w) => w.id !== id))
  }

  return (
    <div className="app">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="app-content">
        {error && <p className="form-error">{error}</p>}
        {loading ? (
          <p className="empty-state">Loading workouts...</p>
        ) : (
          <>
            {activeTab === 'Workouts' && (
              <div className="workout-page">
                <WorkoutForm onAdd={addWorkout} />
                <WorkoutList workouts={workouts} onDelete={deleteWorkout} />
              </div>
            )}
            {activeTab === 'Dashboard' && <Dashboard workouts={workouts} />}
          </>
        )}
      </main>
    </div>
  )
}

export default App
