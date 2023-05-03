import React, { useEffect } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { useNavigate } from "react-router-dom";

import Aos from "aos";
import "aos/dist/aos.css";

//import { useCookies } from "react-cookie";

import imgPayment from "../../Images/payment.png";

const PaymentSuccess = () => {
  useEffect(() => {
    //removing the current cookie when page loads
    Aos.init({ duration: 1000 });
  });
  //const [cookie] = useCookies([""]);
  // const [username] = useState(
  //   cookie.LoggedUser[2] + " " + cookie.LoggedUser[3]
  // );
  const navigate = useNavigate();

  function gotoHome() {
    navigate("/member-home");
  }
  return (
    <section data-aos="fade-right" className="vh-800 gradient-custom">
      <div className="container py-5 h-80">
        <div className="row d-flex justify-content-center align-items-center h-600">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-white" style={{ borderRadius: "1rem" }}>
              <div className="card-body p-3 text-center">
                <div className="mb-md-2 mt-md-4 pb-2">
                  <h2 className="fw-bold mb-2 text-uppercase">
                    Payment Successful👍
                  </h2>
                  <p className="text-dark-50 mb-3">
                    Please check your <a href="https://dashboard.stripe.com/login">Stripe account </a> 😊
                  </p>


                  <div className="form-outline form-white">
                    <img src={imgPayment} alt="success" height="250px" />
                  </div>
                  <br />

                  <Box sx={{ "& button": { m: 1 } }}>
                    <Button
                      size="large"
                      variant="contained"
                      type="submit"
                      onClick={gotoHome}
                    >
                      Go Back to Home
                    </Button>
                  </Box>
                </div>

                <p className="large text-white-50">Or</p>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentSuccess;
