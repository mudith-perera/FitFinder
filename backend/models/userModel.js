///////////////////////// Developer       : Mudith Perera  /////////////////////////
///////////////////////// Modified Date   : 07-02-2023     /////////////////////////
/////////////////////////              (START)             /////////////////////////
///////////////////////// Description     : Model created to save all the users in the system (admin, coaches, members, gym-owners)

//Schema and the model of the user is define here

//Schema :  defines the structure of the document inside the db
//Model  :  apply the schema to the model and use the model to access the db

const mongoose = require("mongoose");

//importing bycrypt to encrypt passwords
const bcrypt = require("bcrypt");

//creating the schema
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
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
    },
    password: {
      type: String,
      required: [false, "A user must have a password"],
      //minlength: 8,
    },
    nic: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "other"],
        message: "Gender Should be : [ 'male', 'female', 'other']",
      },
      default: "male",
      required: false,
    },
    age: {
      type: Number,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: false,
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
    userType: {
      type: String,
      enum: {
        values: ["member", "gym", "coach", "admin"],
        message: "user type Should be : ['member', 'gym', 'coach','admin']",
      },
      required: true,
      default: "member",
    },
    userComments: {
      type: String,
      required: false,
    },
    coachType: {
      type: String,
      required: false,
    },

    //Below Fields are use to make relationships with other Schemas

    registeredGym: {
      type: mongoose.Schema.ObjectId,
      ref: "Gyms",
    },
    registeredGymActivateStatus: {
      type: Boolean,
      default: false,
      required: false,
    },
    scheduleId: {
      type: mongoose.Schema.ObjectId,
      ref: "UserSchedule",
    },
    activeStatus: {
      type: Boolean,
      default: true,
      required: [true, "A user must be Active/Deactive"],
    },
    resetToken: String,
    expireToken: Date,
  },
  { timestamps: true }
);
//end of the Schema

// populate the gym  details whenever use find() method
userSchema.pre(/^find/, function (next) {
  this.populate({
    path: "registeredGym",
    select:
      "gymName gymOwnerName email gymSexType gymContactNo1 gymContactNo2 location openingTime closingTime gymMonthlyFee gymAnnualFee gymAddress gymOwnerComment activeStatus images gymRating",
  });

  next();
});

// populate the gym  details whenever use find() method
userSchema.pre(/^find/, function (next) {
  this.populate({
    path: "scheduleId",
    select:
      "schedule exercises reps time instructions",
  });

  next();
});

// Hash the password before saving the user object
userSchema.pre("save", function (next) {
  const user = this;

  // Only hash the password if it has been modified or is new
  if (!user.isModified("password")) {
    return next();
  }

  // Generate a salt
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    // Hash the password with the generated salt
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }

      // Replace the plain text password with the hashed password
      user.password = hash;
      next();
    });
  });
});

//creating the collection called "Users"
module.exports = mongoose.model("Users", userSchema);

///////////////////////// Developer       : Mudith Perera  /////////////////////////
///////////////////////// Modifieed Date  : 07-02-2023     /////////////////////////
/////////////////////////              (END)               /////////////////////////
