/////////////////////////  Modified Date   : 11-03-2023     /////////////////////////
/////////////////////////  Description     : Controller all gym's ratings

//import mongoose
const mongoose = require("mongoose");

//importing the model
const Rating = require("../models/ratingModel.js");
const Gym = require("../models/gymModel.js");

//importing multer image handler
const multer = require("multer");
const path = require("path");

////////////////////////////////////////    Controllers (START)   ////////////////////////////////////////

/////////////////////////  Controller       : createRating()
/////////////////////////  Description      : create a single rating
/////////////////////////  Developer        : Madara Senevirathna
/////////////////////////  (START)
const createRating = async (req, res) => {
  const { user, gym, rating, comment } = req.body;
  const newRating = new Rating({ user, gym, rating, comment });
  const gymId = gym;

  const session = await mongoose.startSession();
  try {
    const gymObjectId = mongoose.Types.ObjectId.isValid(gymId) ? mongoose.Types.ObjectId(gymId) : null;

    session.startTransaction();
    await newRating.save();
    const ratings = await Rating.find({ gym: gymObjectId });
    const currRatings = ratings.map((rating) => rating.rating);
    console.log(currRatings);

    // Calculate the average rating
    const sumRatings = currRatings.reduce((total, curr) => total + curr, 0);
    const averageRating = sumRatings / currRatings.length;
    const roundedRating = averageRating.toFixed();
    const gym = await Gym.findOneAndUpdate(
      { _id: gymObjectId },
      {
        gymRating: roundedRating
      }
    );
    const commit = await session.commitTransaction();
    session.endSession();
    res.status(200).json({ message: 'Success' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'server error' });
  }
};

/////////////////////////  (END)

/////////////////////////  Controller       : getRatings()
/////////////////////////  Description      : Get all ratings and other information
/////////////////////////  Developer        : Madara Senevirathna
/////////////////////////  (START)


const getRatings = async (req, res) => {
  const ratings = await Rating.find({ activeStatus: true }).sort({ createdAt: -1 });
  if (!ratings) {
    res.status(400).json({ error: "No rating in the system" });
  } else {
    res.status(200).json(ratings);
  }
};
/////////////////////////  (END)

/////////////////////////  Controller       : getUser()
/////////////////////////  Description      : Get a single rating by using the  userid and gymid
/////////////////////////  Developer        : Mudith Perera
/////////////////////////  (START)
const getRating = async (req, res) => {

  const { user, gym } = req.body;
  const rating = await Rating.findOne({ user, gym });

  if (!rating) {
    return res.status(404).json({ error: "No such Rating" });
  }
  res.status(200).json(rating);
};
/////////////////////////  (END)

/////////////////////////  Controller       : updateRating()
/////////////////////////  Description      : Update a Rating using gym id
/////////////////////////  Developer        : Madara Senevirathna
/////////////////////////  (START)
const updateRating = async (req, res) => {
  try {
    const { user, gym, rating, comment } = req.body;
    const ratingId = req.params.id;
    const updatedRating = await Rating.findByIdAndUpdate({ _id: ratingId }, { user, gym, rating, comment }, { new: true });
    if (!updatedRating) {
      return res.status(404).json({ message: 'Rating not found' });
    }
    res.json({ updatedRating });

    /* const updatedProduct = await Rating.findByIdAndUpdate(
      gym, {rating},{new: true,}
    );
    res.json(updatedProduct); */

    const getallratings = await Rating.findById(gym);
    let totalRating = getallratings.rating.length;
    const sumOfRatings = getallratings.reduce((acc, curr) => acc + curr.rating, 0);
    let actualRating = Math.round(sumOfRatings / totalRating);
    let finalproduct = await Rating.findByIdAndUpdate(email, { gymRating: actualRating }, { new: true });
    res.json(finalproduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }


};

/////////////////////////  Controller       : getGymRatings()
/////////////////////////  Description      : Get all the ratings belongs to a single gym
/////////////////////////  Developer        : Mudith Perera
/////////////////////////  (START)
const getGymRatings = async (req, res) => {

  const { gym } = req.body;
  const rating = await Rating.find({ gym });

  if (!rating) {
    return res.status(404).json({ error: "No ratings" });
  }
  res.status(200).json(rating);
};
/////////////////////////  (END)

/////////////////////////  (END)

module.exports = {
  createRating,
  getRatings,
  updateRating,
  getRating,
  getGymRatings,
};