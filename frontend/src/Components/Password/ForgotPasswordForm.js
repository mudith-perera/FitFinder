///////////////////////// Dilini Kariyawasam  ////////////////////////

import React, { useEffect, useState } from "react";
import { MDBInput } from "mdb-react-ui-kit";
import Button from "@mui/material/Button";
//import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Aos from "aos";
import "aos/dist/aos.css";

const ForgotPasswordForm = () => {
  useEffect(() => {
    Aos.init({ duration: 500 });
  });
//on Success
// const notifError = () => {
//   toast.error("Passwords do not match 😥", {
//     theme: "colored",
//     position: toast.POSITION.TOP_LEFT,
//   });
// };

//On Error
// const notifSuccess = () => {
//   toast.success("User Successfully Added 😊👍", {
//     theme: "colored",
//     position: toast.POSITION.TOP_LEFT,
//   });
// };
  
  const [email, setEmail] = useState("");
  console.log(email);
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
                <form >
                  <div className="mb-md-5 mt-md-4 pb-3">
                  <h3> Enter your email to reset your password</h3>
                    <br />
                    <br/>
                    <br/>
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
                    <br/>
                    
                    <br />
                    <br/>

                      
                          
                        
                      

                        <div className="row">
                          <Button variant="contained" type="submit" color="success">
                              Reset MyPassword
                          </Button>
                        </div>
                      </div>
                </form>
                <div>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ForgotPasswordForm;