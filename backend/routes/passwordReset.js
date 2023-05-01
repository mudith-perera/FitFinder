
//// gimhani Harshika

//Create routes using express package
const express = require("express");

// const app = require('../server.js');

//get the Router instatnce from the express package
// const router = express.Router();
const router = express.Router();

router.use(express.json());

const mongoose = require("mongoose");

const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
//const jwt = require('jsonwebtoken')
// const {JWT_SECRET} = require('../routes')

const User = require("../models/userModel.js");

//const ejs = require('ejs');
//const fs = require('fs');
//const path = require('path');

//get .env package
require("dotenv").config();

//getting the dotenv package and adding a path of the .env file
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });


const transporter = nodemailer.createTransport(sendgridTransport({
  auth: {
    //api_key: "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"
    api_key: process.env.SENDGRID_API

  }
}))

// console.log("90");

router.post('/send-email', (req, res) => {

  //create a token
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err)
    }
    const token = buffer.toString("hex")

    // console.log("99");
    const { email } = req.body

    console.log({ email });

    // Replace User with your own Mongoose model for users
    User.findOne({ email: email, activeStatus: true })
      .then((oldUser) => {
        if (!oldUser) {
          return res.status(404).json({ message: "User not found with that email" });
        }

        oldUser.resetToken = token
        oldUser.expireToken = Date.now() + 3600000     //able to reset password only with one hour

        const subject = "Reset Password";      // define the subject here
        const name = oldUser.firstname + " " + oldUser.lastname;

        const html = `
            
            <!DOCTYPE html>
            <html>
            <head>
              <title>${subject}</title>
            </head>
            <body style="background: linear-gradient(to right, rgb(11, 94, 215), rgb(106, 17, 203));padding: 20px;color: white;width: 800px; height: 600px;">
            <div style="display:flex; align-items:center;">
            <img src="logo.png" alt="logo">
            <h1 style="color: white;font-weight: bold;">FitFinder</h1>
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
                                      <p>Hi ${name},</p>
                                      <p>Forgot password? 😟 <br> 
                                        Click below 👇 link to reset password </p>
                                
                                      <table class="btn btn-primary" role="presentation" border="0" cellpadding="0" cellspacing="0">
                                        <tbody>
                                          <tr>
                                            <td align="left">
                                              <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                                <tbody>
                                                  <tr>
                                                    <td>
                                                        
                                                    <a href="${process.env.CLIENT_URL}/password-reset-reroute/${token}" style="color: red;">Reset your password</a>
                                                    
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                      <p>If didn't forget the password?  then ignore this message. 😅</p>
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
                              <td class="content-block"><span class="apple-link">
                                <!-- © <span id="year"></span> by Department of Computer Science <br> -->
        
                                University Of Ruhuna<br>
                                
                                Matara, Sri Lanka</span></td>
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
          </body>
            `;

        console.log(oldUser);

        oldUser.save().then((result) => {
          transporter
            .sendMail({
              to: oldUser.email,
              from: "fitfinder.uor@gmail.com",
              subject: "Reset Password",
              html: html
            })
            .then(() => {
              res.json({ message: "Email sent successfully" });
            })
            .catch((err) => {
              console.error(err);
              res.status(500).json({ message: "Error sending email" });
            });
        })
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Error finding user" });
      });

  })

});


router.post('/new-password', (req, res) => {
  //console.log("25");
  const newPassword = req.body.password
  const sentToken = req.body.token

  console.log(newPassword);
  console.log(sentToken);

  User.findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })
    .then(user => {
      if (!user) {
        return res.status(422).json({ error: "Try again session expired" })
      }
      console.log(user);
      bcrypt.hash(newPassword, 12).then(hashedpassword => {
        user.password = hashedpassword
        user.resetToken = undefined
        user.expireToken = undefined
        user.save().then((saveduser) => {
          res.json({ message: "password updated success" })
        })
      })
    }).catch(err => {
      console.log(err)
    })
})




//export the created routes
module.exports = router;

