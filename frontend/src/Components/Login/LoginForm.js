///////////////////////////////// Created By Mudith Perera //////////////////////////////

import React,{useEffect} from "react";
import "./LoginFormTextBox.css";

import Aos from "aos";
import "aos/dist/aos.css";

const LoginForm = () => {
  useEffect(() => {
    Aos.init({ duration: 1000});
  });
  return (

    <section  data-aos="zoom-in-up" className="vh-100 gradient-custom">
      <div className="container py-5 h-80">
        <div className="row d-flex justify-content-center align-items-center h-800">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card bg-dark text-white"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body p-3 text-center">
                <div className="mb-md-5 mt-md-4 pb-3">
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">
                    Please enter your login and password!
                  </p>

                  <div className="group form-control form-control-sm">
                    <input className="inputLogin" type="email" required />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label className="labelLogin" >Email</label>
                  </div>

                  <div className="group form-control form-control-sm">
                    <input className="inputLogin" type="password" required />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label className="labelLogin" >Password</label>
                  </div>

                  <p className="small mb-2 pb-lg-2">
                    <a className="text-white-50" href="#!">
                      Forgot password?
                    </a>
                  </p>

                  <button
                    className="btn btn-outline-light btn-lg px-5"
                    type="submit"
                  >
                    Login
                  </button>
                </div>

                <div>
                  <p className="mb-0">
                    Don't have an account?{" "}
                    <a href="#!" className="text-white-50 fw-bold">
                      Sign Up
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default LoginForm;
