///////////////////////////////// Created By Mudith Perera //////////////////////////////

import React, { useEffect, useState } from "react";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";

import Aos from "aos";
import "aos/dist/aos.css";

const LoginForm = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    const formData = { email, password };
    console.log(formData);

    // try {
    //   const res = await axios.post('http://127.0.0.1:8000/api/add-users',formData);

    //   if (res.data.status === 200)
    //     {
    //       console.log(res.data.message);
    //       notifSuccess();//Load toastify Alert

    //       setTimeout(() => {
    //         navigate("/login");
    //       }, 3000);

    //     }
    // } catch (err) {
    //     notifError();
    // }
  };

  return (
    <section data-aos="flip-right" className="vh-800 gradient-custom">
      <div className="container py-5 h-80">
        <div className="row d-flex justify-content-center align-items-center h-800">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card bg-dark text-white"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body p-3 text-center">
                <form onSubmit={loginUser}>
                  <div className="mb-md-5 mt-md-4 pb-3">
                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                    <p className="text-white-50 mb-5">
                      Please enter your login and password!
                    </p>

                    <div className="form-outline form-white">
                      <MDBInput
                        type="email"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control form-control-lg"
                        label="Email"
                        style={{ backgroundColor: "transparent" }}
                        required
                      />
                    </div>
                    <br />
                    <div className="form-outline form-white">
                      <MDBInput
                        type="password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control form-control-lg"
                        label="Password"
                        style={{ backgroundColor: "transparent" }}
                        required
                      />
                    </div>

                    <p className="small mb-2 pb-lg-2">
                      <a className="text-white-50" href="#!">
                        Forgot password?
                      </a>
                    </p>

                    <MDBBtn type="submit">Login</MDBBtn>
                  </div>
                </form>
                <div>
                  <p className="mb-0">
                    Don't have an account?{" "}
                    <a href="/sign-up" className="text-white-50 fw-bold">
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
