# Fitness Workout Log

A full-stack workout tracking application built as a university assignment. A React (Vite) frontend talks to a small Express.js REST API, which persists workout entries to a JSON file on the server.

## Features

- **Log workouts** — exercise name, category, sets, reps, weight, date, and optional notes
- **Workout history** — view all logged workouts sorted by date, with search-by-exercise and delete
- **Dashboard** — total workouts, total volume, this week's volume, current daily streak, and most frequent exercise
- **Responsive layout** — adapts across mobile, tablet, and desktop screen widths
- **Persistent storage** — workouts are stored server-side and survive both page reloads and server restarts

## Tech Stack

| Layer    | Technology                  |
| -------- | ---------------------------- |
| Frontend | React 19, Vite               |
| Backend  | Node.js, Express 5           |
| Data     | JSON file on the server (`server/data/workouts.json`) |
| Styling  | Plain CSS (no UI framework)  |

## Project Structure

```
fitness-workout-log/
  client/                 React frontend (Vite)
    src/
      components/         Navbar, WorkoutForm, WorkoutList, Dashboard
      utils/               date.js (local-date helpers), stats.js (dashboard calculations)
      api.js               fetch wrappers for the backend API
      App.jsx              Top-level layout and state
  server/                 Express backend
    index.js              API routes (GET/POST/DELETE /api/workouts)
    store.js              Reads/writes data/workouts.json
    data/workouts.json    Persisted workout data (created automatically)
```

## Getting Started

Requires Node.js 18+ (developed against Node 24).

### Install dependencies

```bash
npm run install:all
```

This installs dependencies for the root, `client/`, and `server/` folders.

### Run both client and server together

```bash
npm run dev
```

This starts the Express API on `http://localhost:3001` and the Vite dev server on `http://localhost:5173`. The client proxies `/api` requests to the server (see `client/vite.config.js`), so open **http://localhost:5173** in your browser.

### Run them separately (two terminals)

```bash
# Terminal 1
cd server
npm run dev

# Terminal 2
cd client
npm run dev
```

## API Endpoints

| Method | Endpoint            | Description              |
| ------ | -------------------- | ------------------------- |
| GET    | `/api/workouts`      | Returns all workouts      |
| POST   | `/api/workouts`      | Creates a new workout      |
| DELETE | `/api/workouts/:id`  | Deletes a workout by id   |

## Development Notes

- The React app holds no client-side persistence of its own — all workout data flows through the Express API, demonstrating dynamic client/server data transfer.
- CSS uses flexbox/grid with wrapping and `auto-fit` columns so the layout reflows naturally from small phone widths up to desktop, rather than relying on fixed breakpoints alone.
- `client/src/utils/date.js` formats dates using local time components instead of `Date.toISOString()`, avoiding an off-by-one-day bug that timezone conversion would otherwise cause in the dashboard's streak calculation.
