/////////////////////////  Modified Date   : 02-26-2023                       ///////
/////////////////////////  Description     : Stripe (Payment Gateway)         ///////
/////////////////////////  Developer       : Mudith Perera                    ///////

//Create routes using express package
const express = require("express");

//Importing the stripe library
const Stripe = require("stripe");

//get .env package
require("dotenv").config();
const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });

//Setting the Security key to the stripe
const stripe = Stripe(process.env.STRIPE_KEY)

//
const router = express.Router();

router.post("/create-checkout-session", async (req, res) => {
  const { username, fee, email } = req.body;
  //const intFee = parseInt(fee)/345;
  //creating a checkout session
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: email,
            //email: email,
          },
          unit_amount: parseInt(fee),
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    //success_url:"http://yoursite.com/order/success?session_id={CHECKOUT_SESSION_ID}"
    cancel_url: `${process.env.CLIENT_URL}/member-home/member-payment`,
  });

  //res.send({url: session.url});
  return res.status(200).json({ message: session.url });
});


module.exports = router;