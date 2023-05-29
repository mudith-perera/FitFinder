/////////////////////////  Modified Date   : 02-26-2023                       ///////
/////////////////////////  Description     : Stripe (Payment Gateway)         ///////
/////////////////////////  Developer       : Mudith Perera                    ///////

//Create routes using express package
const express = require("express");

//Importing the stripe library
const Stripe = require("stripe");

const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')

//get .env package
require("dotenv").config();
const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });

//Setting the Security key to the stripe
const stripe = Stripe(process.env.STRIPE_KEY)

//
const router = express.Router();

const fs = require('fs')

// Read the image file
const headerImage = fs.readFileSync('D:/Documents/Studies/UOR/3rd Year/Sem 01/Group Project - CSC3113/FitFinder/frontend/src/Images/fitfindertext.png'); // Read the content of the image file
const footerImage = fs.readFileSync('D:/Documents/Studies/UOR/3rd Year/Sem 01/Group Project - CSC3113/FitFinder/frontend/src/Images/logo.png'); // Read the content of the image file

const transporter = nodemailer.createTransport(sendgridTransport({
  auth: {
    //api_key: "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"
    api_key: process.env.SENDGRID_API

  }
}))

router.post("/create-checkout-session", async (req, res) => {
  const { gymEmail, username, fee, email } = req.body;
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
    success_url: `${process.env.CLIENT_URL}/checkout-success?gymEmail=${encodeURIComponent(gymEmail)}&username=${username}&fee=${fee}&email=${encodeURIComponent(email)}`,
    cancel_url: `${process.env.CLIENT_URL}/member-home/member-payment`,
  });

  return res.status(200).json({ message: session.url });
});

router.post("/send-payment-email", async (req, res) => {
  const { gymEmail, username, fee, email } = req.body;
  const fixedEmailAddress = 'fitfinder.uor@gmail.com';

  const originalNumber = fee;
  const roundedNumber = parseFloat((originalNumber / 100).toFixed(2));


  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Payment Receipt</title>
  </head>
  <body style="display:flex">
      <div style="background: #3B3D35;width:120px">
          
      </div>
      
  <div style="background: black;color: white;width: 600px; height: 400px;padding: 30px">
  <div style="display: flex; justify-content: center;">
  
  <img src="cid:fitfindertext" alt="name" width="50%" height="20%" >
  
  </div>
  <table class="body" role="presentation" border="0" cellpadding="0" cellspacing="0">
    <tbody>
      <tr>
        <td></td>
        <td class="container">
          <div class="content">
            <!-- START CENTERED WHITE CONTAINER-->
            <table class="main" role="presentation">
              <!-- START MAIN AREA-->
              <tbody>
                <tr>
                  <td class="wrapper">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                      <tbody>
                        <tr>
                          <td>
                            <!-- CONTENT-->
                            <p>Hello Admin,</p>
                            <p>${username} : ${email} has successfully made a payment of USD ${roundedNumber} to ${gymEmail}</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- START FOOTER-->
            <div class="footer">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                <tbody>
                  <tr>
                    <td style="transform: translateY(10px);" class="content-block">
                    <span class="apple-link" ">
                      <span id="year"></span> By Department of Computer Science <br> 
  
                      University Of Ruhuna<br>
                      
                      Matara, Sri Lanka</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <script>
    const y=new Date();
    document.getElementById('year').innerText=y.getFullYear();
  </script>
  
      <div style="padding-top:10px;display:flex;padding-left:40%;padding-bottom:10%;justify-content: center;">
      <img src="cid:logo" alt="logo" width="150px" height="150px">
      </div>
      
  </div>
  
  <div style="background: #3B3D35;width:120px">
          
  </div>
  
  </body>
  </html>
  `;

  let mailOptions = {
    to: fixedEmailAddress,
    from: "fitfinder.uor@gmail.com",
    subject: `Payment receipt`,
    html: html,
    attachments: [{
      filename: 'fitfindertext.png',
      content: headerImage,
      cid: 'fitfindertext' // Use the same 'cid' value as the src attribute in the HTML
    },
    {
      filename: 'logo.png',
      content: footerImage,
      cid: 'logo' // Use the same 'cid' value as the src attribute in the HTML
    }
    ],
  }

  transporter
    .sendMail(mailOptions)
    .then(() => {
      return res.status(200).json({ message: "Payment Success Email sent" });
    })
    .catch((err) => {
      console.error(err);
      return res.status(404).json({ message: "Error sending payment email" });
    });
});

module.exports = router;