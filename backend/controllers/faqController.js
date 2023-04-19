///////////////// Madara Senevirathne

//import mongoose
const mongoose = require("mongoose");

//importing the model
const FAQ = require("../models/faqModel.js");

//const path = require("path");

////////////////////////////////////////    Controllers (START)   ////////////////////////////////////////

/////////////////////////  Controller       : createFNQ()
/////////////////////////  Description      : create a single userQuection
/////////////////////////  Developer        : Madara Senevirathna
/////////////////////////  (START)

const createFAQ = async (req, res) => {
  const { email, userQuection } = req.body;

  try {
    const faq = await FAQ.create({
      email,
      userQuection,
    });
    res.status(200).json(faq);
  } catch (error) {
    res.status(400).json({ error: error });
    //console.error(error);
  }
};
/////////////////////////  (END)

/////////////////////////  Controller       : getUsersQuec()
/////////////////////////  Description      : Get all user's quection
/////////////////////////  Developer        : Madara Senevirathna
/////////////////////////  (START)
const getFAQ = async (req, res) => {
  const faq = await FAQ.find({}).sort({ createdAt: -1 });
  if (!faq) {
    res.status(400).json({ error: "No such a faq" });
  } else {
    res.status(200).json(faq);
  }
};
/////////////////////////  (END)

/////////////////////////  Controller       : updateData()
/////////////////////////  Description      : update user's answer
/////////////////////////  Developer        : vimukthi
/////////////////////////  (START)
const updateData = async (req, res) => {
  try {
    const { id } = req.params;
    const { answer } = req.body;

    const data = await FAQ.findByIdAndUpdate(
      id,
      { answer },
      { new: true }
    );

    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
/////////////////////////  (END)
module.exports = {
  createFAQ,
  getFAQ,
  updateData
};
