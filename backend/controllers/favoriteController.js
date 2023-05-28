/////////////////////////  Modified Date   : 28-02-2023     /////////////////////////
/////////////////////////  Description     : controller which give the search result

////////////////////////////////////////    Controllers (START)   ////////////////////////////////////////

/////////////////////////  Controller       : searchGyms()
/////////////////////////  Description      : get the gyms searched by gymName, location, gymSexType if and only if gym is active
/////////////////////////  Developer        : Gimhani Harshika
/////////////////////////  (START)

const mongoose = require("mongoose");
const { Favorite } = require("../models/favGymModel");

const favoriteNumber = async (req, res) => {
    Favorite.find({ "gymId": req.body.gymId })
    .exec((err, favorite) => {
        if (err) return res.status(400).send(err)

        res.status(200).json({ success: true, favoriteNumber: favorite.length })
    })
};

const favorited = async (req, res) => {
    Favorite.find({ "gymId": req.body.gymId, "userId": req.body.userId })
        .exec((err, favorited) => {
            if (err) return res.status(400).send(err)

            let result = false;
            if (favorited.length !== 0) {
                result = true
            }

            res.status(200).json({ success: true, favorited: result })
        })
};

const addToFavorite = async (req, res) => {
    console.log(req.body)

    const favorite = new Favorite(req.body);

    favorite.save((err, doc) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({ success: true })
    })
};

const removeFromFavorite = async (req, res) => {
    Favorite.findOneAndDelete({ gymId: req.body.gymId, userId: req.body.userId })
        .exec((err, doc) => {
            if (err) return res.status(400).json({ success: false, err });
            res.status(200).json({ success: true, doc })
        })
};

const getFavoritedGym = async (req, res) => {
    const { id } = req.params;
    Favorite.find({ userId: id })
        .exec((err, favorites) => {
            if (err) return res.status(400).send(err);
            return res.status(200).json({ success: true, favorites })
        })
};

/////////////////////////  (END)

// ////////////////////////////////////////    Controllers (END)   ////////////////////////////////////////

module.exports = {
    favoriteNumber,
    favorited,
    addToFavorite,
    removeFromFavorite,
    getFavoritedGym
};
