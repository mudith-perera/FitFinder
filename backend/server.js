//get express package
const express = require("express")

//get .env package
require("dotenv").config()

//get mongoose package
const mongoose = require('mongoose')

//getting the dotenv package and adding a path of the .env file
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' })

//get Routers


//connect to db(START)
//removing a warning
mongoose.set('strictQuery', true)
//connection is made here
mongoose.connect(process.env.MONG_URI)
//function that will run after connecting the db
.then(() => {
  //listen for requests
  app.listen(port, () => {
    console.log(`Server is running on port: ${port} 👍 & Connected to the Database 🤞`)
  })
})
.catch((error) => {
  console.log(error)
})
//connect to db(END)

//above created constant is a accually a function that we invoked
//express app
const app = express()

//use the given port in the env file or use 5000 as default port
const port = process.env.PORT || 5000

app.use(express.json())

//MIDDLE-WARE (START)
//add the request body to the request object if there is any (req.body)
app.use(express.json())

//global middle-ware
//this will run with every request - next function should be invoked in order to move on to next middle ware funcitons
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

//routes handlers

//MIDDLE-WARE (END)

