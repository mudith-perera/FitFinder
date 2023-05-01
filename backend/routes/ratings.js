//Create routes using express package
const express = require("express");

//importing multer image handler
const multer = require("multer");
const path = require("path");

//importing the controller
const {
  createRating,
  getRatings,
  updateRating,
  getRating,
  
} = require("../controllers/ratingsController.js");

//get the Router instatnce from the express package
const router = express.Router();
////////////////////////////////////////     Request Handlers (START)    ////////////////////////////////////////

/////////////////////////  Handler          : /
/////////////////////////  Controller       : createRating()
/////////////////////////  Description      : create a single gym
/////////////////////////  Developer        : Mudith Perera
/////////////////////////  (START)
router.post("/",createRating);
/////////////////////////  (END)

/////////////////////////  Handler          : /
/////////////////////////  Controller       : getRatings()
/////////////////////////  Description      : get all the gyms
/////////////////////////  Developer        : Mudith Perera
/////////////////////////  (START)
router.get("/", getRatings);
/////////////////////////  (END)

/////////////////////////  Handler          : /
/////////////////////////  Controller       : getRatings()
/////////////////////////  Description      : get all the gyms
/////////////////////////  Developer        : Mudith Perera
/////////////////////////  (START)
router.get("/:id", getRating);
/////////////////////////  (END)

/////////////////////////  Handler          : /:id
/////////////////////////  Controller       : updateRating()
/////////////////////////  Description      : update gym
/////////////////////////  Developer        : Mudith Perera
/////////////////////////  (START)
router.patch("/:id", updateRating);
/////////////////////////  (END)




//export the created routes
module.exports = router;