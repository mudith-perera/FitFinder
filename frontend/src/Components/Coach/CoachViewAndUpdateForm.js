///////////////////////// Dilini Kariyawasam /////////////////////////

import React, { useEffect, useState } from "react";
import "./CoachSignUpForm.css";
import { MDBInput, MDBTextArea } from "mdb-react-ui-kit";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

import img1 from "../../Images/coach.png";

//import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Aos from "aos";
import "aos/dist/aos.css";

import SideNavbar from "../Shared/SideNavbar.js";

import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Dialog from '@mui/material/Dialog';

import ResetPasswordForm from "../Password/ResetPasswordForm";

const CoachViewAndUpdateForm = () => {
  const [cookie] = useCookies([""]);
  const [userData, setUserData] = useState(null);
  const [userId] = useState(cookie.LoggedUser[5]);
  //All Input Fields
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [coachType, setCoachType] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [userComments, setUserComments] = useState("");
  useEffect(() => {
    Aos.init({ duration: 500 });

    fetch(`/api/users/${userId}`)
      .then((response) => response.json())
      .then((data) => setUserData(data));
  }, [userId]);

  useEffect(() => {
    setFirstname(userData?.firstname);
    setEmail(userData?.email);
    setGender(userData?.gender);
    setAge(userData?.age);
    setCoachType(userData?.coachType);
    setContact(userData?.contact);
    setAddress(userData?.address);
    setUserComments(userData?.userComments);
    //setLocation(userData?.location);
    //setSelectedLocation(userData?.location);
  }, [userData]);

  //Input field gender handler
  const genderHandleChange = (event) => {
    setGender(event.target.value);
  };

  //Input field Coach techniques handler
  const coachTypeHandleChange = (event) => {
    setCoachType(event.target.value);
  };

  ///////////////////////////////////////////////////// Coach Update Function (START) /////////////////////////////////////////////////////
  //success alert
  const userSuccess = () => {
    toast.success("Update Success 😊", {
      theme: "colored",
      position: toast.POSITION.TOP_LEFT,
    });
  };

  //error alert
  const userError = (error) => {
    toast.error("😢 " + error, {
      theme: "colored",
      position: toast.POSITION.TOP_LEFT,
    });
  }
  const updateCoach = async () => {
    //e.preventDefault();
    const formData = {
      firstname,
      email,
      gender,
      age,
      coachType,
      contact,
      address,
      userComments,
    };

    //user validation backend
    const response = await fetch("/api/users/" + userId, {
      method: "PATCH",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      userError(json.error);
    }
    if (response.ok) {
      userSuccess();
    }
  };
  ///////////////////////////////////////////////////// Coach Update Function (END) /////////////////////////////////////////////////////

  ///////////////////////////////////////////////////// Coach Delete Function (START) /////////////////////////////////////////////////////
  //success alert

  // const userDelete = () => {
  //   toast.success("Delete Success 😊", {
  //     theme: "colored",
  //     position: toast.POSITION.TOP_LEFT,
  //   });
  // };

  const navigate = useNavigate();


  const deleteCoach = async () => {
    //e.preventDefault();
    const formData = {
      firstname,
      email,
      gender,
      age,
      coachType,
      contact,
      address,
      userComments,
      $set: { activeStatus: false }
    };

    //user validation backend
    const response = await fetch("/api/users/" + userId, {
      method: "PATCH",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      userError(json.error);
    }
    if (response.ok) {
      userSuccess();
    }
    navigate("/login");
  };
  ///////////////////////////////////////////////////// Coach Delete Function (END) /////////////////////////////////////////////////////


  ///////////////////////////////////////////////////// Coach Password Reset (Start) /////////////////////////////////////////////////////
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  ///////////////////////////////////////////////////// Member Password Reset (END) /////////////////////////////////////////////////////

  return (
    <>
      <ToastContainer />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <ResetPasswordForm userId={userId}/>
      </Dialog>
      <div>
        <div style={{ position: "fixed", zIndex: "1" }}>
          <SideNavbar userRole="coach" />
        </div>
        <section data-aos="zoom-in">
          {/* <ToastContainer /> */}
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12">
                <div
                  className="card card-registration card-registration-2"
                  style={{
                    borderRadius: "15px",
                    backgroundColor: "transparent",
                  }}
                >
                  <div className="card-body p-0">
                    <form>
                      <div className="row g-0 ">
                        <div className="col-lg-6 bg-partone">
                          <div className="p-5">
                            <h3 className="fw-normal mb-5">
                              Coach Personal Info&emsp;
                              <img
                                className="img1"
                                src={img1}
                                alt="General Info"
                              />
                            </h3>

                            <div className="row">
                              <div className="col-md-6 mb-4 pb-2">
                                <div className="form-outline">
                                  <MDBInput
                                    name="coachName"
                                    type="text"
                                    className="form-control form-control-lg"
                                    label="Coach Name"
                                    onChange={(e) =>
                                      setFirstname(e.target.value)
                                    }
                                    value={firstname}
                                  />
                                </div>
                              </div>
                              <div className="col-md-6 mb-4 pb-2">
                                <div className="form-outline">
                                  <MDBInput
                                    name="coachEmail"
                                    type="text"
                                    className="form-control form-control-lg"
                                    label="Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    disabled
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-6 mb-4 pb-2">
                                <FormControl>
                                  <InputLabel id="lableGender">
                                    Gender
                                  </InputLabel>
                                  <Select
                                    name="coachGender"
                                    sx={{ m: 1, minWidth: 150 }}
                                    size="small"
                                    labelId="lableGender"
                                    id="demo-select-small"
                                    label="Gender"
                                    onChange={genderHandleChange}
                                    value={gender}
                                  >
                                    <MenuItem value={"male"}>Male</MenuItem>
                                    <MenuItem value={"female"}>Female</MenuItem>
                                  </Select>
                                </FormControl>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-6 mb-4 pb-2">
                                <div className="form-outline">
                                  <MDBInput
                                    name="coachAge"
                                    type="number"
                                    className="form-control form-control-lg"
                                    label="Age"
                                    onChange={(e) => setAge(e.target.value)}
                                    value={age}
                                  />
                                </div>
                              </div>
                              <div className="col-md-6 mb-4 pb-2">
                                <div className="form-outline">
                                  <MDBInput
                                    name="coachContactNo"
                                    type="text"
                                    className="form-control form-control-lg"
                                    label="Contact No"
                                    onChange={(e) => setContact(e.target.value)}
                                    value={contact}
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-6 mb-4 pb-2">
                                <FormControl>
                                  <InputLabel id="labelCoachType">
                                    Coach Type
                                  </InputLabel>
                                  <Select
                                    name="coachType"
                                    sx={{ m: 1, minWidth: 200 }}
                                    size="small"
                                    labelId="labelCoachType"
                                    id="demo-select-small"
                                    label="Coach Type"
                                    onChange={coachTypeHandleChange}
                                    value={coachType}
                                  >
                                    <MenuItem value={"fitnessTrainer"}>
                                      Fitness trainer
                                    </MenuItem>
                                    <MenuItem value={"sportsCoach"}>
                                      Sports coach
                                    </MenuItem>
                                    <MenuItem value={"personalTrainer"}>
                                      Personal trainer
                                    </MenuItem>
                                    <MenuItem value={"athleticTrainer"}>
                                      Athletic trainer
                                    </MenuItem>
                                    <MenuItem value={"healthTrainer"}>
                                      Health trainer
                                    </MenuItem>
                                    <MenuItem value={"bodybuildingCoach"}>
                                      Bodybuilding coach
                                    </MenuItem>
                                  </Select>
                                </FormControl>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-6 mb-4 pb-2"></div>
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-6 bg-parttwo text-white">
                          <div className="p-5">
                            <h3 className="fw-normal mb-5">&emsp;&emsp;</h3>
                            <div className="row">
                              <div className="col-md-12 mb-4 pb-2">
                                <div className="form-outline form-white">
                                  <MDBInput
                                    name="address"
                                    type="text"
                                    className="form-control form-control-lg"
                                    label="Address"
                                    onChange={(e) => setAddress(e.target.value)}
                                    style={{ backgroundColor: "transparent" }}
                                    value={address}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="form-outline form-white">
                              <MDBTextArea
                                name="coachComment"
                                type="text"
                                className="form-control form-control-lg"
                                label="Coach's Comment"
                                value={userComments}
                                onChange={(e) =>
                                  setUserComments(e.target.value)
                                }
                                style={{ backgroundColor: "transparent" }}
                              />
                            </div>
                            <br />

                            <Button variant="contained" onClick={updateCoach}>
                              Update
                            </Button>
                            <br />
                            <br />

                            <div className="row">
                              <div className="col-md-6 mb-4 pb-2">
                                <Button color="warning" variant="contained" onClick={handleClickOpen}>
                                  Reset Password
                                </Button>
                              </div>

                              <div className="col-md-6 mb-4 pb-2">
                                <Button
                                  color="error"
                                  variant="contained" onClick={deleteCoach}
                                  startIcon={<DeleteIcon />}
                                >
                                  Delete My Account
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
export default CoachViewAndUpdateForm;
