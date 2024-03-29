///////////////// Madara Senevirathne

//Schema and the model of the gym is define here

const mongoose = require("mongoose");

//creating the schema
const Schema = mongoose.Schema;

const faqSchema = new Schema(
  {
    userQuection: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      lowercase: true,
      required: [true, "Member must have an email"],
    },
    answer: {
      type: String,
      default: "",
    },

  }, { timestamps: true }

);
//end of the Schema

//creating the collection called "Gyms"
module.exports = mongoose.model("FAQ", faqSchema);