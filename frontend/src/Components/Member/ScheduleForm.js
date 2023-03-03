///////////////////////////////// Created By Sachintha Imindhu //////////////////////////////

import React, { useState, useEffect } from "react";
import "./ScheduleForm.css";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { useCookies } from 'react-cookie';
import SideNavbar from '../../Components/Shared/SideNavbar.js';

export default function App() {

  const [cookie] = useCookies(['']);
  const [userId] = useState((cookie.LoggedUser[5]));

  const [schedule, setScheduleState] = useState([]);

  useEffect(() => {
    const loadSchedule = async () => {
      try {
        const response = await fetch(`/api/schedule/${userId}`, { method: 'GET' });
        const loadedSchedule = await response.json();
        setScheduleState(loadedSchedule);
      } catch (error) {
        console.log(error);
      }
    };
    loadSchedule();
  }, [userId]);

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
    <div>
      <div style={{ position: "fixed", zIndex: "1" }}>
        <SideNavbar userRole="member" />
      </div>
      <div className="app-container">
        <div className="header">
          <div className="day-selector-container">
            {schedule.map((day, index) => (
              <div
                key={day.day} // add key prop here
                className={`day-selector ${day.day === selectedDay ? "selected" : ""
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
            currentDaySchedule.exercises.map((exercise, index) => (
              <div className="schedule-card">
                <div className="exercise-title">{exercise}</div>
                {currentDaySchedule.reps[index].length !== 0 && (
                  <div className="reps-container">
                    <div className="reps-label">Reps</div>
                    <div className="reps-value">
                      {currentDaySchedule.reps[index]}
                    </div>
                  </div>
                )}
                {currentDaySchedule.time[index].length !== 0 && (
                  <div className="time-container">
                    <div className="time-label">Time</div>
                    <div className="time-value">
                      {currentDaySchedule.time[index]} min
                    </div>
                  </div>
                )}
                {currentDaySchedule.instructions[index].length !== 0 && (
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
    </div>
  );
}