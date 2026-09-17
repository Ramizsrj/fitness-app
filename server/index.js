const express = require('express')
const cors = require('cors')
const crypto = require('crypto')
const { readWorkouts, writeWorkouts } = require('./store')

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.get('/api/workouts', (req, res) => {
  res.json(readWorkouts())
})

app.post('/api/workouts', (req, res) => {
  const { exercise, category, sets, reps, weight, date, notes } = req.body

  if (!exercise || !sets || !reps || weight === undefined || !date) {
    return res.status(400).json({ error: 'exercise, sets, reps, weight and date are required' })
  }

  const workout = {
    id: crypto.randomUUID(),
    exercise: String(exercise).trim(),
    category: category || 'Strength',
    sets: Number(sets),
    reps: Number(reps),
    weight: Number(weight),
    date,
    notes: notes ? String(notes).trim() : '',
  }

  const workouts = readWorkouts()
  workouts.push(workout)
  writeWorkouts(workouts)

  res.status(201).json(workout)
})

app.delete('/api/workouts/:id', (req, res) => {
  const workouts = readWorkouts()
  const next = workouts.filter((w) => w.id !== req.params.id)

  if (next.length === workouts.length) {
    return res.status(404).json({ error: 'Workout not found' })
  }

  writeWorkouts(next)
  res.status(204).end()
})

app.listen(PORT, () => {
  console.log(`Fitness Workout Log API running on http://localhost:${PORT}`)
})
