const express = require("express");
const route = express.Router();
const { Contact } = require("../../../model/Contact");

route.get("/get_all", async (req, res) => {
  try {
    const contacts = await Contact.findAll();
    if (contacts) {
      res.status(200).json(contacts);
      console.log(contacts);
    } else {
      res.status(400).json("server Error !!");
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = route;
