import { useState } from 'react'
import { Navbar } from './components/Navbar'
import { WorkoutForm } from './components/WorkoutForm'
import { WorkoutList } from './components/WorkoutList'
import { Dashboard } from './components/Dashboard'
import { useLocalStorage } from './hooks/useLocalStorage'
import './App.css'

function App() {
  const [workouts, setWorkouts] = useLocalStorage('workouts', [])
  const [activeTab, setActiveTab] = useState('Log')

  function addWorkout(workout) {
    setWorkouts((prev) => [...prev, workout])
  }

  function deleteWorkout(id) {
    setWorkouts((prev) => prev.filter((w) => w.id !== id))
  }

  return (
    <div className="app">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="app-content">
        {activeTab === 'Log' && <WorkoutForm onAdd={addWorkout} />}
        {activeTab === 'History' && (
          <WorkoutList workouts={workouts} onDelete={deleteWorkout} />
        )}
        {activeTab === 'Dashboard' && <Dashboard workouts={workouts} />}
      </main>
    </div>
  )
}

export default App
