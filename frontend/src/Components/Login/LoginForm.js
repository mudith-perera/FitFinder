///////////////////////// Developer       : Mudith Perera  /////////////////////////
///////////////////////// Modified Date   : 07-02-2023     /////////////////////////
/////////////////////////           (START)                /////////////////////////

import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import { MDBInput } from "mdb-react-ui-kit";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import Aos from "aos";
import "aos/dist/aos.css";
import "./GoogleButton.css";
import googlepng from "../../Images/google.png";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  useEffect(() => {
    //removing the current cookie when page loads
    removeCookie("LoggedUser");
    Aos.init({ duration: 1000 });
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookie, setCookie, removeCookie] = useCookies([""]);

  const navigate = useNavigate();

  //user login error
  const userError = (error) => {
    toast.error(error + " 😢", {
      theme: "colored",
      position: toast.POSITION.TOP_LEFT,
    });
  };

  const loginUser = async (e) => {
    e.preventDefault();
    const formData = { email, password };

    //user validation backend
    const response = await fetch("/api/users/getUserEmailPwd/", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      userError(json.message);
      console.log(json.error);
    }
    if (response.ok) {
      console.log("User Logged in");
      console.log(json["activeStatus"]);
      const loggedUserDetails = [
        json["activeStatus"],
        json["email"],
        json["updatedAt"],
        json["createdAt"],
        json["userType"],
        json["_id"],
      ];
      setCookie("LoggedUser", loggedUserDetails, { path: "/" });
      console.log(cookie);

      if (json["userType"] === "member") {
        navigate("/member-home");
      } else if (json["userType"] === "gym") {
        navigate("/gym-home");
      } else if (json["userType"] === "coach") {
        navigate("/coach-home");
      } else if (json["userType"] === "admin") {
        navigate("/admin-home");
      }
      //window.location.reload(false);
    }
  };

  return (
    <section data-aos="flip-right" className="vh-800 gradient-custom">
      <ToastContainer />
      <div className="container py-5 h-80">
        <div className="row d-flex justify-content-center align-items-center h-800">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card bg-dark text-white"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body p-3 text-center">
                <form onSubmit={loginUser}>
                  <div className="mb-md-2 mt-md-4 pb-2">
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
                    <Box sx={{ "& button": { m: 1 } }}>
                      <Button size="large" variant="contained" type="submit">
                        Login
                      </Button>
                    </Box>
                  </div>
                </form>
                <p className="large text-white-50">Or</p>
                <div className="googleButton mt-md-2 mb-2">
                  <button className="google-sign-up">
                    <img
                      className="google-image"
                      src={googlepng}
                      alt="google"
                    />{" "}
                    <span> &nbsp;&nbsp; </span>
                    Sign Up with Google
                  </button>
                </div>

                <div>
                  <p className="mb-2 mt-md-5">
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
