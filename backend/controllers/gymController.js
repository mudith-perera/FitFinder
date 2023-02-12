/////////////////////////  Modified Date   : 11-02-2023     /////////////////////////
/////////////////////////  Description     : Controller which address all gym functions

//import mongoose
const mongoose = require("mongoose");

//importing the model
const Gym = require("../models/gymModel.js");

////////////////////////////////////////    Controllers (START)   ////////////////////////////////////////

/////////////////////////  Controller       : createGym()
/////////////////////////  Description      : create a single gym
/////////////////////////  Developer        : Mudith Perera
/////////////////////////  (START)

const createGym = async (req, res) => {
  const {
    gymName,
    gymOwnerName,
    gymOwnerEmail,
    gymSexType,
    gymContactNo1,
    gymContactNo2,
    location,
    openingTime,
    closingTime,
    gymMonthlyFee,
    gymAnnualFee,
    gymAddress,
    gymOwnerComment,
    password,
    activeStatus,
    image1,
    image2,
    image3,
    image4,
    image5,
    gymOwnerId,
  } = req.body;

  try {
    const gym = await Gym.create({
      gymName,
      gymOwnerName,
      gymOwnerEmail,
      gymSexType,
      gymContactNo1,
      gymContactNo2,
      location,
      openingTime,
      closingTime,
      gymMonthlyFee,
      gymAnnualFee,
      gymAddress,
      gymOwnerComment,
      password,
      activeStatus,
      image1,
      image2,
      image3,
      image4,
      image5,
      gymOwnerId,
    });
    res.status(200).json(gym);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
/////////////////////////  (END)

/////////////////////////  Controller       : getUsers()
/////////////////////////  Description      : Get all gyms and their information
/////////////////////////  Developer        : Mudith Perera
/////////////////////////  (START)
const getGyms = async (req, res) => {
  const gyms = await Gym.find({}).sort({ createdAt: -1 });
  if (!gyms) {
    res.status(400).json({ error: "No Gyms in the system" });
  } else {
    res.status(200).json(gyms);
  }
};
/////////////////////////  (END)

module.exports = {
  createGym,
  getGyms,
};