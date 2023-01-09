import React, { useEffect } from "react";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";

import Aos from "aos";
import "aos/dist/aos.css";

const SearchBar = () => {

  useEffect(() => {
    Aos.init({ duration: 1000 });
  });

  return (
    <section data-aos="fade-right">
      <div className="container py-5">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-12">
            <div
              className="card card-registration card-registration-2"
              style={{ borderRadius: "15px", backgroundColor: "transparent" }}
            >
              <div className="card-body p-0">
                <div className="row g-0 ">
                  <div className="col-lg-12 bg-partthree">
                    <div className="p-3">
                      <h3 className="fw-normal mb-3">
                      &emsp;Find Your Gym Here... &emsp;
                        {/* <img className="img1" src={img1} alt="General Info" /> */}
                      </h3>

                      <div className="row">
                      <div className="col-md-1 mb-3 pb-2">
                        </div>
                        <div className="col-md-3 mb-3 pb-2">
                          <div className="form-outline">
                            <MDBInput
                              type="text"
                              className="form-control form-control-lg"
                              label="Gym Name"
                            />
                          </div>
                        </div>
                        <div className="col-md-3 mb-3 pb-2">
                          <div className="form-outline">
                            <MDBInput
                              type="text"
                              className="form-control form-control-lg"
                              label="Location"
                            />
                          </div>
                        </div>

                        <div className="col-md-2 pb-2">
                          <select
                            className="form-control"
                            required
                            name="userType"
                          >
                            <option value="regular">Unisex</option>
                            <option value="student">Male</option>
                            <option value="teacher">Female</option>
                          </select>
                        </div>
                        <div className="col-md-3 pb-2">
                          <MDBBtn type="submit">
                            Search
                          </MDBBtn>
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
  );
};
export default SearchBar;
