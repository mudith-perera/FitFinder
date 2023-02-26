///////////////////////// Developer       : Mudith Perera  /////////////////////////
///////////////////////// Modified Date   : 07-02-2023     /////////////////////////
/////////////////////////           (START)                /////////////////////////

import React, { useEffect } from "react";
import "./MemberViewAndUpdateForm.css";
import { MDBInput, MDBTextArea, MDBBtn } from "mdb-react-ui-kit";

import SideNavbar from "../Shared/SideNavbar.js";

import img1 from "../../Images/SignupInfo.png";
import img2 from "../../Images/SignUpGymInfo.png";

import Aos from "aos";
import "aos/dist/aos.css";

const MemberViewAndUpdateForm = () => {
  useEffect(() => {
    Aos.init({ duration: 500 });
  });
  return (
    <div>
      <div style={{ position: "fixed" , zIndex: "1"}}>
        <SideNavbar userRole="member" />
      </div>
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
                          General Infomation &emsp;
                          <img className="img1" src={img1} alt="General Info" />
                        </h3>

                        <div className="row">
                          <div className="col-md-6 mb-4 pb-2">
                            <div className="form-outline">
                              <MDBInput
                                type="text"
                                className="form-control form-control-lg"
                                label="First name"
                              />
                            </div>
                          </div>
                          <div className="col-md-6 mb-4 pb-2">
                            <div className="form-outline">
                              <MDBInput
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
                                type="text"
                                className="form-control form-control-lg"
                                label="Email"
                              />
                            </div>
                          </div>
                          <div className="col-md-6 mb-4 pb-2">
                            <div className="form-outline">
                              <MDBInput
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
                                type="number"
                                className="form-control form-control-lg"
                                label="Age"
                                min="12"
                                max="100"
                              />
                            </div>
                          </div>
                          <div className="col-md-6 mb-4 pb-2">
                            <div className="form-outline">
                              <MDBInput
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
                        <h3 className="fw-normal mb-5">
                          For Gym Use&emsp;&emsp;
                          <img className="img1" src={img2} alt="General Info" />
                        </h3>
                        <div className="row">
                          <div className="col-md-5 mb-4 pb-2">
                            <div className="form-outline form-white">
                              <MDBInput
                                type="number"
                                className="form-control form-control-lg"
                                label="weight (kg)"
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
                                type="number"
                                className="form-control form-control-lg"
                                label="Fat (%)"
                                min="1"
                                max="100"
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
                          />
                        </div>
                        <br />

                        <MDBBtn type="submit" outline color="light">
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
    </div>
  );
};
export default MemberViewAndUpdateForm;
