///////////////////////////////// Created By Sachintha Imindhu //////////////////////////////

import React, { useState, useEffect } from "react";
import "./ScheduleForm.css";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

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

export default function App() {
  const [selectedDay, setSelectedDay] = useState("");

  useEffect(() => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDayIndex = new Date().getUTCDay();
    const currentDay = daysOfWeek[currentDayIndex];
    setSelectedDay(currentDay);
  }, []);

  const handleDaySelection = (day) => {
    setSelectedDay(day);
  };

  const currentDaySchedule = schedule.find((day) => day.day === selectedDay);

  return (
    <div className="app-container">
      <div className="header">
        <div className="day-selector-container">
          {schedule.map((day) => (
            <div
              className={`day-selector ${
                day.day === selectedDay ? "selected" : ""
              }`}
              onClick={() => handleDaySelection(day.day)}
            >
              {day.day}
            </div>
          ))}
        </div>
        <div className="responsive-day-selector">
          <FormControl>
            <Select
              className="day-selector-dropdown"
              value={selectedDay}
              onChange={(event) => handleDaySelection(event.target.value)}
            >
              {schedule.map((day) => (
                <MenuItem key={day.day} value={day.day}>
                  {day.day}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="schedule-container">
        {currentDaySchedule &&
          currentDaySchedule.exercise.map((exercise, index) => (
            <div className="schedule-card">
              <div className="exercise-title">{exercise}</div>
              {currentDaySchedule.reps.length !== 0 && (
                <div className="reps-container">
                  <div className="reps-label">Reps</div>
                  <div className="reps-value">
                    {currentDaySchedule.reps[index]}
                  </div>
                </div>
              )}
              {currentDaySchedule.time.length !== 0 && (
                <div className="time-container">
                  <div className="time-label">Time</div>
                  <div className="time-value">
                    {currentDaySchedule.time[index]} min
                  </div>
                </div>
              )}
              {currentDaySchedule.instructions.length !== 0 && (
                <div className="instructions-container">
                  <div className="instructions-label">Instructions</div>
                  <div
                    id={`my-anchor-element-${index}`}
                    className="instructions-value"
                    data-tooltip-content={
                      currentDaySchedule.instructions[index]
                    }
                    data-tip
                    data-for={`my-tooltip-${index}`}
                  >
                    {currentDaySchedule.instructions[index]}
                    <ReactTooltip
                      anchorId={`my-anchor-element-${index}`}
                      place="top"
                      type="dark"
                      effect="float"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}