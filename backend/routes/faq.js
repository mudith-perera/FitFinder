// madara senevirathne

//Create routes using express package
const express = require("express");

const path = require("path");

//importing the controller
const {
    createFAQ,
    getFAQ,
  } = require("../controllers/faqController.js");

const router = express.Router();

router.get("/", getFAQ);

router.post("/",createFAQ);



//export the created routes
module.exports = router;