/////////////////////////  Modified Date   : 07-02-2023     /////////////////////////
/////////////////////////  Description     : 

//import mongoose
const mongoose = require("mongoose");

//importing the model
const User = require("../models/userModel.js");

////////////////////////////////////////    Controllers (START)   ////////////////////////////////////////

/////////////////////////  Controller       : searchGym()
/////////////////////////  Description      : 
/////////////////////////  Developer        : 
/////////////////////////  (START)
const getUserEmailPwd = async (req, res) => {
  return res.status(401).json({ message: "Controller is not created" });
};
/////////////////////////  (END)

////////////////////////////////////////     Controllers (END)    ////////////////////////////////////////

module.exports = {
  createUser,
  getUsers,
  getUser,
  getUserEmailPwd,
};