//Create routes using express package
const express = require("express");

//importing multer image handler
const multer = require("multer");
const path = require("path");

//importing the controller
const {
  createGym,
  getGyms,
  uploadImages,
  updateGym,
  deleteGym,
  getGym,
} = require("../controllers/gymController.js");

//get the Router instatnce from the express package
const router = express.Router();
////////////////////////////////////////     Request Handlers (START)    ////////////////////////////////////////

/////////////////////////  Handler          : /
/////////////////////////  Controller       : createGym()
/////////////////////////  Description      : create a single gym
/////////////////////////  Developer        : Mudith Perera
/////////////////////////  (START)
router.post("/",uploadImages.array("images", 5),createGym);
/////////////////////////  (END)

/////////////////////////  Handler          : /
/////////////////////////  Controller       : getGyms()
/////////////////////////  Description      : get all the gyms
/////////////////////////  Developer        : Mudith Perera
/////////////////////////  (START)
router.get("/", getGyms);
/////////////////////////  (END)

/////////////////////////  Handler          : /:id
/////////////////////////  Controller       : updateGym()
/////////////////////////  Description      : update gym
/////////////////////////  Developer        : Mudith Perera
/////////////////////////  (START)
router.patch("/:id", updateGym);
/////////////////////////  (END)

/////////////////////////  Handler          : /
/////////////////////////  Controller       : getGym()
/////////////////////////  Description      : get a gym
/////////////////////////  Developer        : Dilini Kariyawasam
/////////////////////////  (START)
router.get("/:id", getGym);
/////////////////////////  (END)

/////////////////////////  Handler          : /:id
/////////////////////////  Controller       : deleteGym()
/////////////////////////  Description      : delete a gym
/////////////////////////  Developer        : Dilini Kariyawasam
/////////////////////////  (START)
router.delete("/:id", deleteGym);
/////////////////////////  (END)

//export the created routes
module.exports = router;
