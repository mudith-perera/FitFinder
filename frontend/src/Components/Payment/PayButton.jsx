///////////////////////// Developer       : Mudith Perera  /////////////////////////
///////////////////////// Modified Date   : 07-03-2023     /////////////////////////
/////////////////////////           (START)                /////////////////////////

import React, { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import axios from "axios";

const PayButton = (props) => {
  const [gymEmail] = useState(props.gymEmail);
  const [username] = useState(props.username);
  const [email] = useState(props.useremail);
  const [rate, setRate] = useState(null);

  useEffect(() => {
    //getting the current exchange rate of USD and LKR using (https://openexchangerates.org/) api
    axios
      .get(
        `https://openexchangerates.org/api/latest.json?app_id=cca9199d347f40e0ac861e9d4f7b6e3d&symbols=USD,LKR`
      )
      .then((response) => {
        const rate = response.data.rates.LKR / response.data.rates.USD;
        setRate(rate);
      })
      .catch((error) => console.log(error));
  }, []);
  const [fee, setFee] = useState(0);
  useEffect(() => {
    if (rate && !isNaN(rate) && rate !== 0) {
      const fee = (parseInt(props.fee) / rate) * 100;
      setFee(fee);
    } else {
      setFee(0);
      console.log("Exchange rate is not available");
    }
  }, [props.fee, rate]);
  //const [fee] = useState((parseInt(props.fee)/rate)*100);

  const handleCheckout = async (e) => {
    e.preventDefault();
    const formData = { gymEmail, username, fee, email };
    console.log(fee);
    console.log(rate);
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
