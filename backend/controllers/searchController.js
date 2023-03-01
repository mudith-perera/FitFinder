/////////////////////////  Modified Date   : 28-02-2023     /////////////////////////
/////////////////////////  Description     : controller which give the search result

//import mongoose
const mongoose = require("mongoose");

//importing the model
const Gym = require("../models/gymModel");

////////////////////////////////////////    Controllers (START)   ////////////////////////////////////////

/////////////////////////  Controller       : searchGym()
/////////////////////////  Description      : 
/////////////////////////  Developer        : Gimhani Harshika
/////////////////////////  (START)
const getByGymName = async (req, res) => {
  console.log("0");
  //const { gymName } = req.params;
  // const regex = new RegExp(gymName, "i");
  console.log("1");
  //const gyms = await Gym.find({ gymName }).sort({ createdAt: -1 });
  console.log("2");
  // const gyms = await Gym.find({gymName, location, gymSexType}).exec();


  // if (!gyms) {
  //   res.status(400).json({ error: "No Gyms in the system" });
  // }
  //   res.status(200).json(gyms);
  
};


// const getByLocation = async (req, res) => {
//   const { location } = req.params;
//   const gyms = await Gym.find({ location }).sort({ createdAt: -1 });

//   // const gyms = await Gym.find({gymName, location, gymSexType}).exec();

//   if (!gyms.activeStatus) {
//     res.status(400).json({ error: "No Gyms in the system" });
//   } else {
//     res.status(200).json(gyms);
//   }
// };


// const GetByLocationAndSex = async (req, res) => {
//   const { location, gymSexType } = req.params;
//   const gyms = await Gym.find({ location, gymSexType }).sort({ createdAt: -1 });

//   // const gyms = await Gym.find({gymName, location, gymSexType}).exec();

//   if (!gyms.activeStatus) {
//     res.status(400).json({ error: "No Gyms in the system" });
//   } else {
//     res.status(200).json(gyms);
//   }
// };


// const GetByLocationAndGymName = async (req, res) => {
//   const { location, gymName } = req.params;
//   const gyms = await Gym.find({ location, gymName }).sort({ createdAt: -1 });

//   // const gyms = await Gym.find({gymName, location, gymSexType}).exec();

//   if (!gyms.activeStatus) {
//     res.status(400).json({ error: "No Gyms in the system" });
//   } else {
//     res.status(200).json(gyms);
//   }
// };

/////////////////////////  (END)

////////////////////////////////////////     Controllers (END)    ////////////////////////////////////////

module.exports = {
  getByGymName,
  // getByLocation,
  // GetByLocationAndSex,
  // GetByLocationAndGymName
};