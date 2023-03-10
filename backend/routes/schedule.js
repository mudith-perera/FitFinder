///////////////////////////////// Created By Sachintha Imindhu //////////////////////////////

const express = require('express');
const router = express.Router();
const {getSchedule, updateSchedule, addExercise, deleteExercise} = require("../controllers/scheduleController");

// Route to get a user's schedule
router.get("/:userId", getSchedule);
// Route to update a user's schedule
router.post("/update/:userId", updateSchedule);
// Route to add exercise to a user's schedule
router.post("/add/:userId", addExercise);
// Route to delete an exercise from a user's schedule
router.post("/delete/:userId", deleteExercise);

module.exports = router;