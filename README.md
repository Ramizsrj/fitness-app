# Fitness Workout Log

A single-page React application for logging and tracking workouts, built as a university assignment.

## Features

- **Log workouts** — exercise name, category, sets, reps, weight, date, and optional notes
- **Workout history** — view all logged workouts sorted by date, with search-by-exercise and delete
- **Dashboard** — total workouts, total volume, this week's volume, current daily streak, and most frequent exercise
- **Persistent storage** — data is saved to the browser's `localStorage`, so it survives page reloads (no backend required)

## Tech Stack

- [React 19](https://react.dev/)
- [Vite](https://vite.dev/) (build tool and dev server)
- Plain CSS (no UI framework)

## Getting Started

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal (default: http://localhost:5173).

### Build for production

```bash
npm run build
```

## Project Structure

```
src/
  components/
    Navbar.jsx        Tab navigation
    WorkoutForm.jsx    Form for logging a new workout
    WorkoutList.jsx    Search + list of past workouts
    Dashboard.jsx      Summary statistics
  hooks/
    useLocalStorage.js Persists state to localStorage
  utils/
    date.js            Local-timezone-safe date helpers
    stats.js           Dashboard calculations
  App.jsx              Top-level layout and state
```
