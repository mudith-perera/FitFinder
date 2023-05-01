///////////////////////// Developer       : Madara Senevirathna  /////////////////////////
///////////////////////// Modified Date   : 11-03-2023     /////////////////////////
/////////////////////////           (START)                /////////////////////////

//Schema and the model of the rating is define here

const mongoose = require("mongoose");

//creating the schema
const Schema = mongoose.Schema;

const ratingSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "Users",
    },
    gym: {
      type: mongoose.Schema.ObjectId,
      ref: "Gyms",
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);
//end of the Schema

ratingSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select:
      "firstname lastname email",
  });

  next();
});

ratingSchema.pre(/^find/, function (next) {
  this.populate({
    path: "gym",
    select:
      "gymName gymOwnerName email gymSexType gymContactNo1 gymContactNo2 location  gymAddress gymOwnerComment activeStatus images gymRating",

  });

  next();
});

//creating the collection called "Rating"
module.exports = mongoose.model("Rating", ratingSchema);

///////////////////////// Developer       : Madara Senevirathna  /////////////////////////
///////////////////////// Modified Date   : 11-03-2023     /////////////////////////
/////////////////////////             (END)                /////////////////////////
