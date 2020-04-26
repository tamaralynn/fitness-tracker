const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const db = require("./models");
const path = require("path");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/populate", { useNewUrlParser: true });

app.get("/exercise", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

app.get("/stats", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/stats.html"));
});


app.get('/api/workouts', (req, res)=> {
  db.Workout.find({}).populate("exercises")
      .then(workouts => {
           res.send(workouts);
      }).catch(err=> res.send(err));

});

app.get('/api/workouts/range', (req, res)=> {
  db.Workout.find({}).populate("exercises")
      .then(workouts=> {
          res.send(workouts)
      }).catch(err=> res.send(err));
});

app.put('/api/workouts/:id', (req, res)=> {
  db.Workout.findByIdAndUpdate(req.params.id, {$push: {exercises: req.body}})
      .then(workout=> {
          res.send(workout)
      }).catch(err=> res.send(err));
}),

app.post('/api/workouts', (req, res)=> {
  db.Workout.create({date: req.body})
      .then(workout=> { 
          res.json(workout);
      }).catch(err=> res.send(err));
});

;


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});