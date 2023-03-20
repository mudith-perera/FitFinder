import React, { useEffect, useState } from "react";
//import { useCookies } from "react-cookie";
//import { useNavigate } from "react-router-dom";
//import JWT from "jwt-decode";

//import { MDBInput } from "mdb-react-ui-kit";
//import Button from "@mui/material/Button";
//import Box from "@mui/material/Box";

import Aos from "aos";
import "aos/dist/aos.css";

//import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SideNavbar from "../Shared/SideNavbar.js";
import PayButton from "./PayButton.jsx";

import { useCookies } from "react-cookie";

const MemberPayment = () => {
  useEffect(() => {
    //removing the current cookie when page loads
    Aos.init({ duration: 1000 });
  });

  const [cookie] = useCookies([""]);
  const [username] = useState(
    cookie.LoggedUser[2] + " " + cookie.LoggedUser[3]
  );
  const [useremail] = useState(cookie.LoggedUser[4]);
  const monthlyFee = useState(cookie.LoggedUser[6].gymMonthlyFee);
  const annualFee = useState(cookie.LoggedUser[6].gymAnnualFee);
  
  return (
    <div>
      <div style={{ position: "fixed", zIndex: "1" }}>
        <SideNavbar userRole="member" />
      </div>
      <section data-aos="flip-right" className="vh-800 gradient-custom">
        {/* <ToastContainer /> */}
        <div className="container py-5 h-80">
          <div className="row d-flex justify-content-center align-items-center h-800">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card bg-dark text-white"
                style={{ borderRadius: "1rem" }}
              >
                <div className="card-body p-3 text-center">
                  <div className="mb-md-2 mt-md-4 pb-2">
                    <h2 className="fw-bold mb-2 text-uppercase">
                      Payment Checkout
                    </h2>
                    <p className="text-white-50 mb-5">
                      Please Select a Payment Option below
                    </p>
                  </div>
                  <div>
                    <p>Pay Monthly Rs : {monthlyFee}</p>
                    <PayButton
                      username={username}
                      useremail={useremail}
                      fee={monthlyFee}
                    />
                  </div>
                  <div>
                    <p>Pay Annualy Rs : {annualFee}</p>
                    <PayButton
                      username={username}
                      useremail={useremail}
                      fee={annualFee}
                    />
                  </div>

                  <div
                    id="signInDiv"
                    style={{
                      textAlign: "center",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  ></div>
                  <div>
                    <p className="mb-2 mt-md-5">
                      Don't have an Stripe account?{" "}
                      <a
                        href="https://stripe.com/"
                        className="text-white-50 fw-bold"
                      >
                        Goto Stripes
                      </a>
                    </p>
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

export default MemberPayment;
