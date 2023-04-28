///////////////////////// Dilini Kariyawasam  ////////////////////////

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import { MDBInput } from "mdb-react-ui-kit";

import Button from "@mui/material/Button";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Aos from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

// import { useCookies } from 'react-cookie';

const PasswordResetReroute = () => {
  const [password, setPassword] = useState("")
  const [confirmPwd, setConfirmPwd] = useState("");
  const [pwsdMatch, setpwsdMatch] = useState("");
  const { token } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);

  console.log("I'm in password reset form");
  console.log(token);

  //Confirm Password Check
  const notifError = () => {
    toast.error("Passwords do not match 😥", {
      theme: "colored",
      position: toast.POSITION.TOP_LEFT,
    });
  };

  //user account create success alert
  const userSuccess = () => {
    toast.success("Password changed successfully 😊👍", {
      theme: "colored",
      position: toast.POSITION.TOP_LEFT,
    });
  };

  //form submit function
  const handleResetPassword = async () => {
    if (password === confirmPwd) {
      setpwsdMatch(true);
    } else {
      setpwsdMatch(false);
      notifError();
    }
    console.log(pwsdMatch);
    console.log(password)

    //pass data to backend to update the password
    const response = await fetch("/api/passwordReset/new-password", {
      method: "POST",
      body: JSON.stringify({
        password,
        token
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      notifError();
      console.log(json.error);
    }

    if (response.ok) {
      userSuccess();
      setPassword("");
      setConfirmPwd("");

      setTimeout(() => {
        navigate("/login");
      }, 3000);
      //window.location.reload(false);
    }



  };

  console.log(password);
  console.log(confirmPwd);
  //console.log(newPassword);

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
                <form onSubmit={handleResetPassword}>
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
                      <Button
                        variant="contained"
                        type="submit"
                        color="success"
                        onClick={() => handleResetPassword()}
                      >
                        Reset MyPassword
                      </Button>
                    </div>
                    <br />

                    <div className="row">
                      <Link to={"/forgot-password-form"}>
                        <Button
                          variant="text"
                        >
                          Forgot password
                        </Button>
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
export default PasswordResetReroute;
