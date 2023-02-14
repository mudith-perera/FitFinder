///////////////////////// Developer       : Mudith Perera  /////////////////////////
///////////////////////// Modified Date   : 07-02-2023     /////////////////////////
/////////////////////////           (START)                /////////////////////////

import React, { useEffect, useState } from "react";
import "./GymSignUpForm.css";
//import { useNavigate } from "react-router-dom";

import { MDBInput, MDBTextArea } from "mdb-react-ui-kit";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import img1 from "../../Images/gym.png";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";

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
  const [email, setGymOwnerEmail] = useState("");
  const [gymSexType, setGymSexType] = useState("unisex");
  const [gymContactNo1, setGymContactNo1] = useState("");
  const [gymContactNo2, setGymContactNo2] = useState("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState([]);
  const [openingTime, setOpeningTime] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [gymMonthlyFee, setGymMonthlyFee] = useState("");
  const [gymAnnualFee, setGymAnnualFee] = useState("");
  const [gymAddress, setGymAddress] = useState("");
  const [gymOwnerComment, setGymOwnerComment] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");

  const userType = "gym";

  //const navigate = useNavigate();

  //Input field Gym Sex Type validation
  const handleChange = (event) => {
    setGymSexType(event.target.value);
  };

  //user account create success alert
  const userSuccess = (success) => {
    toast.success(success + "😊👍", {
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

  //set images to null
  const removeImages = (e) => {
    setImages([]);
  };
  const imageHandleChange = (e) => {
    console.log(e.target.files);
    if (e.target.files) {
      //converting the image url to blob
      const fileArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );

      setImages((prevImages) => prevImages.concat(fileArray));
      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
    }
  };

  //Form Submit function
  const signUpGym = async (e) => {
    e.preventDefault();
    const formDataGym = {
      gymName,
      gymOwnerName,
      email,
      gymSexType,
      gymContactNo1,
      gymContactNo2,
      location,
      openingTime,
      closingTime,
      gymMonthlyFee,
      gymAnnualFee,
      gymAddress,
      gymOwnerComment,
      password,
    };

    const formDataUser = {
      email,
      password,
      userType,
    };

    if (password === confirmPwd) {
      console.log("matched");
      setpwsdMatch(true);

      //sending data to the backend
      const responseGym = await fetch("/api/gyms", {
        method: "POST",
        body: JSON.stringify(formDataGym),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseUser = await fetch("/api/users",{
        method: "POST",
        body: JSON.stringify(formDataUser),
        headers: {
          "Content-Type": "application/json",
        },
      });


      const jsonGym = await responseGym.json();
      const jsonUser = await responseUser.json();

      if(!responseUser.ok){
        userError(jsonUser.message);
      }
      if (responseUser.ok) {
        userSuccess("User Account Created");
      }


      if (!responseGym.ok) {
        userError(jsonGym.message);
        //console.log(json.error);
      }
      if (responseGym.ok) {
        userSuccess("Gym Registration Request Send");
      }
    } else {
      console.log("passwords not matched");
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
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6 mb-4 pb-2">
                            <div className="form-outline">
                              <MDBInput
                                name="email"
                                type="email"
                                className="form-control form-control-lg"
                                label="Gym Owner's Email"
                                onChange={(e) =>
                                  setGymOwnerEmail(e.target.value)
                                }
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
                                sx={{ m: 1, minWidth: 150 }}
                                size="small"
                                labelId="labelLocation"
                                id="demo-select-small"
                                value={location}
                                label="Gym Sex Type"
                                onChange={(e) => setLocation(e.target.value)}
                              >
                                {locations.map((element, index) => (
                                  <MenuItem key={index} value={element}>
                                    {element}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </div>
                          <div className="col-md-6 mb-4 pb-2">
                            <div className="drop-container">
                              <input
                                type="file"
                                multiple
                                id="file"
                                onChange={imageHandleChange}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12 mb-4 pb-2">
                            <img
                              className="p-1"
                              src={images[0]}
                              alt=""
                              width="100"
                              height="70"
                            />
                            <img
                              className="p-1"
                              src={images[1]}
                              alt=""
                              width="100"
                              height="70"
                            />
                            <img
                              className="p-1"
                              src={images[2]}
                              alt=""
                              width="100"
                              height="70"
                            />
                            <img
                              className="p-1"
                              src={images[3]}
                              alt=""
                              width="100"
                              height="70"
                            />
                            <img
                              className="p-1"
                              src={images[4]}
                              alt=""
                              width="100"
                              height="70"
                            />
                          </div>
                          <div className="col-md-12 mb-4 pb-2">
                            <Button
                              variant="contained"
                              color="error"
                              endIcon={<DeleteIcon />}
                              onClick={removeImages}
                            >
                              Discard Images
                            </Button>
                          </div>
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
                                name="openingTime"
                                type="time"
                                onChange={(e) => setOpeningTime(e.target.value)}
                                className="form-control form-control-lg"
                                label="Opeing Time"
                                style={{ backgroundColor: "transparent" }}
                              />
                            </div>
                          </div>
                          <div className="col-md-5 mb-4 pb-2">
                            <div className="form-outline form-white">
                              <MDBInput
                                name="closingTime"
                                type="time"
                                onChange={(e) => setClosingTime(e.target.value)}
                                className="form-control form-control-lg"
                                label="Closing Time"
                                style={{ backgroundColor: "transparent" }}
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
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12 mb-4 pb-2">
                            <div className="form-outline form-white">
                              <MDBTextArea
                                name="ownerComment"
                                type="text"
                                className="form-control form-control-lg"
                                label="Owner's Comment"
                                onChange={(e) =>
                                  setGymOwnerComment(e.target.value)
                                }
                                style={{ backgroundColor: "transparent" }}
                              />
                            </div>
                          </div>
                        </div>
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
                              />
                            </div>
                          </div>
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