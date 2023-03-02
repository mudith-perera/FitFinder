
// /////////////////////////  Modified Date   : 28-02-2023     /////////////////////////
// /////////////////////////  Description     : controller which give the search result

// ////////////////////////////////////////    Controllers (START)   ////////////////////////////////////////

// /////////////////////////  Controller       : searchGyms()
// /////////////////////////  Description      : get the gyms searched by gymName, location, gymSexType if and only if gym is active
// /////////////////////////  Developer        : Gimhani Harshika
// /////////////////////////  (START)

const mongoose = require("mongoose");
const Gym = require("../models/gymModel.js");

const searchGyms = async (req, res) => {
  const { gymName, location, gymSexType } = req.body;
  
  let gyms;

  try{
  
  if (gymName && location) {
    gyms = await Gym.find({ gymName, location }).sort({ createdAt: -1 });   // Search by gymName and location
  }else if (location && gymSexType) {
    gyms = await Gym.find({ location, gymSexType }).sort({ createdAt: -1 });    // Search by location and gymSexType
  } else if (gymName) {
    gyms = await Gym.find({ gymName }).sort({ createdAt: -1 });   // Search by gymName
  } else if (location) {
    gyms = await Gym.find({ location }).sort({ createdAt: -1 });  // Search by location
   } //else {
  //   // No search parameters provided
  //   return res.status(400).json({ message: "Please provide search parameters" });
  // }
  
  let hasActiveGyms = false;
  
  if (gyms && gyms.length > 0) {
    gyms.forEach((gym) => {
      if (gym.activeStatus) {
        hasActiveGyms = true;
      }
    });
  }
  
  if (!hasActiveGyms) {
    res.status(400).json({ message: "No active gyms in the system" });
  } else {
    res.status(200).json(gyms);
  }

} catch (err) {
      res.status(500).json({ message: "Error searching for gyms" });
    }
};

// /////////////////////////  (END)

module.exports = {
  searchGyms
};


