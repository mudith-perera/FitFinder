///////////////////////////////// Created By Mudith Perera //////////////////////////////

import React, { useEffect, useState } from "react";
import "./GymSignUpForm.css";
import { MDBInput, MDBTextArea } from "mdb-react-ui-kit";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import img1 from "../../Images/gym.png";

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

  //Input field location
  const locations = ["Kelaniya", "Mathara", "Colombo"];

  //All Input Fields
  const [gymName, setGymName] = useState("");
  const [gymOwnerName, setGymOwnerName] = useState("");
  const [gymOwnerEmail, setGymOwnerEmail] = useState("");
  const [gymSexType, setGymSexType] = useState("unisex");
  const [gymContactNo1, setGymContactNo1] = useState("");
  const [gymContactNo2, setGymContactNo2] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [gymMonthlyFee, setGymMonthlyFee] = useState("");
  const [gymAnnualFee, setGymAnnualFee] = useState("");
  const [gymAddress, setGymAddress] = useState("");
  const [gymOwnerComment, setGymOwnerComment] = useState("");

  //Input field Gym Sex Type validation
  const handleChange = (event) => {
    setGymSexType(event.target.value);
  };

  //Form Submit function
  const signUpGym = async (e) => {
    e.preventDefault();
    const formData = {
      gymName,
      gymOwnerName,
      gymOwnerEmail,
      gymSexType,
      gymContactNo1,
      gymContactNo2,
      location,
      password,
      confirmPwd,
      gymMonthlyFee,
      gymAnnualFee,
      gymAddress,
      gymOwnerComment,
    };
    console.log(formData);

    if (password === confirmPwd) {
      console.log("matched");
      setpwsdMatch(true);
    } else {
      console.log("not matched");
      setpwsdMatch(false);
      notifError();
    }

    console.log(pwsdMatch);
    // try {
    //   const res = await axios.post('http://127.0.0.1:8000/api/add-users',formData);

    //   if (res.data.status === 200)
    //     {
    //       console.log(res.data.message);
    //       notifSuccess();//Load toastify Alert

    //       setTimeout(() => {
    //         navigate("/login");
    //       }, 3000);

    //     }
    // } catch (err) {
    //     notifError();
    // }
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
                <form onSubmit={signUpGym}>
                  <div className="row g-0 ">
                    <div className="col-lg-6 bg-partone">
                      <div className="p-5">
                        <h3 className="fw-normal mb-5">
                          Request Gym Registration&emsp;
                          <img className="img1" src={img1} alt="General Info" />
                        </h3>

                        <div className="row">
                          <div className="col-md-6 mb-4 pb-2">
                            <div className="form-outline">
                              <MDBInput
                                name="gymName"
                                type="text"
                                className="form-control form-control-lg"
                                label="Gym Name"
                                onChange={(e) => setGymName(e.target.value)}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-md-6 mb-4 pb-2">
                            <div className="form-outline">
                              <MDBInput
                                name="gymOwnerName"
                                type="text"
                                className="form-control form-control-lg"
                                label="Gym Owner's Name"
                                onChange={(e) =>
                                  setGymOwnerName(e.target.value)
                                }
                                required
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6 mb-4 pb-2">
                            <div className="form-outline">
                              <MDBInput
                                name="gymOwnerEmail"
                                type="email"
                                className="form-control form-control-lg"
                                label="Gym Owner's Email"
                                onChange={(e) =>
                                  setGymOwnerEmail(e.target.value)
                                }
                                required
                              />
                            </div>
                          </div>
                          <div className="col-md-6 mb-4 pb-2">
                            <FormControl>
                              <InputLabel id="lableGender">
                                Gym Sex Type
                              </InputLabel>
                              <Select
                                name="gymSexType"
                                sx={{ m: 1, minWidth: 150 }}
                                size="small"
                                labelId="lableGender"
                                id="demo-select-small"
                                value={gymSexType}
                                label="Gym Sex Type"
                                onChange={handleChange}
                                required
                              >
                                <MenuItem value={"unisex"}>Unisex</MenuItem>
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
                                name="contactNo1"
                                type="text"
                                className="form-control form-control-lg"
                                label="Contact No 1"
                                onChange={(e) =>
                                  setGymContactNo1(e.target.value)
                                }
                                required
                              />
                            </div>
                          </div>
                          <div className="col-md-6 mb-4 pb-2">
                            <div className="form-outline">
                              <MDBInput
                                name="contactNo2"
                                type="text"
                                className="form-control form-control-lg"
                                label="Contact No 2"
                                onChange={(e) =>
                                  setGymContactNo2(e.target.value)
                                }
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6 mb-4 pb-2">
                            <FormControl>
                              <InputLabel id="labelLocation">
                                Location
                              </InputLabel>
                              <Select
                                name="Location"
                                sx={{ m: 1, minWidth: 200 }}
                                size="small"
                                labelId="labelLocation"
                                id="demo-select-small"
                                value={location}
                                label="Gym Sex Type"
                                onChange={(e) => setLocation(e.target.value)}
                                required
                              >
                                {locations.map((element, index) => (
                                  <MenuItem key={index} value={element}>
                                    {element}
                                  </MenuItem>
                                ))}
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
                          <div className="col-md-5 mb-4 pb-2">
                            <div className="form-outline form-white">
                              <MDBInput
                                name="monthlyFee"
                                type="number"
                                className="form-control form-control-lg"
                                label="Monthly Fee (Rs.)"
                                onChange={(e) =>
                                  setGymMonthlyFee(e.target.value)
                                }
                                min="20"
                                style={{ backgroundColor: "transparent" }}
                              />
                            </div>
                          </div>
                          <div className="col-md-5 mb-4 pb-2">
                            <div className="form-outline form-white">
                              <MDBInput
                                name="annualFee"
                                type="number"
                                className="form-control form-control-lg"
                                label="Annual Fee (Rs.)"
                                onChange={(e) =>
                                  setGymAnnualFee(e.target.value)
                                }
                                style={{ backgroundColor: "transparent" }}
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
                                label="Address"
                                onChange={(e) => setGymAddress(e.target.value)}
                                style={{ backgroundColor: "transparent" }}
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div className="form-outline form-white">
                          <MDBTextArea
                            name="ownerComment"
                            type="text"
                            className="form-control form-control-lg"
                            label="Owner's Comment"
                            onChange={(e) => setGymOwnerComment(e.target.value)}
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
