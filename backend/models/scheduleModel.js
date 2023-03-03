///////////////////////////////// Created By Sachintha Imindhu //////////////////////////////

const mongoose = require('mongoose');

const userScheduleSchema = new mongoose.Schema({
  user: { type: String, required: true, index: { unique: true } },
  schedule: [{
    day: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      required: true
    },
    exercises: [{ type: String }],
    reps: [{ type: String }],
    time: [{ type: String }],
    instructions: [{ type: String }]
  }]
});

const UserSchedule = mongoose.model('UserSchedule', userScheduleSchema);

module.exports = UserSchedule;
