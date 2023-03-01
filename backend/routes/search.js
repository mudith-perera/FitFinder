//// gimhani Harshika

//Create routes using express package
const express = require("express");

//importing the controller
const {
    getByGymName,
    // getByLocation,
    // GetByLocationAndSex,
    // GetByLocationAndGymName
} = require("../controllers/searchController");

//get the Router instatnce from the express package
const router = express.Router();
////////////////////////////////////////     Request Handlers (START)    ////////////////////////////////////////


/////////////////////////  Handler          : /
/////////////////////////  Controller       : getSearchGym()
/////////////////////////  Description      : get search gym
/////////////////////////  Developer        : Gimhani Harshika
/////////////////////////  (START)
router.get("/", getByGymName); 
/////////////////////////  (END)

/////////////////////////  Handler          : /
/////////////////////////  Controller       : getSearchGym()
/////////////////////////  Description      : get search gym
/////////////////////////  Developer        : Gimhani Harshika
/////////////////////////  (START)
// router.get("/search-gym-location", getByLocation);
/////////////////////////  (END)

/////////////////////////  Handler          : /
/////////////////////////  Controller       : getSearchGym()
/////////////////////////  Description      : get search gym
/////////////////////////  Developer        : Gimhani Harshika
/////////////////////////  (START)
// router.get("/search-gym-location-sex", GetByLocationAndSex);
/////////////////////////  (END)

/////////////////////////  Handler          : /
/////////////////////////  Controller       : getSearchGym()
/////////////////////////  Description      : get search gym
/////////////////////////  Developer        : Gimhani Harshika
/////////////////////////  (START)
// router.get("/search-gym-location-name", GetByLocationAndGymName);
/////////////////////////  (END)

//export the created routes
module.exports = router;

