//Create routes using express package
const express = require("express")

//importing the controller
const { 
  createGym,
  getGyms,
} = require('../controllers/gymController.js')

//get the Router instatnce from the express package
const router = express.Router()
////////////////////////////////////////     Request Handlers (START)    ////////////////////////////////////////

/////////////////////////  Handler          : /
/////////////////////////  Controller       : createGym()
/////////////////////////  Description      : create a single gym
/////////////////////////  Developer        : Mudith Perera
/////////////////////////  (START)
router.post('/',createGym)
/////////////////////////  (END)

/////////////////////////  Handler          : /
/////////////////////////  Controller       : getGyms()
/////////////////////////  Description      : get all the gyms
/////////////////////////  Developer        : Mudith Perera
/////////////////////////  (START)
router.get('/',getGyms)
/////////////////////////  (END)

//export the created routes
module.exports = router