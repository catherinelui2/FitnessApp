const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const db = require("./models");
const path = require("path");
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", 
{ 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});


//routes
app.get("/", (req, res)=> {
    res.send(index.html)
});

app.get("/exercise", (req, res)=> {
    res.sendFile(path.join( __dirname, "./public/exercise.html"))
});

app.get("/stats", (req, res)=> {
    res.sendFile(path.join( __dirname, "./public/stats.html"))
});


app.post("/api/workouts", (req, res) => {
    db.Workout.create({day: new Date(new Date().setDate(new Date().getDate())), exercises:[]}).then(dbWorkout=>{
        res.json(dbWorkout)
})
    .catch((err) => {
        res.json(err);
    });
});

app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
        .then((dbWorkout) => {
            res.json(dbWorkout);
        })
        .catch((err) => {
            res.json(err);
        });
});

app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
        .then((dbWorkout) => {
            res.json(dbWorkout);
        })
        .catch((err) => {
            res.json(err);
        });
});

app.put("/api/workouts/:params", (req, res) => {
    let param = req.params.param
    db.Workout.findByIdAndUpdate({_id:param}, {$push: {exercises:req.body}})
        .then((dbWorkout) => {
            res.json(dbWorkout);
        })
        .catch((err) => {
            res.json(err);
        });
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});
