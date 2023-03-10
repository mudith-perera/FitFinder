/////////////////////////  Modified Date   : 28-02-2023     /////////////////////////
/////////////////////////  Description     : controller which give the search result

////////////////////////////////////////    Controllers (START)   ////////////////////////////////////////

/////////////////////////  Controller       : searchGyms()
/////////////////////////  Description      : get the gyms searched by gymName, location, gymSexType if and only if gym is active
/////////////////////////  Developer        : Gimhani Harshika
/////////////////////////  (START)

const mongoose = require("mongoose");
const Gym = require("../models/gymModel.js");

const searchGyms = async (req, res) => {
  const { gymName, location, gymSexType } = req.body;
  const activeStatus = true;

  let gyms="";
  try {

    if (gymName) {
      gyms = await Gym.find({ gymName, activeStatus }).sort({createdAt: -1,});
    }else if(location){
      gyms = await Gym.find({ location, activeStatus }).sort({createdAt: -1,});
    }else if(location && gymSexType){
      gyms = await Gym.find({ location, gymSexType, activeStatus }).sort({createdAt: -1,});
    }
    if (gyms == "") {
      res.status(404).json({ message: "No Gyms Were Found" });
    }else{
      res.status(200).json(gyms);
    }
    
  } catch (err) {
    res.status(500).json({ message: "Error searching for gyms" });
  }
};

/////////////////////////  (END)

// ////////////////////////////////////////    Controllers (END)   ////////////////////////////////////////

module.exports = {
  searchGyms,
};
