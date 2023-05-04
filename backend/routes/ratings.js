//Create routes using express package
const express = require("express");

//importing the controller
const {
  createRating,
  getRatings,
  updateRating,
  getRating,
  getGymRatings,
} = require("../controllers/ratingsController.js");

//get the Router instatnce from the express package
const router = express.Router();
////////////////////////////////////////     Request Handlers (START)    ////////////////////////////////////////

/////////////////////////  Handler          : /
/////////////////////////  Controller       : createRating()
/////////////////////////  Description      : create a single gym
/////////////////////////  Developer        : Madara Senevirathna
/////////////////////////  (START)
router.post("/", createRating);
/////////////////////////  (END)

/////////////////////////  Handler          : /
/////////////////////////  Controller       : getRatings()
/////////////////////////  Description      : get all the gyms
/////////////////////////  Developer        : Madara Senevirathna
/////////////////////////  (START)
router.get("/", getRatings);
/////////////////////////  (END)

/////////////////////////  Handler          : /getUserGymRating
/////////////////////////  Controller       : getRating()
/////////////////////////  Description      : Get a single rating by using the  userid and gymid
/////////////////////////  Developer        : Madara Senevirathna
/////////////////////////  (START)
router.post("/getUserGymRating", getRating);
/////////////////////////  (END)

/////////////////////////  Handler          : /:id
/////////////////////////  Controller       : updateRating()
/////////////////////////  Description      : update gym
/////////////////////////  Developer        : Madara Senevirathna
/////////////////////////  (START)
router.patch("/:id", updateRating);
/////////////////////////  (END)

/////////////////////////  Handler          : /getGymRatings
/////////////////////////  Controller       : getGymRatings()
/////////////////////////  Description      : Get all the ratings belongs to a single gym
/////////////////////////  Developer        : Madara Senevirathna
/////////////////////////  (START)
router.post("/getGymRatings", getGymRatings);
/////////////////////////  (END)


//export the created routes
module.exports = router;