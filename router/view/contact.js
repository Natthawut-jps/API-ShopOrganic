const express = require("express");
const route = express.Router();
const { Contact } = require("../../model/Contact");

route.post("/add", async (req, res) => {
  try {
    if (req.body) {
      await Contact.create({
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        description: req.body.description,
      }).then(() => {
        res.status(200).json("successfully");
      });
    } else {
      res.status(400).json("data incorrect!!");
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = route;
