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
      unique: true,
      type: String,
      lowercase: true,
      required: [true, "Member must have an email"],
    },
    
  },{timestamps:true}
  
);
//end of the Schema

//creating the collection called "Gyms"
module.exports = mongoose.model("FAQ", faqSchema);