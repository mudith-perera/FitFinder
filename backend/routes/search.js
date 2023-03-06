//// gimhani Harshika

//Create routes using express package
const express = require("express");

//importing the controller
const {
    searchGyms
} = require("../controllers/searchController.js");

//get the Router instatnce from the express package
const router = express.Router();

////////////////////////////////////////     Request Handlers (START)    ////////////////////////////////////////

/////////////////////////  Handler          : /search-gyms
/////////////////////////  Controller       : searchGyms()
/////////////////////////  Description      : get the gyms searched by gymName, location, gymSexType
/////////////////////////  Developer        : Gimhani Harshika
/////////////////////////  (START)
router.post("/search-gyms", searchGyms); 
/////////////////////////  (END)

//export the created routes
module.exports = router;

