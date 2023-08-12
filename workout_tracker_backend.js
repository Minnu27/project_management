const express = require("express");
const mongodb = require("mongodb");

const app = express();
const db = mongodb.connect("mongodb://localhost:27017/workouts");

app.use(express.json());

app.get("/workouts", (req, res) => {
  const workouts = db.collection("workouts").find();

  res.json(workouts);
});

app.post("/add-workout", (req, res) => {
  const workout = {
    name: req.body.name,
    date: req.body.date,
    exercises: req.body.exercises,
  };

  db.collection("workouts").insertOne(workout);

  res.json({ message: "Workout added successfully!" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
