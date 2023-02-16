///////////////////////// Developer       : Mudith Perera  /////////////////////////
///////////////////////// Modified Date   : 11-02-2023     /////////////////////////
/////////////////////////           (START)                /////////////////////////

import React, { useEffect, useState } from "react";
import "./CoachSignUpForm.css";
//import { useNavigate } from "react-router-dom";

import { MDBInput, MDBTextArea } from "mdb-react-ui-kit";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import img1 from "../../Images/coach.png";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Aos from "aos";
import "aos/dist/aos.css";

const GymSignUpForm = () => {
  useEffect(() => {
    Aos.init({ duration: 500 });
  });

  const [pwsdMatch, setpwsdMatch] = useState("");

  //Confirm Password Check
  const notifError = () => {
    toast.error("Passwords do not match 😥", {
      theme: "colored",
      position: toast.POSITION.TOP_LEFT,
    });
  };
  //user account create success alert
  const userSuccess = () => {
    toast.success("Request Send. Please wait 24Hours 😊👍", {
      theme: "colored",
      position: toast.POSITION.TOP_LEFT,
    });
  };

  //user account create error alert
  const userError = (error) => {
    toast.error("😢 " + error, {
      theme: "colored",
      position: toast.POSITION.TOP_LEFT,
    });
  };
  //All Input Fields
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setCoachGender] = useState("");
  const [age, setCoachAge] = useState("");
  const [coachType, setCoachType] = useState("");
  const [contact, setCoachContactNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [address, setAddress] = useState("");
  const [userComments, setCoachComment] = useState("");
  const [userType] = useState("coach");
  const activeStatus = false;

  //const navigate = useNavigate();

  //Input field gender handler
  const genderHandleChange = (event) => {
    setCoachGender(event.target.value);
  };

  //Input field Coach techniques handler
  const coachTypeHandleChange = (event) => {
    setCoachType(event.target.value);
  };

  //Form Submit function
  const signupCoach = async (e) => {
    e.preventDefault();
    const formData = {
      firstname,
      lastname,
      email,
      gender,
      age,
      coachType,
      contact,
      password,
      address,
      userComments,
      userType,
      activeStatus,
    };
    console.log(formData);

    if (password === confirmPwd) {
      setpwsdMatch(true);

      //Sends data to backend
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      if (!response.ok) {
        userError(json.error);
        //console.log(json.error);
      }
      if (response.ok) {
        userSuccess();
        setEmail("");
        setPassword("");
        setConfirmPwd("");
        //console.log("new user added", json);

        // setTimeout(() => {
        //   navigate("/");
        // }, 3000);
        //window.location.reload(false);
      }
    } else {
      setpwsdMatch(false);
      notifError();
    }

    console.log(pwsdMatch);
  };

  return (
    <section data-aos="zoom-in">
      <ToastContainer />
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12">
            <div
              className="card card-registration card-registration-2"
              style={{ borderRadius: "15px", backgroundColor: "transparent" }}
            >
              <div className="card-body p-0">
                <form onSubmit={signupCoach}>
                  <div className="row g-0 ">
                    <div className="col-lg-6 bg-partone">
                      <div className="p-5">
                        <h3 className="fw-normal mb-5">
                          Request Choach Registration&emsp;
                          <img className="img1" src={img1} alt="General Info" />
                        </h3>

                        <div className="row">
                          <div className="col-md-6 mb-4 pb-2">
                            <div className="form-outline">
                              <MDBInput
                                name="firstname"
                                type="text"
                                className="form-control form-control-lg"
                                label="Firstname"
                                onChange={(e) => setFirstname(e.target.value)}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-md-6 mb-4 pb-2">
                            <div className="form-outline">
                              <MDBInput
                                name="lastname"
                                type="text"
                                className="form-control form-control-lg"
                                label="Lastname"
                                onChange={(e) => setLastname(e.target.value)}
                                required
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6 mb-4 pb-2">
                            <div className="form-outline">
                              <MDBInput
                                name="email"
                                type="text"
                                className="form-control form-control-lg"
                                label="Email"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-md-6 mb-4 pb-2">
                            <FormControl>
                              <InputLabel id="lableGender">Gender</InputLabel>
                              <Select
                                name="gender"
                                sx={{ m: 1, minWidth: 150 }}
                                size="small"
                                labelId="lableGender"
                                id="demo-select-small"
                                value={gender}
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
                                name="age"
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
                                name="contact"
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
                                value={coachType}
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
                        <div className="row">
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
                        </div>

                        <div className="row">
                          <div className="col-md-12 mb-4 pb-2">
                            <div className="form-outline form-white">
                              <MDBInput
                                name="address"
                                type="text"
                                className="form-control form-control-lg"
                                value={address}
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
                            name="userComments"
                            type="text"
                            className="form-control form-control-lg"
                            label="Coach's Comment"
                            value={userComments}
                            onChange={(e) => setCoachComment(e.target.value)}
                            style={{ backgroundColor: "transparent" }}
                          />
                        </div>
                        <br />

                        <Stack direction="row" spacing={2}>
                          <Button
                            variant="contained"
                            type="submit"
                            endIcon={<SendIcon />}
                          >
                            Request
                          </Button>
                        </Stack>
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
  );
};
export default GymSignUpForm;
