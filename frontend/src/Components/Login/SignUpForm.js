///////////////////////// Developer       : Mudith Perera  /////////////////////////
///////////////////////// Modified Date   : 07-02-2023     /////////////////////////
/////////////////////////           (START)                /////////////////////////

import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
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
  const [confirmPwd, setConfirmPwd] = useState("");
  const [pwsdMatch, setpwsdMatch] = useState("");
  const [cookie, setCookie, removeCookie] = useCookies([""]);

  const navigate = useNavigate();

  async function handleCallbackResponse(response) {
    //console.log("Encoded JWT ID token : " + response.credential);
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
      ];

      setCookieAndNavigate(loggedUserDetails);
    }
  }

  //Confirm Password Check
  const notifError = () => {
    toast.error("Passwords do not match 😥", {
      theme: "colored",
      position: toast.POSITION.TOP_LEFT,
    });
  };

  //user account create success alert
  const userSuccess = () => {
    toast.success("User Successfully Added 😊👍", {
      theme: "colored",
      position: toast.POSITION.TOP_LEFT,
    });
  };

  //user account create error alert
  const userError = (error) => {
    toast.error("😢 " + error, {
      theme: "colored",
      position: toast.POSITION.TOP_LEFT,
    });
  };

  //Form Submit function
  const signUpMember = async (e) => {
    //Stopping the default action of refreshing the page
    e.preventDefault();
    const formData = { email, password };

    if (password === confirmPwd) {
      setpwsdMatch(true);
    } else {
      setpwsdMatch(false);
      notifError();
    }
    console.log(pwsdMatch);

    //Sends data to backend
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      userError(json.error);
      console.log(json.error);
    }
    if (response.ok) {
      userSuccess();
      setEmail("");
      setPassword("");
      setConfirmPwd("");
      console.log("new user added", json);

      setTimeout(() => {
        navigate("/login");
      }, 3000);
      //window.location.reload(false);
    }
  };

  function setCookieAndNavigate(loggedUserDetails) {
    console.log(loggedUserDetails);
    setCookie("LoggedUser", loggedUserDetails, { path: "/" });
    console.log(cookie);

    if (loggedUserDetails[0] === "member") {
      navigate("/member-home");
    } else if (loggedUserDetails[0] === "gym") {
      navigate("/gym-home");
    } else if (loggedUserDetails[0] === "coach") {
      navigate("/coach-home");
    } else if (loggedUserDetails[0] === "admin") {
      navigate("/admin-home");
    }
  }

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
                  <div className="mb-md-1 mt-md-4 pb-3">
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
                    <Button variant="contained" type="submit">
                      Sign Up
                    </Button>
                  </div>
                </form>
                <p className="large mt-md">Or</p>
                <div
                  id="signInDiv"
                  style={{
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                ></div>
                <br />
                <ButtonGroup>
                  <Link to={"/gym-sign-up"}>
                    <Button>Are you a Gym Owner ?</Button>
                  </Link>
                  <Link to={"/Coach-sign-up"}>
                    <Button>Are you a Coach ?</Button>
                  </Link>
                </ButtonGroup>
                <div>
                  <p className="mb-3 mt-2">
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
