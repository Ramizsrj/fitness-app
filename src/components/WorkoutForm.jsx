import { useState } from 'react'
import { today } from '../utils/date'

const emptyForm = {
  exercise: '',
  category: 'Strength',
  sets: '',
  reps: '',
  weight: '',
  date: today(),
  notes: '',
}

export function WorkoutForm({ onAdd }) {
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (!form.exercise.trim()) {
      setError('Exercise name is required.')
      return
    }
    if (!form.sets || !form.reps || form.weight === '') {
      setError('Sets, reps, and weight are required.')
      return
    }

    onAdd({
      id: crypto.randomUUID(),
      exercise: form.exercise.trim(),
      category: form.category,
      sets: Number(form.sets),
      reps: Number(form.reps),
      weight: Number(form.weight),
      date: form.date,
      notes: form.notes.trim(),
    })

    setForm({ ...emptyForm, date: form.date })
    setError('')
  }

  return (
    <form className="workout-form" onSubmit={handleSubmit}>
      <h2>Log a Workout</h2>

      {error && <p className="form-error">{error}</p>}

      <div className="form-row">
        <label>
          Exercise
          <input
            type="text"
            name="exercise"
            placeholder="e.g. Bench Press"
            value={form.exercise}
            onChange={handleChange}
          />
        </label>

        <label>
          Category
          <select name="category" value={form.category} onChange={handleChange}>
            <option>Strength</option>
            <option>Cardio</option>
            <option>Flexibility</option>
            <option>Other</option>
          </select>
        </label>
      </div>

      <div className="form-row">
        <label>
          Sets
          <input type="number" min="0" name="sets" value={form.sets} onChange={handleChange} />
        </label>

        <label>
          Reps
          <input type="number" min="0" name="reps" value={form.reps} onChange={handleChange} />
        </label>

        <label>
          Weight (kg)
          <input
            type="number"
            min="0"
            step="0.5"
            name="weight"
            value={form.weight}
            onChange={handleChange}
          />
        </label>
      </div>

      <div className="form-row">
        <label>
          Date
          <input type="date" name="date" value={form.date} onChange={handleChange} />
        </label>

        <label>
          Notes
          <input
            type="text"
            name="notes"
            placeholder="Optional"
            value={form.notes}
            onChange={handleChange}
          />
        </label>
      </div>

      <button type="submit">Add Workout</button>
    </form>
  )
}
