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

const CoachViewAndUpdateForm = () => {
  useEffect(() => {
    Aos.init({ duration: 500 });
  });

  //All Input Fields
  const [coachName, setCoachName] = useState("");
  const [coachEmail, setCoachEmail] = useState("");
  const [coachGender, setCoachGender] = useState("unisex");
  const [coachAge, setCoachAge] = useState("");
  const [coachType, setCoachType] = useState("");
  const [coachContactNo, setCoachContactNo] = useState("");
  const [address, setAddress] = useState("");
  const [coachComment, setCoachComment] = useState("");

  //Input field gender handler
  const genderHandleChange = (event) => {
    setCoachGender(event.target.value);
  };

  //Input field Coach techniques handler
  const coachTypeHandleChange = (event) => {
    setCoachType(event.target.value);
  };

  //Form Submit function
  const signUpGym = async (e) => {
    e.preventDefault();
    const formData = {
      coachName,
      coachEmail,
      coachGender,
      coachAge,
      coachType,
      coachContactNo,
      address,
      coachComment,
    };
    console.log(formData);
  };

  return (
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
                style={{ borderRadius: "15px", backgroundColor: "transparent" }}
              >
                <div className="card-body p-0">
                  <form onSubmit={signUpGym}>
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
                                  onChange={(e) => setCoachName(e.target.value)}
                                  required
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
                                  onChange={(e) =>
                                    setCoachEmail(e.target.value)
                                  }
                                  required
                                />
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-6 mb-4 pb-2">
                              <FormControl>
                                <InputLabel id="lableGender">Gender</InputLabel>
                                <Select
                                  name="coachGender"
                                  sx={{ m: 1, minWidth: 150 }}
                                  size="small"
                                  labelId="lableGender"
                                  id="demo-select-small"
                                  label="Gender"
                                  onChange={genderHandleChange}
                                  required
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
                                  onChange={(e) => setCoachAge(e.target.value)}
                                  required
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
                                  onChange={(e) =>
                                    setCoachContactNo(e.target.value)
                                  }
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
                                  required
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
                          {/* <div className="row">
                          <div className="col-md-5 mb-4 pb-2">
                            <div className="form-outline form-white">
                              <MDBInput
                                name="password"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control form-control-lg"
                                label="Password"
                                style={{ backgroundColor: "transparent" }}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-md-5 mb-4 pb-2">
                            <div className="form-outline form-white">
                              <MDBInput
                                name="confirmPwd"
                                type="password"
                                onChange={(e) => setConfirmPwd(e.target.value)}
                                className="form-control form-control-lg"
                                label="Confirm Password"
                                style={{ backgroundColor: "transparent" }}
                                required
                              />
                            </div>
                          </div>
                        </div> */}

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
                                  required
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
                              onChange={(e) => setCoachComment(e.target.value)}
                              style={{ backgroundColor: "transparent" }}
                            />
                          </div>
                          <br />

                          <Button variant="contained">Update</Button>
                          <br />
                          <br />

                          <div className="row">
                            <div className="col-md-6 mb-4 pb-2">
                              <Button color="warning" variant="contained">
                                Reset Password
                              </Button>
                            </div>

                            <div className="col-md-6 mb-4 pb-2">
                              <Button
                                color="error"
                                variant="contained"
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
  );
};
export default CoachViewAndUpdateForm;
