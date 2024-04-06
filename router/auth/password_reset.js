const express = require("express");
const route = express.Router();
const bcrypt = require("bcrypt");
const { Userinfo } = require("../../model/Userinfo");

route.post("/reset", async (req, res) => {
  try {
    if (req.body) {
      const encrypt = await bcrypt.hash(req.body.password, 10);
      await Userinfo.update(
        {
          password: encrypt,
        },
        {
          where: { email: req.user._uid },
        }
      ).then(() => {
        res.status(200).json("successfully");
      });
    } else {
      res.status(201).json("data incorrect");
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = route;
