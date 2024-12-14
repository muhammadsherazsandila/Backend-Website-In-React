    const express = require('express');
    const { getAllWorkouts, getSingleWorkout, createWorkout, deleteWorkout, updateWorkout } = require('../controllers/workoutController');
    const {upload} = require('../utils/uploadImage')
    const router = express.Router();

    // To Get All Workouts
    router.get("/", getAllWorkouts)

    // To Get Single Workouts
    router.get("/:id", getSingleWorkout)

    // To make a new workout
    router.post("/createWorkout", upload.single("productPic") ,  createWorkout)

    // To Delete Workout
    router.get("/delete/:id",deleteWorkout)


    // To update a workout
    router.get("/update/:id" , getSingleWorkout)
    router.put("/update/:id" , upload.single("productPic"), updateWorkout)


module.exports = router