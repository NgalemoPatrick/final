const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body

  try {
    const workout = await Workout.create({ title, load, reps })
    res.status(200).json(workout)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
  res.json({ message: "POST a document" })
}


// get all workout

const getAllWorkout = async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 })

  res.status(200).json(workouts)
}


// get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout' })
  }

  const workout = await Workout.findById(id)

  if (!workout) {
    res.status(404).json({ error: 'No such workout' })
  }
  res.status(200).json(workout)
}

// Delete
const deleWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout' })
  }
  const workout = await Workout.findByIdAndDelete({ _id: id })

  if (!workout) {
    res.status(404).json({ error: 'No such workout' })
  }
  res.status(200).json(workout)
}

//update 
const updateWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout' })
  }

  const workout = await Workout.findByIdAndUpdate({ _id: id }, {
    ...req.body
  })

  if (!workout) {
    res.status(404).json({ error: 'No such workout' })
  }
  res.status(200).json(workout)
}

module.exports = {
  createWorkout,
  getAllWorkout,
  getWorkout,
  updateWorkout,
  deleWorkout
}
