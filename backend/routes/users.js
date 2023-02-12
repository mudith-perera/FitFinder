//Create routes using express package
const express = require("express")

//importing the controller
const { 
  createUser,
  getUsers,
  getUser
} = require('../controllers/userController')

//get the Router instatnce from the express package
const router = express.Router()

////////////////////////////////////////     Request Handlers (START)    ////////////////////////////////////////

/////////////////////////  Handler          : /
/////////////////////////  Controller       : createUsers()
/////////////////////////  Description      : create a single user and their information
/////////////////////////  Developer        : Mudith Perera
/////////////////////////  (START)
router.post('/',createUser)
/////////////////////////  (END)

/////////////////////////  Handler          : /
/////////////////////////  Controller       : getUsers()
/////////////////////////  Description      : Get all users and their information
/////////////////////////  Developer        : Mudith Perera
/////////////////////////  (START)
router.get('/',getUsers)
/////////////////////////  (END)

/////////////////////////  Handler          : /:id
/////////////////////////  Controller       : getUser()
/////////////////////////  Description      : Get a singlw user
/////////////////////////  Developer        : Mudith Perera
/////////////////////////  (START)
router.get('/:id',getUser)
/////////////////////////  (END)

////////////////////////////////////////     Request Handlers (END)    ////////////////////////////////////////

//export the created routes
module.exports = router