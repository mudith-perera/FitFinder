//Create routes using express package
const express = require("express");

//importing the controller
const {
    createNote,
    getNotes,
    getNotesByUserId,
    deleteNote,
} = require("../controllers/notesController");

//get the Router instatnce from the express package
const router = express.Router();
////////////////////////////////////////     Request Handlers (START)    ////////////////////////////////////////

/////////////////////////  Handler          : /
/////////////////////////  Controller       : createNote()
/////////////////////////  Description      : 
/////////////////////////  Developer        : 
/////////////////////////  (START)
router.post("/", createNote);
/////////////////////////  (END)

/////////////////////////  Handler          : /
/////////////////////////  Controller       : getNotes()
/////////////////////////  Description      : 
/////////////////////////  Developer        : 
/////////////////////////  (START)
router.get("/", getNotes);
/////////////////////////  (END)

/////////////////////////  Handler          : /getNotesByUserId
/////////////////////////  Controller       : getNotesByUserId()
/////////////////////////  Description      : 
/////////////////////////  Developer        : 
/////////////////////////  (START)
router.post("/getNotesByUserId", getNotesByUserId);
/////////////////////////  (END)

/////////////////////////  Handler          : /:id
/////////////////////////  Controller       : deleteNote()
/////////////////////////  Description      : 
/////////////////////////  Developer        : 
/////////////////////////  (START)
router.delete("/:id", deleteNote);
/////////////////////////  (END)



//export the created routes
module.exports = router;