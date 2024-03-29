///////////////////////// Developer       : Mudith Perera  /////////////////////////
///////////////////////// Modified Date   : 11-02-2023     /////////////////////////
/////////////////////////           (START)                /////////////////////////

//Schema and the model of the gym is define here

const mongoose = require("mongoose");

//creating the schema
const Schema = mongoose.Schema;

const gymSchema = new Schema(
  {
    gymName: {
      type: String,
      required: false,
    },
    gymOwnerName: {
      type: String,
      required: false,
    },
    email: {
      unique: true,
      type: String,
      lowercase: true,
      required: [true, "Gym Owner must have an email"],
    },
    gymSexType: {
      type: String,
      enum: {
        values: ["male", "female", "unisex"],
        message: "Gym SexType Should be : [ 'male', 'female', 'unisex']",
      },
      required: false,
    },
    gymContactNo1: {
      type: String,
      required: false,
    },
    gymContactNo2: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: false,
    },
    openingTime: {
      type: String,
      required: false,
    },
    closingTime: {
      type: String,
      required: false,
    },
    gymMonthlyFee: {
      type: Number,
      required: false,
    },
    gymAnnualFee: {
      type: Number,
      required: false,
    },
    gymAddress: {
      type: String,
      required: false,
    },
    gymOwnerComment: {
      type: String,
      required: false,
    },
    activeStatus: {
      type: Boolean,
      default: false,
      required: [true, "A Gym must be Active or Deactive"],
    },
    images: {
      type: [String],
      required: false,
    },
    gymRating: {
      type: Number,
      required: false,
    },
    gymOwnerId: {
      type: mongoose.Schema.ObjectId,
      required: false,
    },
  },
  { timestamps: true }
);
//end of the Schema

//creating the collection called "Gyms"
module.exports = mongoose.model("Gyms", gymSchema);

///////////////////////// Developer       : Mudith Perera  /////////////////////////
///////////////////////// Modified Date   : 11-02-2023     /////////////////////////
/////////////////////////             (END)                /////////////////////////
