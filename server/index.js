// This is my Express server. It is the "back end" of my app.
// It saves all the workouts in a file called data/workouts.json
// and lets the React app (the "front end") read, add, and delete workouts.

const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const app = express()
const PORT = 3001

// where I keep the workout data (just a simple JSON file, not a real database)
const dataFile = path.join(__dirname, 'data', 'workouts.json')

// cors lets my React app (on a different port) talk to this server
app.use(cors())
// this lets me read JSON that the front end sends in a request
app.use(express.json())

// reads the workouts from the file and turns them back into a JS array
function getWorkoutsFromFile() {
  if (!fs.existsSync(dataFile)) {
    return []
  }
  const fileText = fs.readFileSync(dataFile, 'utf-8')
  if (fileText.trim() === '') {
    return []
  }
  return JSON.parse(fileText)
}

// turns the array of workouts back into text and saves it to the file
function saveWorkoutsToFile(workouts) {
  const folder = path.dirname(dataFile)
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true })
  }
  const text = JSON.stringify(workouts, null, 2)
  fs.writeFileSync(dataFile, text)
}

// GET request: send back every workout we have saved
app.get('/api/workouts', (req, res) => {
  const workouts = getWorkoutsFromFile()
  res.json(workouts)
})

// POST request: add a brand new workout
app.post('/api/workouts', (req, res) => {
  const exercise = req.body.exercise
  const category = req.body.category
  const sets = req.body.sets
  const reps = req.body.reps
  const weight = req.body.weight
  const date = req.body.date
  const notes = req.body.notes

  // simple check - make sure the important fields were actually sent
  if (!exercise || !sets || !reps || weight === undefined || !date) {
    res.status(400).json({ error: 'exercise, sets, reps, weight and date are required' })
    return
  }

  const newWorkout = {
    // Date.now() + Math.random() is just a quick and simple way to make a unique id
    id: Date.now().toString() + Math.random().toString(16).slice(2),
    exercise: exercise.trim(),
    category: category || 'Strength',
    sets: Number(sets),
    reps: Number(reps),
    weight: Number(weight),
    date: date,
    notes: notes ? notes.trim() : '',
  }

  const workouts = getWorkoutsFromFile()
  workouts.push(newWorkout)
  saveWorkoutsToFile(workouts)

  res.status(201).json(newWorkout)
})

// DELETE request: remove one workout by its id
app.delete('/api/workouts/:id', (req, res) => {
  const idToDelete = req.params.id
  const workouts = getWorkoutsFromFile()

  const remainingWorkouts = workouts.filter(function (workout) {
    return workout.id !== idToDelete
  })

  if (remainingWorkouts.length === workouts.length) {
    // nothing was removed, so that id did not exist
    res.status(404).json({ error: 'Workout not found' })
    return
  }

  saveWorkoutsToFile(remainingWorkouts)
  res.status(204).end()
})

app.listen(PORT, () => {
  console.log('Fitness Workout Log API running on http://localhost:' + PORT)
})
