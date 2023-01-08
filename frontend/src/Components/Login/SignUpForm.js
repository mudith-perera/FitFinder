///////////////////////////////// Created By Mudith Perera //////////////////////////////

import React,{useEffect} from "react";
import "./SignUpForm.css";
import { MDBInput, MDBTextArea,MDBBtn, MDBCheckbox  } from "mdb-react-ui-kit";

import img1 from "../../Images/SignupInfo.png"
import img2 from "../../Images/SignUpGymInfo.png"

import Aos from "aos";
import "aos/dist/aos.css";

const SignUpForm = () => {
  useEffect(() => {
    Aos.init({ duration: 500});
  });
  return (
    <section data-aos="zoom-in">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12">
            <div
              className="card card-registration card-registration-2"
              style={{ borderRadius: "15px",backgroundColor: "transparent" }}
            >
              <div className="card-body p-0">
                <div className="row g-0 ">
                  <div className="col-lg-6 bg-partone">
                    <div className="p-5">
                      <h3
                        className="fw-normal mb-5"
                        style={{ color: "#2573f8;" }}
                      >
                        General Infomation  &emsp;
                        <img className="img1" src={img1} alt="General Info"/>
                      </h3>
                      

                      <div className="row">
                        <div className="col-md-6 mb-4 pb-2">
                          <div className="form-outline">
                            <MDBInput
                              input
                              type="text"
                              className="form-control form-control-lg"
                              label="First name"
                              
                            />
                          </div>
                        </div>
                        <div className="col-md-6 mb-4 pb-2">
                          <div className="form-outline">
                            <MDBInput
                              input
                              type="text"
                              className="form-control form-control-lg"
                              label="Last name"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-4 pb-2">
                          <div className="form-outline">
                            <MDBInput
                              input
                              type="text"
                              className="form-control form-control-lg"
                              label="Email"
                            />
                          </div>
                        </div>
                        <div className="col-md-6 mb-4 pb-2">
                          <div className="form-outline">
                            <MDBInput
                              input
                              type="text"
                              className="form-control form-control-lg"
                              label="NIC"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-4 pb-2">
                          <div className="form-outline">
                            <MDBInput
                              input
                              type="number"
                              className="form-control form-control-lg"
                              label="Age"
                            />
                          </div>
                        </div>
                        <div className="col-md-6 mb-4 pb-2">
                          <div className="form-outline">
                            <MDBInput
                              input
                              type="text"
                              className="form-control form-control-lg"
                              label="Contact No"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-4 pb-2">
                          <label className="form-label">Gender</label>
                          <select
                            className="form-control"
                            required
                            name="userType"
                          >
                            <option value="student">Male</option>
                            <option value="teacher">Female</option>
                            <option value="regular">Rather not say</option>
                          </select>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12 mb-4 pb-2">
                          <div className="form-outline">
                            <MDBInput
                              input
                              type="text"
                              className="form-control form-control-lg"
                              label="Address"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-4 pb-2">
                          <div className="form-outline">
                            <MDBInput
                              input
                              type="text"
                              className="form-control form-control-lg"
                              label="Town"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>



                  <div className="col-lg-6 bg-parttwo text-white">
                    <div className="p-5">
                      <h3 className="fw-normal mb-5">For Gym Use&emsp;&emsp;
                        <img className="img1" src={img2} alt="General Info"/></h3>
                      <div className="row">
                        <div className="col-md-5 mb-4 pb-2">
                          <div className="form-outline form-white">
                            <MDBInput
                              input
                              type="number"
                              id="formWhite"
                              className="form-control form-control-lg"
                              label="weight (kg)"
                              style={{ backgroundColor: "transparent" }}
                            />
                          </div>
                        </div>
                        <div className="col-md-5 mb-4 pb-2">
                          <div className="form-outline form-white">
                            <MDBInput
                              input
                              type="number"
                              id="formWhite"
                              className="form-control form-control-lg"
                              label="Height (cm)"
                              style={{ backgroundColor: "transparent" }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-5 mb-4 pb-2">
                          <div className="form-outline form-white">
                            <MDBInput
                              input
                              type="number"
                              id="formWhite"
                              className="form-control form-control-lg"
                              label="Fat (%)"
                              style={{ backgroundColor: "transparent" }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-md-5 mb-4 pb-2"></div>
                      <div className="form-outline form-white">
                        <MDBTextArea
                          input
                          type="text"
                          id="formWhite"
                          className="form-control form-control-lg"
                          label="Medical Conditions (Seperated by ',' )"
                          style={{ backgroundColor: "transparent" }}
                        />
                      </div>
                      <br/>
                      <div className="form-check d-flex justify-content-start mb-4 pb-3">
                        <MDBCheckbox input
                        />
                        <label
                          className="form-check-label text-white"
                          for="form2Example3"
                        >
                          I do accept the{" "}
                          <a href="#!" className="text-white">
                            <u>Terms and Conditions</u>
                          </a>{" "}
                          of your site.
                        </label>
                      </div>

                      <MDBBtn button
                        type="submit"
                        outline color='light'
                      >
                        Register
                      </MDBBtn>
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
export default SignUpForm;
