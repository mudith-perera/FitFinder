/////////////////////////  Modified Date   : 07-02-2023     /////////////////////////
/////////////////////////  Description     : Controller which address all users functions (admin, coaches, members, gym-owners)

//import mongoose
const mongoose = require("mongoose");

//importing bycrypt to encrypt passwords
const bcrypt = require("bcrypt");

//importing the model
const User = require("../models/userModel.js");

//importing gym model
const Gym = require("../models/gymModel.js");

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

/////////////////////////  Controller       : getUserEmailPwd()
/////////////////////////  Description      : Get a single user to the given email and password. Used in login
/////////////////////////  Developer        : Mudith Perera
/////////////////////////  (START)
const getUserEmailPwd = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user.activeStatus) {
      return res.status(401).json({ message: "Account has been Deactivated" });
    }
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    res.status(200).json(user);
  } catch (error) {
    // Handle error
    return res.status(401).json({ message: "Invalid username or password" });
  }
};

/////////////////////////  (END)

/////////////////////////  Controller       : updateUser()
/////////////////////////  Description      : Update a User using user id
/////////////////////////  Developer        : Dilini Kariyawasam
/////////////////////////  (START)

const updateUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such User" });
  }

  // Find the user object by ID and update it
  const user = await User.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });

  if (!user) {
    return res.status(400).json({ error: "No such User" });
  }

  if (user.password && user.isModified("password")) {
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
  }

  const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });

  res.status(200).json(updatedUser);
};


/////////////////////////  (END)

/////////////////////////  Controller       : deleteUser()
/////////////////////////  Description      :  Delete a User using user id
/////////////////////////  Developer        : Dilini Kariyawasam
/////////////////////////  (START)

const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such User" })
  }

  const user2 = await User.findByIdAndDelete(id)
    .then(() => { res.status(200).send({ status: "User deleted" }); })
};

/////////////////////////  (END)

/////////////////////////  Controller       : updateUserStatus()
/////////////////////////  Description      :  update User Status
/////////////////////////  Developer        : vimukthi
/////////////////////////  (START)

const updateUserStatus = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { activeStatus: req.body.activeStatus },
      { new: true }
    );
    if (user.userType === 'gym') {
      const gym = await Gym.find({ email: user.email }).sort({ createdAt: -1 });
      if (gym.length) {
        const gymId = gym[0]._id;
        const updatedGym = await Gym.findOneAndUpdate(
          { _id: gymId },
          {
            activeStatus: req.body.activeStatus,
          },
          { new: true }
        );
        console.log(updatedGym);
      }
    }
    res.json(user);
  } catch (err) {
    res.status(500).send('Server error');
  }
};


/////////////////////////  (END)

/////////////////////////  Controller       : updateUserStatus()-registeredGymActivateStatus
/////////////////////////  Description      :  update User Status
/////////////////////////  Developer        : vimukthi
/////////////////////////  (START)

const updateRegisteredGymActivateStatus = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { registeredGymActivateStatus: req.body.registeredGymActivateStatus },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).send('Server error');
  }
};
/////////////////////////  (END)

/////////////////////////  Controller       : getUsersByGymId()
/////////////////////////  Description      : Get all users and their information using registered gym Id
/////////////////////////  Developer        : Mudith Perera
/////////////////////////  (START)
const getUsersByGymId = async (req, res) => {
  const { email } = req.body;
  const activeStatus = true;

  const gym = await Gym.findOne({ email }).exec(); // Use const to declare gym variable
  const registeredGym = gym._id; // Extract _id property using dot notation

  const users = await User.find({ registeredGym, activeStatus }).sort({ createdAt: -1 });

  if (!users) { // Check if users is null or empty array
    res.status(400).json({ error: "No Users in the system" });
  } else {
    res.status(200).json(users);
  }
}
/////////////////////////  (END)

/////////////////////////  Controller       : updatePassword()
/////////////////////////  Description      : Update Password of the users
/////////////////////////  Developer        : Mudith Perera
/////////////////////////  (START)
const updatePassword = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such User" });
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    // Hash the new password with the generated salt
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }

      // Update the user's password with the new hash
      User.findByIdAndUpdate(id, { password: hash }, (err, user) => {
        if (err) {
          return next(err);
        }

        res.status(200).json({ message: "Password updated successfully" });
      });
    });
  });
};

/////////////////////////  (END)

/////////////////////////  Controller       : keepNote()
/////////////////////////  Description      : member can keep note
/////////////////////////  Developer        : Dilini Udeshika
/////////////////////////  (START)



////////////////////////////END////////////////////////////////////////////////////////

////////////////////////////////////////     Controllers (END)    ////////////////////////////////////////

module.exports = {
  createUser,
  getUsers,
  getUser,
  getUserEmailPwd,
  updateUser,
  deleteUser,
  updateUserStatus,
  updateRegisteredGymActivateStatus,
  getUsersByGymId,
  updatePassword,
};
