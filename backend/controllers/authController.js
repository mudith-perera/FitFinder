/////////////////////////  Modified Date   : 02-22-2023                       ///////
/////////////////////////  Description     : Google authentication controller ///////
/////////////////////////  Developer       : Mudith Perera                    ///////

//import mongoose
const mongoose = require("mongoose");

//importing bycrypt to encrypt passwords
const bcrypt = require("bcrypt");

//importing JWT
const jwt = require("jsonwebtoken");

//get .env package
require("dotenv").config();
const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });

const { OAuth2Client } = require('google-auth-library');

//importing the model
const User = require("../models/userModel.js");

////////////////////////////////////////    Controllers (START)   ////////////////////////////////////////

/////////////////////////  Controller       : googleSignInUp()
/////////////////////////  Description      :
/////////////////////////  (START)
async function verifyToken(token) {
  const client = new OAuth2Client();

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID, // your Google OAuth 2.0 client ID
    });
    const payload = ticket.getPayload();
    return payload; // return the payload of the token
  } catch (error) {
    console.error(error);
    return null;
  }
}
const googleSignInUp = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1]; // get the token from the Authorization header

  const payload = await verifyToken(token);

  if (payload) {
    const email = payload.email; // get the user Email from the token's sub claim
    const firstname = payload.given_name;
    const lastname = payload.family_name;

    //check for the user email existance
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      res.status(200).json(foundUser);
    }else{
      const user = await User.create({email,firstname,lastname});
      const newUser = await User.findOne({ email });
      res.status(201).json(newUser);
    }
    
  } else {
    res.status(401).json({message:'Unauthorized'}); // return a 401 status code if the token is invalid
  }
};
/////////////////////////  (END)

////////////////////////////////////////     Controllers (END)    ////////////////////////////////////////

module.exports = {
  googleSignInUp,
};
