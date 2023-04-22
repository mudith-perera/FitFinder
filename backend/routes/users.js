//Create routes using express package
const express = require("express");

//importing the controller
const {
  createUser,
  getUsers,
  getUser,
  getUserEmailPwd,
  updateUser,
  deleteUser,
  updateUserStatus,
  updateRegisteredGymActivateStatus,
  getUsersByGymId,
  updatePassword,
} = require("../controllers/userController");

const { googleSignInUp } = require("../controllers/authController");

//get the Router instatnce from the express package
const router = express.Router();

////////////////////////////////////////     Request Handlers (START)    ////////////////////////////////////////

/////////////////////////  Handler          : /
/////////////////////////  Controller       : createUsers()
/////////////////////////  Description      : create a single user and their information
/////////////////////////  Developer        : Mudith Perera
/////////////////////////  (START)
router.post("/", createUser);
/////////////////////////  (END)

/////////////////////////  Handler          : /
/////////////////////////  Controller       : getUsers()
/////////////////////////  Description      : Get all users and their information
/////////////////////////  Developer        : Mudith Perera
/////////////////////////  (START)
router.get("/", getUsers);
/////////////////////////  (END)

/////////////////////////  Handler          : /:id
/////////////////////////  Controller       : getUser()
/////////////////////////  Description      : Get a singlw user
/////////////////////////  Developer        : Mudith Perera
/////////////////////////  (START)
router.get("/:id", getUser);
/////////////////////////  (END)

/////////////////////////  Handler          : /getUserEmailPwd
/////////////////////////  Controller       : getUserEmailPwd()
/////////////////////////  Description      : Get a user to given email and password
/////////////////////////  Developer        : Mudith Perera
/////////////////////////  (START)
router.post("/getUserEmailPwd/", getUserEmailPwd);
/////////////////////////  (END)

/////////////////////////  Handler          : /googleSignUp
/////////////////////////  Controller       : googleSignUp()
/////////////////////////  Description      : create a new account and sign in
/////////////////////////  Developer        : Mudith Perera
/////////////////////////  (START)
router.post("/googleSignInUp/", googleSignInUp);
/////////////////////////  (END)


/////////////////////////  Handler          : /:id
/////////////////////////  Controller       : updateUser()
/////////////////////////  Description      : Update user details
/////////////////////////  Developer        : Dilini Kariyawasam
/////////////////////////  (START)
router.patch("/:id", updateUser);
/////////////////////////  (END)


/////////////////////////  Handler          : /:id
/////////////////////////  Controller       : deleteUser()
/////////////////////////  Description      : delete a user
/////////////////////////  Developer        : Dilini Kariyawasam
/////////////////////////  (START)
router.delete("/:id", deleteUser);
/////////////////////////  (END)

/////////////////////////  Handler          : /updateUserStatus/:id
/////////////////////////  Controller       : updateUserStatus()
/////////////////////////  Description      : update User Status
/////////////////////////  Developer        : vimukthi
/////////////////////////  (START)
router.put('/updateUserStatus/:id', updateUserStatus);

/////////////////////////  (END)

/////////////////////////  Handler          : /updateRegisteredGymActivateStatus/:id
/////////////////////////  Controller       : updateRegisteredGymActivateStatus()
/////////////////////////  Description      : update User registered Gym Activate Status 
/////////////////////////  Developer        : vimukthi
/////////////////////////  (START)
router.put('/updateRegisteredGymActivateStatus/:id', updateRegisteredGymActivateStatus);

/////////////////////////  (END)

/////////////////////////  Handler          : /getUsersByGymId/
/////////////////////////  Controller       : getUsersByGymId()
/////////////////////////  Description      : Get all users and their information using registered gym Id
/////////////////////////  Developer        : Mudith Perera
/////////////////////////  (START)
router.post('/getUsersByGymId/', getUsersByGymId);

/////////////////////////  (END)

/////////////////////////  Handler          : /updatePassword/
/////////////////////////  Controller       : updatePassword()
/////////////////////////  Description      : Update user password
/////////////////////////  Developer        : Mudith Perera
/////////////////////////  (START)
router.patch('/updatePassword/:id', updatePassword);
/////////////////////////  (END)

////////////////////////////////////////     Request Handlers (END)    ////////////////////////////////////////

//export the created routes
module.exports = router;
