import { toDateKey } from './date'

function startOfWeek(date) {
  const d = new Date(date)
  const day = d.getDay()
  const diff = (day === 0 ? -6 : 1) - day
  d.setDate(d.getDate() + diff)
  d.setHours(0, 0, 0, 0)
  return d
}

export function totalWorkouts(workouts) {
  return workouts.length
}

export function totalVolume(workouts) {
  return workouts.reduce((sum, w) => sum + w.sets * w.reps * w.weight, 0)
}

export function weeklyVolume(workouts) {
  const weekStart = startOfWeek(new Date())
  return workouts
    .filter((w) => new Date(w.date) >= weekStart)
    .reduce((sum, w) => sum + w.sets * w.reps * w.weight, 0)
}

export function mostFrequentExercise(workouts) {
  if (workouts.length === 0) return null
  const counts = {}
  for (const w of workouts) {
    counts[w.exercise] = (counts[w.exercise] || 0) + 1
  }
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0]
}

export function currentStreak(workouts) {
  if (workouts.length === 0) return 0
  const days = new Set(workouts.map((w) => w.date))
  let streak = 0
  const cursor = new Date()
  cursor.setHours(0, 0, 0, 0)
  while (true) {
    const key = toDateKey(cursor)
    if (days.has(key)) {
      streak += 1
      cursor.setDate(cursor.getDate() - 1)
    } else {
      break
    }
  }
  return streak
}
