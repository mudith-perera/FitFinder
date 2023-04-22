///////////////////////// Developer       : Mudith Perera  /////////////////////////
///////////////////////// Modified Date   : 07-02-2023     /////////////////////////
/////////////////////////              (START)             /////////////////////////

import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
//import JWT from "jwt-decode";

import { MDBInput } from "mdb-react-ui-kit";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import Aos from "aos";
import "aos/dist/aos.css";
import "./GoogleButton.css";
//import googlepng from "../../Images/google.png";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  useEffect(() => {
    //removing the current cookie when page loads
    removeCookie("LoggedUser");
    Aos.init({ duration: 1000 });

    /* global google */
    google.accounts.id.initialize({
      client_id:
        "338037268448-96oj399dqcc7l8a5ie31ke0t6fb8r6ut.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "light",
      size: "large",
      longtitle: "google",
    });
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
  async function handleCallbackResponse(response) {
    var token = response.credential;
    const responseGoogle = await fetch("api/users/googleSignInUp/", {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const googleJson = await responseGoogle.json();
    if (!responseGoogle.ok) {
      userError(googleJson.message);
    } else {
      const loggedUserDetails = [
        googleJson["userType"],
        googleJson["activeStatus"],
        googleJson["firstname"],
        googleJson["lastname"],
        googleJson["email"],
        googleJson["_id"],
        googleJson["registeredGym"],
        googleJson["registeredGymActivateStatus"],
      ];

      setCookieAndNavigate(loggedUserDetails);
    }
  }

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
    }
    if (response.ok) {
      const loggedUserDetails = [
        json["userType"],
        json["activeStatus"],
        json["firstname"],
        json["lastname"],
        json["email"],
        json["_id"],
        json["registeredGym"],
        json["registeredGymActivateStatus"],
      ];

      setCookieAndNavigate(loggedUserDetails);
    }
  };

  function setCookieAndNavigate(loggedUserDetails) {
    setCookie("LoggedUser", loggedUserDetails, { path: "/" });

    if (loggedUserDetails[0] === "member") {
      navigate("/member-home");
    } else if (loggedUserDetails[0] === "gym") {
      navigate("/gym-home");
    } else if (loggedUserDetails[0] === "coach") {
      navigate("/coach-home");
    } else if (loggedUserDetails[0] === "admin") {
      navigate("/admin-home");
    }
  };
console.log(cookie);
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
                      <a className="text-white-50" href="/forgot-password">
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
