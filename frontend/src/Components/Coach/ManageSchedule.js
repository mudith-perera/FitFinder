///////////////////////////////// Created By Sachintha Imindhu //////////////////////////////

import React, { useState } from "react";
import "./ManageSchedule.css";
import {
  MDBInput,
  MDBTextArea,
  MDBBtn,
  MDBCard,
  MDBCardHeader,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const schedule = [
  {
    day: "Sunday",
    exercise: ["Squats", "Deadlifts", "Lunges", "Bench Press"],
    reps: [8, 6, 12, 10],
    time: [3, 3, 3, 3],
    instructions: [
      "Warm up with 5 min of cardio",
      "Start with 8 reps, increase if necessary",
      "Alternate legs each set",
      "Keep core tight",
    ],
  },
  {
    day: "Monday",
    exercise: ["Bicep Curls", "Tricep Dips", "Shoulder Press", "Pull Ups"],
    reps: [12, 10, 8, 8],
    time: [3, 3, 3, 3],
    instructions: [
      "Use lighter weights for higher reps",
      "Keep elbow close to body",
      "Breathe out while pressing up",
      "Focus on form, not weight",
    ],
  },
  {
    day: "Tuesday",
    exercise: ["Crunches", "Leg Raises", "Plank", "Bicycle Crunches"],
    reps: [20, 15, 30, 20],
    time: [3, 3, 3, 3],
    instructions: [
      "Tighten abs throughout",
      "Slow and controlled movements",
      "Hold for full 30 secs",
      "Keep neck relaxed",
    ],
  },
  {
    day: "Wednesday",
    exercise: ["Rest Day"],
    reps: [],
    time: [],
    instructions: [],
  },
  {
    day: "Thursday",
    exercise: ["Squats", "Deadlifts", "Lunges", "Bench Press"],
    reps: [8, 6, 12, 10],
    time: [3, 3, 3, 3],
    instructions: [
      "Warm up with 5 min of cardio",
      "Start with 8 reps, increase if necessary",
      "Alternate legs each set",
      "Keep core tight",
    ],
  },
  {
    day: "Friday",
    exercise: ["Bicep Curls", "Tricep Dips", "Shoulder Press", "Pull Ups"],
    reps: [12, 10, 8, 8],
    time: [3, 3, 3, 3],
    instructions: [
      "Use lighter weights for higher reps",
      "Keep elbow close to body",
      "Breathe out while pressing up",
      "Focus on form, not weight",
    ],
  },
  {
    day: "Saturday",
    exercise: ["Crunches", "Leg Raises", "Plank", "Bicycle Crunches"],
    reps: [20, 15, 30, 20],
    time: [3, 3, 3, 3],
    instructions: [
      "Tighten abs throughout",
      "Slow and controlled movements",
      "Hold for full 30 secs",
      "Keep neck relaxed",
    ],
  },
];

const ScheduleForm = () => {
  const [selectedDay, setSelectedDay] = useState("Sunday");
  const [exercise, setExercise] = useState("");
  const [reps, setReps] = useState("");
  const [time, setTime] = useState("");
  const [instructions, setInstructions] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [addExerciseButtonLabel, setAddExerciseButtonLabel] =
    useState("Add Exercise");

  const [scheduleState, setScheduleState] = useState(schedule);

  const [showPopup, setShowPopup] = useState(false);

  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };

  const handleExerciseChange = (event) => {
    setExercise(event.target.value);
  };

  const handleRepsChange = (event) => {
    setReps(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleInstructionsChange = (event) => {
    setInstructions(event.target.value);
  };

  const handleEdit = (index) => {
    const selectedSchedule = schedule.find((day) => day.day === selectedDay);
    setEditIndex(index);
    setSelectedDay(selectedDay);
    setExercise(selectedSchedule.exercise[index]);
    setReps(selectedSchedule.reps[index]);
    setTime(selectedSchedule.time[index]);
    setInstructions(selectedSchedule.instructions[index]);
    setAddExerciseButtonLabel("Update Exercise");
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    const selectedSchedule = schedule.find((day) => day.day === selectedDay);
    selectedSchedule.exercise[editIndex] = exercise;
    selectedSchedule.reps[editIndex] = reps;
    selectedSchedule.time[editIndex] = time;
    selectedSchedule.instructions[editIndex] = instructions;
    setExercise("");
    setReps("");
    setTime("");
    setInstructions("");
    setEditIndex(null);
    setAddExerciseButtonLabel("Add Exercise");
  };

  const handleSubmit = (event) => {
    if (editIndex !== null) {
      handleUpdate(event);
    } else {
      event.preventDefault();
      const selectedSchedule = schedule.find((day) => day.day === selectedDay);
      selectedSchedule.exercise.push(exercise);
      selectedSchedule.reps.push(reps);
      selectedSchedule.time.push(time);
      selectedSchedule.instructions.push(instructions);
      setExercise("");
      setReps("");
      setTime("");
    }
  };

  const handleRemove = (day, index) => {
    const selectedSchedule = schedule.find((s) => s.day === day);
    selectedSchedule.exercise.splice(index, 1);
    selectedSchedule.reps.splice(index, 1);
    selectedSchedule.time.splice(index, 1);
    selectedSchedule.instructions.splice(index, 1);
    setScheduleState([...scheduleState]);
  };

  return (
    <div className="row g-0 d-flex justify-content-center">
      <div className="col-lg-6">
        <MDBCard
          border="success"
          background="white"
          shadow="0"
          className="mb-3"
        >
          <MDBCardHeader background="transparent" border="success">
            <h3 className="text-center">{selectedDay}</h3>
          </MDBCardHeader>
          <br />
          <div className="d-flex justify-content-center">
            <form onSubmit={handleSubmit} className="w-75">
              <FormControl>
                <InputLabel id="selectDay">Select Day</InputLabel>
                <Select
                  label="Select Day"
                  value={selectedDay}
                  onChange={handleDayChange}
                >
                  {schedule.map((day) => (
                    <MenuItem key={day.day} value={day.day}>
                      {day.day}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <br />
              <br />
              <MDBInput
                type="text"
                label="Exercise"
                value={exercise}
                onChange={handleExerciseChange}
                required
              />
              <br />
              <MDBInput
                type="text"
                label="Reps"
                value={reps}
                onChange={handleRepsChange}
              />
              <br />
              <MDBInput
                type="text"
                label="Time"
                value={time}
                onChange={handleTimeChange}
              />
              <br />
              <MDBTextArea
                type="text"
                label="Instructions"
                value={instructions}
                onChange={handleInstructionsChange}
              />
              <br />
              <MDBBtn type="submit">{addExerciseButtonLabel}</MDBBtn>
            </form>
          </div>
          <br />
          <br />
          <div className="d-flex justify-content-center">
            <MDBTable hover className="w-100" responsive>
              <MDBTableHead>
                <tr>
                  <th className="text-center">Exercise</th>
                  <th className="text-center">Reps</th>
                  <th className="text-center">Time</th>
                  <th className="text-center">Instructions</th>
                  <th className="text-center">Action</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {schedule
                  .find((day) => day.day === selectedDay)
                  .exercise.map((ex, index) => (
                    <tr key={ex}>
                      <td className="text-center">{ex}</td>
                      <td className="text-center">
                        {
                          schedule.find((day) => day.day === selectedDay).reps[
                            index
                          ]
                        }
                      </td>
                      <td className="text-center">
                        {
                          schedule.find((day) => day.day === selectedDay).time[
                            index
                          ]
                        }
                      </td>
                      <td className="text-center">
                        {
                          schedule.find((day) => day.day === selectedDay)
                            .instructions[index]
                        }
                      </td>
                      <td className="text-center">
                        <MDBBtn
                          className="me-1"
                          color="warning"
                          onClick={() => handleEdit(index)}
                        >
                          Edit
                        </MDBBtn>
                        <MDBBtn
                          className="me-1"
                          color="danger"
                          onClick={() => handleRemove(selectedDay, index)}
                        >
                          Remove
                        </MDBBtn>
                      </td>
                    </tr>
                  ))}
              </MDBTableBody>
            </MDBTable>
          </div>
          <MDBBtn color="success" onClick={() => setShowPopup(!showPopup)}>
            View Full Schedule
          </MDBBtn>
          {showPopup && (
            <div className="popup">
              <div
                className="close-icon"
                onClick={() => setShowPopup(!showPopup)}
              >
                <i className="fas fa-times"></i>
              </div>
              <div className="popup-inner">
                <MDBTable
                  bordered
                  borderColor="primary"
                  className="fullSchedule"
                  responsive="sm"
                >
                  <MDBTableHead>
                    <tr>
                      {schedule.map((day, index) => (
                        <th key={index}>{day.day}</th>
                      ))}
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {schedule[0].exercise.map((exercise, index) => (
                      <tr key={index}>
                        {schedule.map((day, i) =>
                          day.exercise[index] ||
                          day.reps[index] ||
                          day.time[index] ||
                          day.instructions[index] ? (
                            <td key={i}>
                              {day.exercise[index] && (
                                <h5>{day.exercise[index]}</h5>
                              )}
                              {day.reps[index] && (
                                <h6>Reps - {day.reps[index]}</h6>
                              )}
                              {day.time[index] && (
                                <h6>Time - {day.time[index]}</h6>
                              )}
                              {day.instructions[index] && (
                                <h6>
                                  Instructions - {day.instructions[index]}
                                </h6>
                              )}
                            </td>
                          ) : (
                            <td key={i}>
                              <div></div>
                            </td>
                          )
                        )}
                      </tr>
                    ))}
                  </MDBTableBody>
                </MDBTable>
              </div>
            </div>
          )}
          <div
            className="overlay"
            onClick={() => setShowPopup(!showPopup)}
            style={{ display: showPopup ? "block" : "none" }}
          ></div>
        </MDBCard>
      </div>
    </div>
  );
};

export default ScheduleForm;