const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const workoutSchema = new Schema(
    {
        day: {
            type: Date,
            default: Date.now
        },
        exercises: [
            {
                type: {
                    type: String,
                    trim: true,
                    required: "Enter an exercise type"
                },
                name: {
                    type: String,
                    trim: true,
                    required: "Enter an exercise name"
                },
                weight: {
                    type: Number
                },
                reps: {
                    type: Number
                },
                sets: {
                    type: Number
                },
                duration: {
                    type: Number,
                    required: "Enter an exercise duration in minutes"
                },
                distance: {
                    type: Number
                }
            }
        ]
    },
    {
        toJSON: {
            // include virtual properties
            virtuals: true
        }
    }
);
// adds dynamically-created property to schema
workoutSchema.virtual("totalDuration").get(function () {
    // reduces arr of exercises down to the sum of each durations
    return this.exercises.reduce((total, exercise) => {
        return total + exercise.duration;
    }, 0);
});
const Workout = mongoose.model("Workout", workoutSchema);
module.exports = Workout;