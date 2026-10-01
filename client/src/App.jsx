import { useEffect, useState } from 'react'
import { Navbar } from './components/Navbar'
import { WorkoutForm } from './components/WorkoutForm'
import { WorkoutList } from './components/WorkoutList'
import { Dashboard } from './components/Dashboard'
import { fetchWorkouts, createWorkout, deleteWorkout } from './api'
import './App.css'

// this is the main component. it keeps the list of workouts in state,
// and passes it down to whichever page (tab) is currently showing
function App() {
  const [workouts, setWorkouts] = useState([])
  const [activeTab, setActiveTab] = useState('Workouts')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // useEffect with an empty array [] means "only run this once, when the page first loads"
  useEffect(() => {
    fetchWorkouts()
      .then(function (data) {
        setWorkouts(data)
      })
      .catch(function () {
        setError('Could not reach the server. Is the API running on port 3001?')
      })
      .finally(function () {
        setLoading(false)
      })
  }, [])

  // called from the form when the user clicks "Add Workout"
  async function addWorkout(workout) {
    const savedWorkout = await createWorkout(workout)
    const updatedWorkouts = workouts.concat(savedWorkout)
    setWorkouts(updatedWorkouts)
  }

  // called from the history list when the user clicks "Delete"
  async function removeWorkout(id) {
    await deleteWorkout(id)
    const updatedWorkouts = workouts.filter(function (workout) {
      return workout.id !== id
    })
    setWorkouts(updatedWorkouts)
  }

  return (
    <div className="app">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="app-content">
        {error && <p className="form-error">{error}</p>}

        {loading && <p className="empty-state">Loading workouts...</p>}

        {!loading && activeTab === 'Workouts' && (
          <div className="workout-page">
            <WorkoutForm onAdd={addWorkout} />
            <WorkoutList workouts={workouts} onDelete={removeWorkout} />
          </div>
        )}

        {!loading && activeTab === 'Dashboard' && <Dashboard workouts={workouts} />}
      </main>
    </div>
  )
}

export default App
