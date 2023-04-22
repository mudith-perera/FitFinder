/////////////////////////  Modified Date   : 11-02-2023     /////////////////////////
/////////////////////////  Description     : Controller which address all gym functions

//import mongoose
const mongoose = require("mongoose");

//importing the model
const Gym = require("../models/gymModel.js");

//importing multer image handler
const multer = require("multer");
const path = require("path");

////////////////////////////////////////    Controllers (START)   ////////////////////////////////////////

/////////////////////////  Controller       : createGym()
/////////////////////////  Description      : create a single gym
/////////////////////////  Developer        : Mudith Perera
/////////////////////////  (START)

const createGym = async (req, res) => {
  const {
    gymName,
    gymOwnerName,
    email,
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
    activeStatus,
    gymOwnerId,
  } = req.body;

  try {
    let images = []; // Initialize an empty array to store the URLs of the uploaded images
    req.files.forEach(function (file) {
      const url = "http://" + req.headers.host + "/" + file.filename; // Get the URL of the uploaded file
      images.push(url); // Push the URL to the array
    });

    //res.send("Files uploaded!");
    const gym = await Gym.create({
      gymName,
      gymOwnerName,
      email,
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
      activeStatus,
      images,
      gymOwnerId,
    });
    res.status(200).json(gym);
  } catch (error) {
    res.status(400).json({ error: error });
    console.error(error);
  }
};
/////////////////////////  (END)

/////////////////////////  Controller       : getUsers()
/////////////////////////  Description      : Get all gyms and their information
/////////////////////////  Developer        : Mudith Perera
/////////////////////////  (START)
const getGyms = async (req, res) => {
  const gyms = await Gym.find({ activeStatus: true }).sort({ createdAt: -1 });
  if (!gyms) {
    res.status(400).json({ error: "No Gyms in the system" });
  } else {
    res.status(200).json(gyms);
  }
};
/////////////////////////  (END)

/////////////////////////  Controller       : uploadImages()
/////////////////////////  Description      : Upload Images
/////////////////////////  Developer        : Mudith Perera
/////////////////////////  (START)

//Validate Images (START)
function checkFileType(file, cb) {
  // Allowed extensions
  const filetypes = /jpeg|jpg|png|gif/;
  // Check the extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check the MIME type
  const mimetype = filetypes.test(file.mimetype);
  // Return an error if the file type is not allowed
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}
//Validate Images (END)

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/"); // specify the destination folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // generate a unique filename
  },
});
const uploadImages = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

/////////////////////////  (END)

/////////////////////////  Controller       : updateGym()
/////////////////////////  Description      : Update a Gym using gym id
/////////////////////////  Developer        : Mudith Perera
/////////////////////////  (START)
const updateGym = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Gym" });
  }

  const gym = await Gym.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!gym) {
    return res.status(400).json({ error: "No such Gym" });
  }

  res.status(200).json(gym);
};
/////////////////////////  (END)

/////////////////////////  Controller       : getGym()
/////////////////////////  Description      : Get a single gym information
/////////////////////////  Developer        : Dilini Kariyawasam
/////////////////////////  (START)
const getGym = async (req, res) => {
  //grabbing the id from the route parameters
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Gym" });
  }
  const gym = await Gym.findById(id);

  if (!gym) {
    return res.status(404).json({ error: "No such Gym" });
  }
  res.status(200).json(gym);
};
/////////////////////////  (END)

/////////////////////////  Controller       : deleteGym()
/////////////////////////  Description      :  Delete a Gym using gym id
/////////////////////////  Developer        : Dilini Kariyawasam
/////////////////////////  (START)
const deleteGym = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Gym" });
  }

  const gym2 = await Gym.findByIdAndDelete(id).then(() => {
    res.status(200).send({ status: "Gym deleted" });
  });
};

/////////////////////////  (END)

/////////////////////////  Controller       : getGymByOwnerEmail()
/////////////////////////  Description      : Get a single gym information using owner email
/////////////////////////  Developer        : Mudith Perera
/////////////////////////  (START)
const getGymByOwnerEmail = async (req, res) => {
  //grabbing the id from the route parameters
  const { email } = req.body;
  
  gym = await Gym.find({ email }).sort({ createdAt: -1 });

  if (!gym) {
    return res.status(404).json({ error: "No such Gym found to given user" });
  }
  res.status(200).json(gym);
};
/////////////////////////  (END)

module.exports = {
  createGym,
  getGyms,
  uploadImages,
  updateGym,
  deleteGym,
  getGym,
  getGymByOwnerEmail,
};
