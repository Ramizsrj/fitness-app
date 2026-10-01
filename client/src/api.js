// This file has all my functions for talking to the server.
// I kept them here so the components don't need to know about fetch() themselves.

// gets every workout from the server
export async function fetchWorkouts() {
  const response = await fetch('/api/workouts')
  const data = await response.json()
  return data
}

// sends a new workout to the server to be saved
export async function createWorkout(workout) {
  const response = await fetch('/api/workouts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(workout),
  })

  if (!response.ok) {
    // something went wrong (e.g. a required field was missing)
    throw new Error('Could not save the workout')
  }

  const data = await response.json()
  return data
}

// tells the server to delete one workout, using its id
export async function deleteWorkout(id) {
  await fetch('/api/workouts/' + id, {
    method: 'DELETE',
  })
}
