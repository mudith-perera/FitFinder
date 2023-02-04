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
import Button from '@mui/material/Button';

import img1 from "../../Images/SignupInfo.png";

import Aos from "aos";
import "aos/dist/aos.css";

const GymSignUpForm = () => {
  useEffect(() => {
    Aos.init({ duration: 500 });
  });

  //Input field Gym Sex Type validation
  const [gender, setGender] = useState("unisex");
  const handleChange = (event) => {
    setGender(event.target.value);
  };

  //Input field location
  const [options, setOptions] = useState(["Kelaniya", "Mathara", "Colombo"]);

  return (
    <section data-aos="zoom-in">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12">
            <div
              className="card card-registration card-registration-2"
              style={{ borderRadius: "15px", backgroundColor: "transparent" }}
            >
              <div className="card-body p-0">
                <div className="row g-0 ">
                  <div className="col-lg-6 bg-partone">
                    <div className="p-5">
                      <h3 className="fw-normal mb-5">
                        Reqest Gym Registration&emsp;
                        <img className="img1" src={img1} alt="General Info" />
                      </h3>

                      <div className="row">
                        <div className="col-md-6 mb-4 pb-2">
                          <div className="form-outline">
                            <MDBInput
                              type="text"
                              className="form-control form-control-lg"
                              label="Gym Name"
                            />
                          </div>
                        </div>
                        <div className="col-md-6 mb-4 pb-2">
                          <div className="form-outline">
                            <MDBInput
                              type="text"
                              className="form-control form-control-lg"
                              label="Gym Owner's Name"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-4 pb-2">
                          <div className="form-outline">
                            <MDBInput
                              type="email"
                              className="form-control form-control-lg"
                              label="Gym Owner's Email"
                            />
                          </div>
                        </div>
                        <div className="col-md-6 mb-4 pb-2">
                          <FormControl>
                            <InputLabel id="lableGender">
                              Gym Sex Type
                            </InputLabel>
                            <Select
                              sx={{ m: 1, minWidth: 150 }}
                              size="small"
                              labelId="lableGender"
                              id="demo-select-small"
                              value={gender}
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
                              type="text"
                              className="form-control form-control-lg"
                              label="Contact No 1"
                            />
                          </div>
                        </div>
                        <div className="col-md-6 mb-4 pb-2">
                          <div className="form-outline">
                            <MDBInput
                              type="text"
                              className="form-control form-control-lg"
                              label="Contact No 2"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-4 pb-2">
                          <FormControl>
                            <InputLabel id="labelLocation">Location</InputLabel>
                            <Select
                              sx={{ m: 1, minWidth: 150 }}
                              size="small"
                              labelId="labelLocation"
                              id="demo-select-small"
                              //value={gender}
                              label="Gym Sex Type"
                            >
                              {options.map((element, index) => (
                                <MenuItem value={index}>{element}</MenuItem>
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
                              type="number"
                              className="form-control form-control-lg"
                              label="Monthly Fee (Rs.)"
                              min="20"
                              style={{ backgroundColor: "transparent" }}
                            />
                          </div>
                        </div>
                        <div className="col-md-5 mb-4 pb-2">
                          <div className="form-outline form-white">
                            <MDBInput
                              type="number"
                              className="form-control form-control-lg"
                              label="Annual Fee (Rs.)"
                              style={{ backgroundColor: "transparent" }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12 mb-4 pb-2">
                          <div className="form-outline form-white">
                            <MDBInput
                              type="text"
                              className="form-control form-control-lg"
                              label="Address"
                              style={{ backgroundColor: "transparent" }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form-outline form-white">
                        <MDBTextArea
                          type="text"
                          className="form-control form-control-lg"
                          label="Owner's Comment"
                          style={{ backgroundColor: "transparent" }}
                        />
                      </div>
                      <br />

                      <Stack direction="row" spacing={2}>
                        <Button variant="contained" endIcon={<SendIcon />}>
                          Request
                        </Button>
                      </Stack>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default GymSignUpForm;
