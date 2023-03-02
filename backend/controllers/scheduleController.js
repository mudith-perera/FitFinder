///////////////////////////////// Created By Sachintha Imindhu //////////////////////////////

const User = require('../models/userModel');
const Schedule = require('../models/scheduleModel');

const getSchedule = async (req, res) => {
    const { userId } = req.params;

    try {
        // Try to find the schedule for the given user
        console.log(userId);
        const schedule = await Schedule.findOne({ user: userId });
        console.log(schedule);

        if (!schedule) {
            console.log("not found");
            // If the schedule does not exist, create a new schedule for the user
            const newSchedule = {
                user: userId,
                schedule: [
                    {
                        day: "Sunday",
                    },
                    {
                        day: "Monday",
                    },
                    {
                        day: "Tuesday",
                    },
                    {
                        day: "Wednesday",
                    },
                    {
                        day: "Thursday",
                    },
                    {
                        day: "Friday",
                    },
                    {
                        day: "Saturday",
                    },
                ],
            };

            console.log("created");
            // Save the new schedule to the database
            try {
                schedule = await Schedule.create(newSchedule);
            } catch (error) {
                console.log("not created");
            }

        }

        // Extract the `schedule` property from the `Schedule` document
        const formattedSchedule = schedule.schedule;

        // Return the formatted schedule in the response with a 200 status code
        res.status(200).json(formattedSchedule);
    } catch (error) {
        res.status(500).json({ message: "Error getting schedule for user" });
    }
};

const updateSchedule = async (req, res) => {

    try {
        const { day, oldExercise, newExercise, reps, time, instructions } = req.body;
        const { userId } = req.params;
        const userSchedule = await Schedule.findOne({ user: userId });
        if (!userSchedule) {
            return res.status(404).json({ message: 'User schedule not found' });
        }
        const dayIndex = userSchedule.schedule.findIndex(s => s.day === day);
        if (dayIndex === -1) {
            return res.status(404).json({ message: `User schedule does not contain ${day}` });
        }
        const exerciseIndex = userSchedule.schedule[dayIndex].exercises.findIndex(e => e === oldExercise);
        if (exerciseIndex === -1) {
            return res.status(404).json({ message: `User schedule does not contain ${oldExercise}` });
        }
        userSchedule.schedule[dayIndex].exercises[exerciseIndex] = newExercise;
        userSchedule.schedule[dayIndex].reps[exerciseIndex] = reps;
        userSchedule.schedule[dayIndex].time[exerciseIndex] = time;
        userSchedule.schedule[dayIndex].instructions[exerciseIndex] = instructions;
        await userSchedule.save();
        return res.status(200).json(userSchedule);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

const addExercise = async (req, res) => {
    console.log("add");
    try {
        const { day, exercise, reps, time, instructions } = req.body;
        const { userId } = req.params;
        const userSchedule = await Schedule.findOne({ user: userId });
        if (!userSchedule) {
            // If the user doesn't have a schedule yet, create a new one
            const newSchedule = new Schedule({
                user: userId,
                schedule: [{
                    day,
                    exercises: [exercise],
                    reps: [reps],
                    time: [time],
                    instructions: [instructions]
                }]
            });
            await newSchedule.save();
            return res.status(201).json(newSchedule);
        } else {
            // If the user already has a schedule, add the new exercise to the appropriate day
            const dayIndex = userSchedule.schedule.findIndex(s => s.day === day);
            if (dayIndex === -1) {
                // If the user doesn't have this day in their schedule yet, add it
                userSchedule.schedule.push({
                    day,
                    exercises: [exercise],
                    reps: [reps],
                    time: [time],
                    instructions: [instructions]
                });
            } else {
                // If the user already has this day in their schedule, add the exercise to the existing day
                userSchedule.schedule[dayIndex].exercises.push(exercise);
                userSchedule.schedule[dayIndex].reps.push(reps);
                userSchedule.schedule[dayIndex].time.push(time);
                userSchedule.schedule[dayIndex].instructions.push(instructions);
            }
            await userSchedule.save();
            return res.status(200).json(userSchedule);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

const deleteExercise = async (req, res) => {
    try {
        const { day, exerciseIndex } = req.body;
        const { userId } = req.params;
        const userSchedule = await Schedule.findOne({ user: userId });
        if (!userSchedule) {
            return res.status(404).json({ message: 'User schedule not found' });
        }
        const dayIndex = userSchedule.schedule.findIndex(s => s.day === day);
        if (dayIndex === -1) {
            return res.status(404).json({ message: `User schedule does not contain ${day}` });
        }
        if (exerciseIndex >= userSchedule.schedule[dayIndex].exercises.length) {
            return res.status(404).json({ message: `User schedule does not contain exercise at index ${exerciseIndex} on ${day}` });
        }
        userSchedule.schedule[dayIndex].exercises.splice(exerciseIndex, 1);
        userSchedule.schedule[dayIndex].reps.splice(exerciseIndex, 1);
        userSchedule.schedule[dayIndex].time.splice(exerciseIndex, 1);
        userSchedule.schedule[dayIndex].instructions.splice(exerciseIndex, 1);
        await userSchedule.save();
        return res.status(200).json(userSchedule);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};



module.exports = {
    getSchedule,
    updateSchedule,
    addExercise,
    deleteExercise,
};