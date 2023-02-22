///////////////////////// Dilini Kariyawasam  ////////////////////////

import React, { useEffect, useState } from "react";

import { MDBInput } from "mdb-react-ui-kit";

import Button from "@mui/material/Button";

//import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Aos from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

const ResetPasswordForm = () => {
  useEffect(() => {
    Aos.init({ duration: 500 });
  });

  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  console.log(password + confirmPwd)

  return (
    <section data-aos="flip-left" className="vh-800 gradient-custom">
      {/* <ToastContainer /> */}
      <div className="container py-5 h-80">
        <div className="row d-flex justify-content-center align-items-center h-800">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card bg-dark text-white"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body p-3 text-center">
                <form>
                  <div className="mb-md-5 mt-md-4 pb-3">
                    <h3> Reset your password</h3>
                    <br />
                    <br />
                    <br />
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
                    <br />
                    <br />
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
                    <br />
                    <br />
                    <div className="row">
                      <Button variant="contained" type="submit" color="success">
                        Reset MyPassword
                      </Button>
                    </div>
                    <br />

                    <div className="row">
                      <Link to={"/forgot-password-form"}>
                        <Button variant="text">Forgot password</Button>
                      </Link>
                    </div>
                  </div>
                </form>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ResetPasswordForm;
