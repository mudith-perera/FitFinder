//get express package
const express = require("express");

//get .env package
require("dotenv").config();

//get mongoose package
const mongoose = require("mongoose");

//getting the dotenv package and adding a path of the .env file
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

//get Routers(START)
//get users Router
const userRoutes = require("./routes/users");
//get gym Router
const gymRoutes = require("./routes/gyms");
//get faq Router
const faqRoutes = require("./routes/faq.js");
//get search router
const searchRoutes = require("./routes/search.js");
//get schedule router
const scheduleRouters = require("./routes/schedule.js");
//get stripe router
const stripeRouters = require("./routes/stripe");
//get password-reset router
const resetPasswordRouters = require("./routes/passwordReset.js");
//get ratings
const ratingRoutes = require("./routes/ratings.js");
//get Routers(END)

//connect to db(START)
//removing a warning
mongoose.set("strictQuery", true);
//connection is made here
mongoose
  .connect(process.env.MONG_URI)
  //function that will run after connecting the db
  .then(() => {
    //listen for requests
    app.listen(port, () => {
      console.log(
        `Server is running on port: ${port} 👍 & Connected to the Database 🤞`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
//connect to db(END)

//above created constant is a accually a function that we invoked
//express app
const app = express();
app.use(express.static("./uploads/"));
//use the given port in the env file or use 5000 as default port
const port = process.env.PORT || 5000;

app.use(express.json());

//MIDDLE-WARE (START)
//add the request body to the request object if there is any (req.body)
app.use(express.json());

//global middle-ware
//this will run with every request - next function should be invoked in order to move on to next middle ware funcitons
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes handlers
app.use("/api/users", userRoutes);
app.use("/api/gyms", gymRoutes);
app.use("/api/faq", faqRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/schedule", scheduleRouters);
app.use("/api/stripe", stripeRouters);
app.use("/api/passwordReset", resetPasswordRouters);
app.use("/api/rating", ratingRoutes);
//MIDDLE-WARE (END)
