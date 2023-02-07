///////////////////////// Developer       : Mudith Perera  /////////////////////////
///////////////////////// Modified Date   : 07-02-2023     /////////////////////////
/////////////////////////         (START)                  /////////////////////////

//Schema and the model of the database is define here

//Schema :  defines the structure of the document inside the db
//Model  :  apply the schema to the model and use the model to access the db

const mongoose = require("mongoose");

//creating the schema
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: {
    type: String,
    required: false,
  },
  lastname: {
    type: String,
    required: false,
  },
  email: {
    unique: true,
    type: String,
    lowercase: true,
    required: [true, "An user must have an email"],
    validate: {
      validator: function (val) {
        return validator.isEmail(val);
      },
      message: "Please provide a valid email",
    },
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
    //minlength: 8,
    select: false
  },
  nic: {
    unique: true,
    type: String,
    required: false,
  },
  gender: {
    type: String,
    enum: {
      values: ["male", "female", "other"],
      message: "Gender Should be : [ 'male', 'female', 'other']",
    },
    required: true,
  },
  age: {
    type: Number,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  location:{
    type: String,
    required: false
  },
  contact: {
    type: String,
    required: false,
  },
  height: {
    type: Number,
    required: false,
  },
  weight: {
    type: Number,
    required: false,
  },
  fat: {
    type: Number,
    required: false,
  },
  medicalConditions: {
    type: String,
    required: false,
  },

  //Below Fields are use to make relationships with other Schemas

  registeredGymId: {
    type: mongoose.Schema.ObjectId,
    required: false,
  },
  scheduleId: {
    type: mongoose.Schema.ObjectId,
    required: false,
  },
  activeStatus: {
    type: Boolean,
    required: [true, "A user must be Active/Deactive"],
  },
}, {timestamps: true })
//end of the Schema

//creating the collection called "Users"
module.exports = mongoose.model('Users',userSchema)


///////////////////////// Developer       : Mudith Perera  /////////////////////////
///////////////////////// Modifieed Date  : 07-02-2023     /////////////////////////
/////////////////////////              (END)               /////////////////////////