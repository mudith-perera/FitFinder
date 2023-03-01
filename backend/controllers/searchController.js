/////////////////////////  Modified Date   : 28-02-2023     /////////////////////////
/////////////////////////  Description     : controller which give the search result

//import mongoose
const mongoose = require("mongoose");

//importing the model
const Gym = require("../models/gymModel.js");

////////////////////////////////////////    Controllers (START)   ////////////////////////////////////////

/////////////////////////  Controller       : searchGym()
/////////////////////////  Description      :
/////////////////////////  Developer        : Gimhani Harshika
/////////////////////////  (START)

const getByGymName = async (req, res) => {
  const { gymName } = req.body;
  const gyms = await Gym.find(gymName);  
  console.log(users);
  if (!gyms) {
    res.status(400).json({ error: "No gyms in the system" });
  } else {
    res.status(200).json(users);
  }
};

/////////////////////////  (END)

////////////////////////////////////////     Controllers (END)    ////////////////////////////////////////

module.exports = {
  getByGymName,
  // getByLocation,
  // GetByLocationAndSex,
  // GetByLocationAndGymName
};
