///////////////////////// Developer       : Mudith Perera  /////////////////////////
///////////////////////// Modified Date   : 07-02-2023     /////////////////////////
/////////////////////////           (START)                /////////////////////////

import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import "./SignUpForm.css";
import { MDBInput } from "mdb-react-ui-kit";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Aos from "aos";
import "aos/dist/aos.css";

const SignUpForm = () => {
  useEffect(() => {
    Aos.init({ duration: 500 });
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [pwsdMatch, setpwsdMatch] = useState("");

  //Confirm Password Check
  const notifError = () => {
    toast.error("Passwords do not match 😥", {
      theme: "colored",
      position: toast.POSITION.TOP_LEFT,
    });
  };

  //Form Submit function
  const signUpMember = async (e) => {
    e.preventDefault();
    const formData = { email, password, confirmPwd };
    console.log(formData);

    if (password === confirmPwd) {
      console.log("matched");
      setpwsdMatch(true);
    } else {
      console.log("not matched");
      setpwsdMatch(false);
      notifError();
    }

    console.log(pwsdMatch);
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
    <section data-aos="flip-left" className="vh-800 gradient-custom">
      <ToastContainer />
      <div className="container py-5 h-80">
        <div className="row d-flex justify-content-center align-items-center h-800">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card bg-dark text-white"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body p-3 text-center">
                <form onSubmit={signUpMember}>
                  <div className="mb-md-5 mt-md-4 pb-3">
                    <h2 className="fw-bold mb-2 text-uppercase">Sign Up</h2>
                    <p className="text-white-50 mb-5">
                      Please Enter Below Information
                    </p>
                    <div className="form-outline form-white">
                      <MDBInput
                        name="email"
                        type="email"
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
                    <div className="form-outline form-white">
                      <input type="checkbox" required />
                      <label className="form-check-label text-white">
                        I do accept the{" "}
                        <a href="#!" className="text-white">
                          <u>Terms and Conditions</u>
                        </a>{" "}
                        of your site.
                      </label>
                    </div>
                    <br />
                    {/* <p className="small mb-2 pb-lg-2">
                    <a className="text-white-50" href="#!">
                      Forgot password?
                    </a>
                  </p> */}
                    <Button variant="contained" type="submit">
                      Sign Up
                    </Button>
                    <br />
                    <br />
                    <ButtonGroup>
                      <Link to={"/gym-sign-up"}>
                        <Button>Are you a Gym Owner ?</Button>
                      </Link>
                      <Link to={"/Coach-sign-up"}>
                      <Button>Are you a Coach ?</Button>
                      </Link>
                    </ButtonGroup>
                  </div>
                </form>
                <div>
                  <p className="mb-0">
                    Already have an account?{" "}
                    <a href="/login" className="text-white-50 fw-bold">
                      Login
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
export default SignUpForm;
