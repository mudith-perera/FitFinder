import React, { useState } from "react";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const PayButton = (props) => {
  const [username] = useState(props.username);
  const [fee] = useState(props.fee);
  const [email] = useState(props.useremail);


  const handleCheckout = async (e) => {
    e.preventDefault();
    const formData = { username, fee, email };
    const response = await fetch("/api/stripe/create-checkout-session/", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (response.ok) {
      window.location.href = json.message;
      //navigate(json.message);
      console.log(json.message);
    } else {
      console.log("error");
    }
  };
  return (
    <>
      <Box sx={{ "& button": { m: 1 } }}>
        <Button
          size="large"
          variant="contained"
          type="submit"
          onClick={handleCheckout}
        >
          Pay
        </Button>
      </Box>
    </>
  );
};

export default PayButton;
