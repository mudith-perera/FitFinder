///////////////////////// Developer       : Mudith Perera  /////////////////////////
///////////////////////// Modified Date   : 07-02-2023     /////////////////////////
/////////////////////////           (START)                /////////////////////////

import React, { useEffect, useState } from "react";
import "./MemberViewAndUpdateForm.css";
import { MDBInput, MDBTextArea } from "mdb-react-ui-kit";

import SideNavbar from "../Shared/SideNavbar.js";

import img1 from "../../Images/SignupInfo.png";
import img2 from "../../Images/SignUpGymInfo.png";

import Aos from "aos";
import "aos/dist/aos.css";

import { locations } from "./../Shared/locations.js";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import { useCookies } from "react-cookie";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

import Dialog from '@mui/material/Dialog';

import ResetPasswordForm from "../Password/ResetPasswordForm";

const MemberViewAndUpdateForm = () => {
  const [cookie] = useCookies([""]);
  const [userData, setUserData] = useState(null);
  const [userId] = useState(cookie.LoggedUser[5]);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [nic, setNic] = useState("");
  const [age, setAge] = useState("");
  const [contact, setContact] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [fat, setFat] = useState("");
  const [medicalConditions, setMedicalConditions] = useState("");
  const [password, setPassword] = useState("");

  //Location Drop Down Handlers (START)
  const [location, setLocation] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  console.log(location);
  const getLocationOptionLabel = (locations) => {
    if (!locations) {
      return "";
    }
    return locations.label || "";
  };
  const handleOptionChangeLocation = (event, newValue) => {
    setSelectedLocation(newValue);
    setLocation(getLocationOptionLabel(newValue));
  };
  //Location Drop Down Handlers (END)

  useEffect(() => {
    Aos.init({ duration: 500 });
    fetch(`/api/users/${userId}`)
      .then((response) => response.json())
      .then((data) => setUserData(data));
  }, [userId]);

  const [username] = useState(
    cookie.LoggedUser[2] + " " + cookie.LoggedUser[3]
  );

  useEffect(() => {
    setFirstname(userData?.firstname);
    setLastname(userData?.lastname);
    setEmail(userData?.email);
    setNic(userData?.nic);
    setAge(userData?.age);
    setContact(userData?.contact);
    setGender(userData?.gender);
    setAddress(userData?.address);
    setWeight(userData?.weight);
    setHeight(userData?.height);
    setFat(userData?.fat);
    setMedicalConditions(userData?.medicalConditions);
    setPassword(userData?.password);
    //setLocation(userData?.location);
    //setSelectedLocation(userData?.location);
  }, [userData]);

  ///////////////////////////////////////////////////// Member Update Function (START) /////////////////////////////////////////////////////
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
  };
  const updateUser = async () => {
    //e.preventDefault();
    const formData = {
      firstname,
      lastname,
      email,
      nic,
      age,
      contact,
      gender,
      address,
      weight,
      height,
      fat,
      medicalConditions,
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
  ///////////////////////////////////////////////////// Member Update Function (END) /////////////////////////////////////////////////////

  ///////////////////////////////////////////////////// Member Password Reset (Start) /////////////////////////////////////////////////////
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
          <SideNavbar userRole="member" userName={username} />
        </div>
        <section data-aos="fade-down">
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
                    <div className="row g-0 ">
                      <div className="col-lg-6 bg-partone">
                        <div className="p-5">
                          <h3 className="fw-normal mb-5">
                            General Infomation &emsp;
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
                                  type="text"
                                  className="form-control form-control-lg"
                                  label="First name"
                                  value={firstname}
                                  onChange={(e) => setFirstname(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="col-md-6 mb-4 pb-2">
                              <div className="form-outline">
                                <MDBInput
                                  type="text"
                                  className="form-control form-control-lg"
                                  label="Last name"
                                  value={lastname}
                                  onChange={(e) => setLastname(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-6 mb-4 pb-2">
                              <div className="form-outline">
                                <MDBInput
                                  type="text"
                                  className="form-control form-control-lg"
                                  label="Email"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="col-md-6 mb-4 pb-2">
                              <div className="form-outline">
                                <MDBInput
                                  type="text"
                                  className="form-control form-control-lg"
                                  label="NIC"
                                  value={nic}
                                  onChange={(e) => setNic(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-6 mb-4 pb-2">
                              <div className="form-outline">
                                <MDBInput
                                  type="number"
                                  className="form-control form-control-lg"
                                  label="Age"
                                  min="12"
                                  max="100"
                                  value={age}
                                  onChange={(e) => setAge(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="col-md-6 mb-4 pb-2">
                              <div className="form-outline">
                                <MDBInput
                                  type="text"
                                  className="form-control form-control-lg"
                                  label="Contact No"
                                  value={contact}
                                  onChange={(e) => setContact(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-6 mb-4 pb-2">
                              <label className="form-label">Gender</label>
                              <select
                                className="form-control"
                                name="userType"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                              >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                              </select>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-12 mb-4 pb-2">
                              <div className="form-outline">
                                <MDBInput
                                  type="text"
                                  className="form-control form-control-lg"
                                  label="Address"
                                  value={address}
                                  onChange={(e) => setAddress(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6 mb-4 pb-2">
                              <div className="form-outline">
                                <Box
                                  sx={{
                                    "& .MuiTextField-root": {
                                      m: 1,
                                      width: "80%",
                                    },
                                    "& .MuiAutocomplete-root": {
                                      width: "200%",
                                    },
                                  }}
                                  noValidate
                                  autoComplete="off"
                                >
                                  <FormControl>
                                    <Autocomplete
                                      options={locations}
                                      getOptionLabel={getLocationOptionLabel}
                                      value={selectedLocation}
                                      size="small"
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          label="Location"
                                        />
                                      )}
                                      onChange={handleOptionChangeLocation}
                                    />
                                  </FormControl>
                                </Box>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-6 bg-parttwo text-white">
                        <div className="p-5">
                          <h3 className="fw-normal mb-5">
                            For Gym Use&emsp;&emsp;
                            <img
                              className="img1"
                              src={img2}
                              alt="General Info"
                            />
                          </h3>
                          <div className="row">
                            <div className="col-md-5 mb-4 pb-2">
                              <div className="form-outline form-white">
                                <MDBInput
                                  type="number"
                                  className="form-control form-control-lg"
                                  label="weight (kg)"
                                  min="20"
                                  value={weight}
                                  onChange={(e) => setWeight(e.target.value)}
                                  style={{ backgroundColor: "transparent" }}
                                />
                              </div>
                            </div>
                            <div className="col-md-5 mb-4 pb-2">
                              <div className="form-outline form-white">
                                <MDBInput
                                  type="number"
                                  className="form-control form-control-lg"
                                  label="Height (cm)"
                                  value={height}
                                  onChange={(e) => setHeight(e.target.value)}
                                  style={{ backgroundColor: "transparent" }}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-5 mb-4 pb-2">
                              <div className="form-outline form-white">
                                <MDBInput
                                  type="number"
                                  className="form-control form-control-lg"
                                  label="Fat (%)"
                                  min="1"
                                  max="100"
                                  value={fat}
                                  onChange={(e) => setFat(e.target.value)}
                                  style={{ backgroundColor: "transparent" }}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="col-md-5 mb-4 pb-2"></div>
                          <div className="form-outline form-white">
                            <MDBTextArea
                              type="text"
                              className="form-control form-control-lg"
                              label="Medical Conditions (Seperated by ',' )"
                              style={{ backgroundColor: "transparent" }}
                              value={medicalConditions}
                              onChange={(e) =>
                                setMedicalConditions(e.target.value)
                              }
                            />
                          </div>
                          <br />
                          <Button variant="contained" onClick={updateUser}>
                            Update
                          </Button>
                          <br />
                          <br />
                          <div className="row">
                            {password ? (<div className="col-md-6 mb-4 pb-2">
                              <Button color="warning" variant="contained" onClick={handleClickOpen}>
                                Reset Password
                              </Button>
                            </div>) : <></>}


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
export default MemberViewAndUpdateForm;
