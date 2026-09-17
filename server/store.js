const fs = require('fs')
const path = require('path')

const DATA_FILE = path.join(__dirname, 'data', 'workouts.json')

function readWorkouts() {
  if (!fs.existsSync(DATA_FILE)) {
    return []
  }
  const raw = fs.readFileSync(DATA_FILE, 'utf-8')
  return raw.trim() ? JSON.parse(raw) : []
}

function writeWorkouts(workouts) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true })
  fs.writeFileSync(DATA_FILE, JSON.stringify(workouts, null, 2))
}

module.exports = { readWorkouts, writeWorkouts }
