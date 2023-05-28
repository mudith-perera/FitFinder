const mongoose = require("mongoose");

//creating the schema
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
    gymId: {
        type: mongoose.Schema.ObjectId,
        ref: "Gyms",
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "Users",
    },
}, { timestamps: true });
//end of the Schema

favoriteSchema.pre(/^find/, function (next) {
    this.populate({
        path: "gymId",
        select:
            "gymName gymOwnerName email gymSexType gymContactNo1 gymContactNo2 location openingTime closingTime gymMonthlyFee gymAnnualFee gymAddress gymOwnerComment activeStatus images gymRating",
    });

    next();
});

favoriteSchema.pre(/^find/, function (next) {
    this.populate({
        path: "userId",
        select:
            "firstname lastname email password nic gender age address location contact height weight fat medicalConditions userType userComments coachType",
    });

    next();
});

//creating the collection called "Favorite"
// module.exports = mongoose.model("Favorite", favoriteSchema);

const Favorite = mongoose.model("favorites", favoriteSchema);

module.exports = { Favorite };