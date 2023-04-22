///////////////////////// Dilini Kariyawasam  ////////////////////////

import React, { useEffect, useState } from "react";

import { MDBInput } from "mdb-react-ui-kit";

import Button from "@mui/material/Button";

//import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Aos from "aos";
import "aos/dist/aos.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPasswordForm = (props) => {
  useEffect(() => {
    Aos.init({ duration: 500 });
  });

  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  console.log(confirmPwd)

  //success alert
  const userSuccess = () => {
    toast.success("Update Success 😊", {
      theme: "colored",
      position: toast.POSITION.TOP_LEFT,
    });
  };

  //error alert
  const userError = (error) => {
    toast.error("😢 " + error, {
      theme: "colored",
      position: toast.POSITION.TOP_LEFT,
    });
  }

  const updatePassword = async (e) => {
    e.preventDefault();
    const formData = {
      password,
    };

    //user validation backend
    const response = await fetch("/api/users/updatePassword/" + props.userId, {
      method: "PATCH",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    console.log(json);
    if (!response.ok) {
      userError(json.error);
    }
    if (response.ok) {
      userSuccess();
    }
  };

  return (
    <>
      <ToastContainer />
      <div
        className="card bg-dark text-white"
        style={{width: '500px', margin: "0 auto" }}
      >
        <div className="card-body p-3 text-center" >
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
                  label="New Password"
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
                  label="Confirm new Password"
                  style={{ backgroundColor: "transparent" }}
                  required
                />
              </div>
              <br />
              <br />
              <div className="row">
                <Button variant="contained" type="submit" color="success" onClick={updatePassword}>
                  Reset MyPassword
                </Button>
              </div>
              <br />
            </div>
          </form>
          <div></div>
        </div>
      </div>
    </>
  );
};
export default ResetPasswordForm;
