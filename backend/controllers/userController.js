/////////////////////////  Modified Date   : 07-02-2023     /////////////////////////
/////////////////////////  Description     : Controller which address all users functions (admin, coaches, members, gym-owners)

//import mongoose
const mongoose = require("mongoose");

//importing the model
const User = require("../models/userModel.js");

////////////////////////////////////////    Controllers (START)   ////////////////////////////////////////

/////////////////////////  Controller       : createUser()
/////////////////////////  Description      : create a single user and their information
/////////////////////////  Developer        : Mudith Perera
/////////////////////////  (START)
const createUser = async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    password,
    nic,
    gender,
    age,
    address,
    location,
    contact,
    height,
    weight,
    fat,
    medicalConditions,
    userType,
    userComments,
    coachType,
    registeredGymId,
    scheduleId,
    activeStatus,
  } = req.body;

  try {
    const user = await User.create({
      firstname,
      lastname,
      email,
      password,
      nic,
      gender,
      age,
      address,
      location,
      contact,
      height,
      weight,
      fat,
      medicalConditions,
      userType,
      userComments,
      coachType,
      registeredGymId,
      scheduleId,
      activeStatus,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
/////////////////////////  (END)

/////////////////////////  Controller       : getUsers()
/////////////////////////  Description      : Get all users and their information
/////////////////////////  Developer        : Mudith Perera
/////////////////////////  (START)
const getUsers = async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 });
  if (!users) {
    res.status(400).json({ error: "No Users in the system" });
  } else {
    res.status(200).json(users);
  }
};
/////////////////////////  (END)

/////////////////////////  Controller       : getUser()
/////////////////////////  Description      : Get a single user information
/////////////////////////  Developer        : Mudith Perera
/////////////////////////  (START)
const getUser = async (req, res) => {
  //grabbing the id from the route parameters
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such User" });
  }
  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ error: "No such User" });
  }
  res.status(200).json(user);
};
/////////////////////////  (END)

////////////////////////////////////////     Controllers (END)    ////////////////////////////////////////

module.exports = {
  createUser,
  getUsers,
  getUser,
};
