const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
     type: Date,
      default: Date.now}, /*new Date().setDate(new Date().getDate()-10), /***Change to date.now*/
  exercises: [
    {
      type: {
        type: String, required: true
      },
      name: {
        type: String, required: true
      },
      duration: {
        type: Number, required: true
      },
      weight: Number,
      reps: Number,
      sets: Number,
      distance: Number
    }
  ]
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
