
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

// Import the fs module for file system operations
const fs = require('fs')

// const {JWT_SECRET} = require('../routes')

const User = require("../models/userModel.js");

// Read the image file
const headerImage = fs.readFileSync('D:/Documents/Studies/UOR/3rd Year/Sem 01/Group Project - CSC3113/FitFinder/frontend/src/Images/fitfindertext.png'); // Read the content of the image file
const footerImage = fs.readFileSync('D:/Documents/Studies/UOR/3rd Year/Sem 01/Group Project - CSC3113/FitFinder/frontend/src/Images/logo.png'); // Read the content of the image file

//import {image1} from "../../frontend/src/Images/fitfindertext.png"

const ejs = require('ejs');
const path = require('path');

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


    // Replace User with your own Mongoose model for users
    User.findOne({ email: email, activeStatus: true })
      .then((oldUser) => {
        console.log(oldUser)

        if (!oldUser.password) {
          console.log("google account")
          return res.status(404).json({ message: "This is google registered account " });
        }

        if (!oldUser) {
          console.log("not found")
          return res.status(404).json({ message: "User not found with that email" });

        }


        oldUser.resetToken = token
        oldUser.expireToken = Date.now() + 3600000     //able to reset password only with one hour

        const subject = "Reset Password";      // define the subject here
        const name = oldUser.firstname;

        const html = `
            
                <!DOCTYPE html>
            <html>
            <head>
              <title>${subject}</title>
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
                                                        
                                                    <a href="${process.env.CLIENT_URL}/password-reset-reroute/${token}" style="color: #0096FF;">Reset your password</a>
                                                    
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
                              <td style="transform: translateY(10px); class="content-block"><span class="apple-link" ">
                                <span id="year"></span> By Department of Computer Science <br> 
        
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
           
                <div style="padding-top:10px;display:flex;padding-left:40%;padding-bottom:10%;justify-content: center;">
                <img src="cid:logo" alt="logo" width="150px" height="150px">
                </div>
                
            </div>
            
            <div style="background: #3B3D35;width:120px">
                    
            </div>
          
        </body>
      
            `;

        oldUser.save().then((result) => {
          transporter
            .sendMail({
              to: oldUser.email,
              from: "fitfinder.uor@gmail.com",
              subject: "Reset Password",
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
              ]
            })
            .then(() => {
              res.json({ message: "success" });
            })
            .catch((err) => {
              console.error(err);
              res.status(500).json({ message: "Error sending email" });
            });
        })
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "User not found" });
      });

  })

});


router.post('/new-password', (req, res) => {
  //console.log("25");
  const newPassword = req.body.password
  const sentToken = req.body.token
  console.log(sentToken)
  User.findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })
    .then(user => {

      if (!user) {
        return res.status(404).json({ error: "Try again session expired" })
      }
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          return next(err);
        }

        // Hash the new password with the generated salt
        bcrypt.hash(newPassword, salt, (err, hashedPassword) => {
          if (err) {
            return next(err);
          }

          // Update the user's password and clear resetToken and expireToken
          //user.password = hashedPassword;

          user.resetToken = undefined;
          user.expireToken = undefined;
          User.findByIdAndUpdate(user._id, { password: hashedPassword }, (err, user) => {
            console.log(user._id);
            if (err) {
              return next(err);
            }
    
            res.status(200).json({ message: "Password updated successfully" });
          });
          // Save the updated user
          // user.save((err, savedUser) => {
          //   if (err) {
          //     return next(err);
          //   }

          //   res.json({ message: "Password updated successfully" });
          // });
        });
      })
    }).catch(err => {
      console.log(err)
    })
})

//export the created routes
module.exports = router;

