//// gimhani Harshika

//Create routes using express package
const express = require("express");

//importing the controller
const {
    favoriteNumber,
    favorited,
    addToFavorite,
    removeFromFavorite,
    getFavoritedGym
} = require("../controllers/favoriteController.js");

//get the Router instatnce from the express package
const router = express.Router();

////////////////////////////////////////     Request Handlers (START)    ////////////////////////////////////////

/////////////////////////  Handler          : /favorite-Number
/////////////////////////  Controller       : favoriteNumber()
/////////////////////////  Description      : retrieve the number of users who have favorited a specific gym
/////////////////////////  Developer        : Gimhani Harshika
/////////////////////////  (START)
router.post("/favorite-Number", favoriteNumber);
/////////////////////////  (END)

////////////////////////////////////////

/////////////////////////  Handler          : /is-favorited
/////////////////////////  Controller       : favorited()
/////////////////////////  Description      : determine if a specific user has favorited a particular gym.
/////////////////////////  Developer        : Gimhani Harshika
/////////////////////////  (START)
router.post("/is-favorited", favorited);
/////////////////////////  (END)

/////////////////////////  Handler          : /add-favorite
/////////////////////////  Controller       : addToFavorite()
/////////////////////////  Description      : add a gym to a user's list of favorites
/////////////////////////  Developer        : Gimhani Harshika
/////////////////////////  (START)
router.post("/add-favorite", addToFavorite);
/////////////////////////  (END)

/////////////////////////  Handler          : /remove-favorite
/////////////////////////  Controller       : removeFromFavorite()
/////////////////////////  Description      : remove a gym from a user's list of favorites
/////////////////////////  Developer        : Gimhani Harshika
/////////////////////////  (START)
router.post("/remove-favorite", removeFromFavorite);
/////////////////////////  (END)

/////////////////////////  Handler          : /get-favoritedGym/:id
/////////////////////////  Controller       : getFavoritedGym()
/////////////////////////  Description      : retrieve a list of gyms that have been favorited by a specific user
/////////////////////////  Developer        : Gimhani Harshika
/////////////////////////  (START)
router.get("/get-favoritedGym/:id", getFavoritedGym);
/////////////////////////  (END)

//export the created routes
module.exports = router;

