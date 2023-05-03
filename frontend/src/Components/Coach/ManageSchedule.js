///////////////////////////////// Created By Sachintha Imindhu //////////////////////////////

import React, { useState, useEffect } from "react";
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
import { useParams } from "react-router-dom";

import SideNavbar from "../Shared/SideNavbar.js";

const ScheduleForm = () => {
  const { userId } = useParams();
  const [selectedDay, setSelectedDay] = useState("Sunday");
  const [exercise, setExercise] = useState("");
  const [reps, setReps] = useState("");
  const [time, setTime] = useState("");
  const [instructions, setInstructions] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [addExerciseButtonLabel, setAddExerciseButtonLabel] =
    useState("Add Exercise");

  const [schedule, setScheduleState] = useState([]);
  const [username, setUsernameState] = useState([]);

  useEffect(() => {
    const loadSchedule = async () => {
      try {
        const response = await fetch(`/api/schedule/${userId}`, {
          method: "GET",
        });
        const loadedSchedule = await response.json();
        setScheduleState(loadedSchedule);
      } catch (error) {
        console.log(error);
      }
      try {
        const response = await fetch(`/api/users/${userId}`, { method: "GET" });
        const user = await response.json();
        setUsernameState(user.firstname + " " + user.lastname);
      } catch (error) {
        console.log(error);
      }
    };
    loadSchedule();
  }, [userId]);

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
    setExercise(selectedSchedule.exercises[index]);
    setReps(selectedSchedule.reps[index]);
    setTime(selectedSchedule.time[index]);
    setInstructions(selectedSchedule.instructions[index]);
    setAddExerciseButtonLabel("Update Exercise");
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    const selectedSchedule = schedule.find((day) => day.day === selectedDay);

    try {
      const res = await fetch(`/api/schedule/update/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          day: selectedDay,
          oldExercise: selectedSchedule.exercises[editIndex],
          newExercise: exercise,
          reps,
          time,
          instructions,
        }),
      });
      const data = await res.json();
      setScheduleState(data.schedule);
      setExercise("");
      setReps("");
      setTime("");
      setInstructions("");
      setEditIndex(null);
      setAddExerciseButtonLabel("Add Exercise");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (editIndex !== null) {
      handleUpdate(event);
    } else {
      try {
        const res = await fetch(`/api/schedule/add/${userId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            day: selectedDay,
            exercise,
            reps,
            time,
            instructions,
          }),
        });
        const data = await res.json();
        setScheduleState(data.schedule);
        setExercise("");
        setReps("");
        setTime("");
        setInstructions("");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleRemove = async (day, index) => {
    try {
      const res = await fetch(`/api/schedule/delete/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          day: day,
          exerciseIndex: index,
        }),
      });
      const data = await res.json();
      setScheduleState(data.schedule);
      setExercise("");
      setReps("");
      setTime("");
      setInstructions("");
    } catch (error) {
      console.error(error);
    }
  };

  const maxExercisesSchedule = schedule.reduce((acc, cur) => {
    if (
      !acc ||
      (cur.exercises && cur.exercises.length > acc.exercises.length)
    ) {
      return cur;
    } else {
      return acc;
    }
  }, null);

  return (
    <div>
      <div style={{ position: "fixed", zIndex: "1" }}>
        <SideNavbar userRole="coach" />
      </div>
      <div className="row g-0 d-flex justify-content-center">
        <div className="col-lg-6">
          <MDBCard
            border="success"
            background="white"
            shadow="0"
            className="mb-3"
          >
            <MDBCardHeader background="transparent" border="success">
              <h3 className="text-center">{username}'s schedule</h3>
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
                    ?.exercises?.map((ex, index) => (
                      <tr key={ex}>
                        <td className="text-center">{ex}</td>
                        <td className="text-center">
                          {schedule.find((day) => day.day === selectedDay)
                            ?.reps?.[index] ?? "-"}
                        </td>
                        <td className="text-center">
                          {schedule.find((day) => day.day === selectedDay)
                            ?.time?.[index] ?? "-"}
                        </td>
                        <td className="text-center">
                          {schedule.find((day) => day.day === selectedDay)
                            ?.instructions?.[index] ?? "-"}
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
            <MDBBtn color="dark" onClick={() => setShowPopup(!showPopup)}>
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
                      {maxExercisesSchedule?.exercises?.map(
                        (exercise, index) => (
                          <tr key={index}>
                            {schedule.map((day, i) =>
                              day.exercises?.[index] ||
                                day.reps?.[index] ||
                                day.time?.[index] ||
                                day.instructions?.[index] ? (
                                <td key={i}>
                                  {day.exercises?.[index] && (
                                    <h5>{day.exercises[index]}</h5>
                                  )}
                                  {day.reps?.[index] && (
                                    <h6>Reps - {day.reps[index]}</h6>
                                  )}
                                  {day.time?.[index] && (
                                    <h6>Time - {day.time[index]}</h6>
                                  )}
                                  {day.instructions?.[index] && (
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
                        )
                      )}
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
    </div>
  );
};

export default ScheduleForm;
