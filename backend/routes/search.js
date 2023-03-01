//// gimhani Harshika

//Create routes using express package
const express = require("express");

//importing the controller
const {
    getByGymName,
} = require("../controllers/searchController.js");

//get the Router instatnce from the express package
const router = express.Router();
////////////////////////////////////////     Request Handlers (START)    ////////////////////////////////////////


/////////////////////////  Handler          : /
/////////////////////////  Controller       : getSearchGym()
/////////////////////////  Description      : get search gym
/////////////////////////  Developer        : Gimhani Harshika
/////////////////////////  (START)
router.get("/getByGymName", getByGymName); 
/////////////////////////  (END)

//export the created routes
module.exports = router;

