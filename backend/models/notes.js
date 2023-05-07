//Schema and the model of the rating is define here

const mongoose = require("mongoose");

//creating the schema
const Schema = mongoose.Schema;

const noteSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "Users",
        },
        note: {
            type: String,
            required: [true, "An user must write a note"],
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);
//end of the Schema

noteSchema.pre(/^find/, function (next) {
    this.populate({
        path: "user",
        select:
            "firstname lastname email",
    });

    next();
});

//creating the collection called "Rating"
module.exports = mongoose.model("Notes", noteSchema);
