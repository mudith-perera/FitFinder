///////////////////////// Dilini Kariyawasam  ////////////////////////

import React, { useEffect, useState } from "react";
import { MDBInput } from "mdb-react-ui-kit";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Aos from "aos";
import "aos/dist/aos.css";

//import { useNavigate } from 'react-router-dom'

const ForgotPasswordForm = () => {
  //const navigate = useNavigate();

  useEffect(() => {
    Aos.init({ duration: 500 });
  });

  //On Success
  const notifSuccess = () => {
    toast.success("Email sent successfully 😊👍", {
      theme: "colored",
      position: toast.POSITION.TOP_LEFT,
    });
  };

  //On Error 
  const userError = (error) => {
    toast.error(error + " 😢", {
      theme: "colored",
      position: toast.POSITION.TOP_LEFT,
    });
  };

  const [email, setEmail] = useState("");

  //get data from backend
  const handleSubmit = () => {
    // make an API call to the backend to submit the email address
    fetch("/api/passwordReset/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        // handle the response from the backend API call
        if (data.message === "success") {
          notifSuccess();
        }else {
          userError(data.message);
        }
      })
      .catch((error) => {
        userError("Server Error");
      });
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    // Call the notifSuccess() method here
    // Add your password reset logic here
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
                <form onSubmit={handleResetPassword}>
                  <div className="mb-md-5 mt-md-4 pb-3">
                    <h3> Enter your email to reset your password</h3>
                    <br />
                    <br />
                    <br />
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
                    <br />
                    <br />
                    <br />
                    <div className="row">
                      <Button
                        variant="contained"
                        type="submit"
                        color="success"
                        onClick={() => handleSubmit()}
                      >
                        Reset My Password
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ForgotPasswordForm;