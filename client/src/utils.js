// Some small helper functions I use in a few different places.
// I put them here instead of copy-pasting the same code everywhere.

// turns a date into text like "2026-10-01", using MY computer's own time
// (not Date.toISOString(), because that changes the date to a different time zone
// and can accidentally show the wrong day depending on where you live)
export function toDateKey(date) {
  const d = new Date(date)
  const year = d.getFullYear()
  let month = d.getMonth() + 1 // getMonth() starts at 0, so January is 0
  let day = d.getDate()

  // add a leading zero if the month or day is a single digit (e.g. "6" -> "06")
  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }

  return year + '-' + month + '-' + day
}

// today's date as text, used as the default value in the form
export function today() {
  return toDateKey(new Date())
}

// --- the functions below are for the Dashboard page ---

export function totalWorkouts(workouts) {
  return workouts.length
}

// adds up sets * reps * weight for every workout
export function totalVolume(workouts) {
  let total = 0
  for (const workout of workouts) {
    total = total + workout.sets * workout.reps * workout.weight
  }
  return total
}

// finds the Monday of this week, then adds up the volume for anything after that
export function weeklyVolume(workouts) {
  const now = new Date()
  const dayOfWeek = now.getDay() // 0 = Sunday, 1 = Monday, ... 6 = Saturday

  // work out how many days to go back to reach Monday
  let daysSinceMonday = dayOfWeek - 1
  if (dayOfWeek === 0) {
    daysSinceMonday = 6 // if today is Sunday, Monday was 6 days ago
  }

  const monday = new Date(now)
  monday.setDate(now.getDate() - daysSinceMonday)
  monday.setHours(0, 0, 0, 0)

  let total = 0
  for (const workout of workouts) {
    if (new Date(workout.date) >= monday) {
      total = total + workout.sets * workout.reps * workout.weight
    }
  }
  return total
}

// looks through all the workouts and finds which exercise name shows up the most
export function mostFrequentExercise(workouts) {
  if (workouts.length === 0) {
    return null
  }

  const countPerExercise = {}
  for (const workout of workouts) {
    if (countPerExercise[workout.exercise]) {
      countPerExercise[workout.exercise] = countPerExercise[workout.exercise] + 1
    } else {
      countPerExercise[workout.exercise] = 1
    }
  }

  let bestExercise = null
  let bestCount = 0
  for (const exercise in countPerExercise) {
    if (countPerExercise[exercise] > bestCount) {
      bestExercise = exercise
      bestCount = countPerExercise[exercise]
    }
  }
  return bestExercise
}

// counts how many days in a row (including today) have at least one workout logged
export function currentStreak(workouts) {
  if (workouts.length === 0) {
    return 0
  }

  // put every date that has a workout into a Set, so it's quick to check
  const datesWithWorkouts = new Set()
  for (const workout of workouts) {
    datesWithWorkouts.add(workout.date)
  }

  let streak = 0
  const dayBeingChecked = new Date()

  // keep going backwards one day at a time until we find a day with no workout
  while (true) {
    const dateText = toDateKey(dayBeingChecked)
    if (datesWithWorkouts.has(dateText)) {
      streak = streak + 1
      dayBeingChecked.setDate(dayBeingChecked.getDate() - 1)
    } else {
      break
    }
  }

  return streak
}
