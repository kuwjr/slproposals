const express = require("express");
const router = express.Router();
const messages = require("../lib/messages");
const User = require("../models/user");
const passport = require("passport");
const db = require("../db/connection");
const Token = require("../models/token");

//get all users
router.get("/", async (req, res) => {
  try {
    const fieldsToSelect = req.isAuthenticated() ? "-__v -password" : "-__v -password -email -mobile_number"
    //get all proposals (users) from db
    const allUsers = await User.find({}).select(fieldsToSelect)
    res.status(200).send(allUsers);
  } catch (e) {
    res.status(400).send({"Error": e.message});
  }
});

//get user with id
router.get("/:id", async (req, res) => {
    try {
        const fieldsToSelect = req.isAuthenticated() ? "-__v -password" : "-__v -password -email -mobile_number"
        const user = await User.find({_id: req.params.id}).select(fieldsToSelect)
        res.status(200).send(user);
    } catch (e) {
        res.status(400).send({"Error": e.message});
    }
})

module.exports = router;
