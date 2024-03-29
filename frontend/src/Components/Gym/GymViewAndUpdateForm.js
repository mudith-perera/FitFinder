//////////Dilini Kariyawasam////

import React, { useEffect, useState } from "react";
import "./GymViewAndUpdateForm.css";
import { MDBInput, MDBTextArea } from "mdb-react-ui-kit";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

import img1 from "../../Images/gym.png";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Aos from "aos";
import "aos/dist/aos.css";

import SideNavbar from "../Shared/SideNavbar.js";

import { useCookies } from "react-cookie";

import Dialog from '@mui/material/Dialog';

import ResetPasswordForm from "../Password/ResetPasswordForm";

const GymViewAndUpdateForm = () => {
  const [cookie] = useCookies([""]);
  const [email] = useState(cookie.LoggedUser[4]);
  const [gymData, setGymData] = useState("");
  const [userId] = useState(cookie.LoggedUser[5]);

  //Input field location
  //const locations = ["Kelaniya", "Mathara", "Colombo"];

  //All Input Fields
  const [gymName, setGymName] = useState("");
  const [gymOwnerName, setGymOwnerName] = useState(cookie.LoggedUser[2] || '');
  const [gymSexType, setGymSexType] = useState("");
  const [gymContactNo1, setGymContactNo1] = useState("");
  const [gymContactNo2, setGymContactNo2] = useState("");
  //const [location, setLocation] = useState("");
  const [gymMonthlyFee, setGymMonthlyFee] = useState("");
  const [gymAnnualFee, setGymAnnualFee] = useState("");
  const [gymAddress, setGymAddress] = useState("");
  const [gymOwnerComment, setGymOwnerComment] = useState("");

  useEffect(() => {
    Aos.init({ duration: 500 });
    const fetchData = async () => {
      try {
        Aos.init({ duration: 500 });
        const formDataLoad = { email };
        const response = await fetch("/api/gyms/getGymByOwnerEmail/", {
          method: "POST",
          body: JSON.stringify(formDataLoad),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response?.json();
        if (data) {
          setGymData(data[0]);
        }

      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [email]);

  useEffect(() => {
    setGymName(gymData?.gymName);
    setGymOwnerName(gymData?.gymOwnerName);
    setGymSexType(gymData?.gymSexType);
    setGymContactNo1(gymData?.gymContactNo1);
    setGymContactNo2(gymData?.gymContactNo2);
    setGymMonthlyFee(gymData?.gymMonthlyFee);
    setGymAnnualFee(gymData?.gymAnnualFee);
    setGymAddress(gymData?.gymAddress);
    setGymOwnerComment(gymData?.gymOwnerComment);
    //setLocation(userData?.location);
    //setSelectedLocation(userData?.location);
  }, [
    gymData
  ]);

  ///////////////////////////////////////////////////// Gym Update Function (START) /////////////////////////////////////////////////////

  //Input field Gym Sex Type validation
  const handleChange = (event) => {
    setGymSexType(event.target.value);
  };

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

  //gym update function
  const gymUpdate = async (e) => {
    e.preventDefault();
    const formData = {
      gymName,
      //gymOwnerName,
      gymSexType,
      gymContactNo1,
      gymContactNo2,
      //location,
      gymMonthlyFee,
      gymAnnualFee,
      gymAddress,
      gymOwnerComment,
    };
    //user validation backend
    const response = await fetch("/api/gyms/" + gymData?._id, {
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

  ///////////////////////////////////////////////////// Gym Update Function (END) /////////////////////////////////////////////////////
  ///////////////////////////////////////////////////// Gym Password Reset (Start) /////////////////////////////////////////////////////
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  ///////////////////////////////////////////////////// Gym Password Reset (END) /////////////////////////////////////////////////////

  return (
    <>
      <ToastContainer />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <ResetPasswordForm userId={userId} />
      </Dialog>
      <div>
        <div style={{ position: "fixed", zIndex: "1" }}>
          <SideNavbar userRole="gym" />
        </div>
        <section data-aos="fade-down">
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
                    <form onSubmit={gymUpdate}>
                      <div className="row g-0 ">
                        <div className="col-lg-6 bg-partone">
                          <div className="p-5">
                            <h3 className="fw-normal mb-5">
                              Personal Info &emsp;
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
                                    name="gymName"
                                    type="text"
                                    className="form-control form-control-lg"
                                    label="Gym Name"
                                    value={gymName}
                                    onChange={(e) => setGymName(e.target.value)}

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
                                    value={gymOwnerName}
                                    onChange={(e) =>
                                      setGymOwnerName(e.target.value)
                                    }
                                    disabled
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
                                    value={email}
                                    disabled
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
                                    value={gymContactNo1}
                                    onChange={(e) =>
                                      setGymContactNo1(e.target.value)
                                    }

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
                                    value={gymContactNo2}
                                    onChange={(e) =>
                                      setGymContactNo2(e.target.value)
                                    }
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="row">
                              {/* <div className="col-md-6 mb-4 pb-2">
                                <FormControl>
                                  <InputLabel id="labelLocation">
                                    Location
                                  </InputLabel>
                                  <Select
                                    name=""
                                    sx={{ m: 1, minWidth: 200 }}
                                    size="small"
                                    labelId="labelLocation"
                                    id="demo-select-small"
                                    value={location}
                                    label="Gym Sex Type"
                                    onChange={(e) =>
                                      setLocation(e.target.value)
                                    }

                                  >
                                    {locations.map((element, index) => (
                                      <MenuItem key={index} value={element}>
                                        {element}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </div> */}
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
                                    name="monthlyFee"
                                    type="number"
                                    className="form-control form-control-lg"
                                    label="Monthly Fee (Rs.)"
                                    value={gymMonthlyFee}
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
                                    value={gymAnnualFee}
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
                                    value={gymAddress}
                                    onChange={(e) =>
                                      setGymAddress(e.target.value)
                                    }
                                    style={{ backgroundColor: "transparent" }}

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
                                value={gymOwnerComment}
                                onChange={(e) =>
                                  setGymOwnerComment(e.target.value)
                                }
                                style={{ backgroundColor: "transparent" }}
                              />
                            </div>
                            <br />
                            <Button variant="contained" onClick={gymUpdate}>Update</Button>
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
    </>
  );
};
export default GymViewAndUpdateForm;
