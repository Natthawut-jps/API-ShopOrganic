require("dotenv").config({ path: "../.env.local" });
const express = require("express");
const route = express.Router();
const bcrypt = require("bcrypt");
const { Admin } = require("../../model/admin/Admin");

route.post("/admin", async (req, res) => {
  try {
    if (req.body) {
      const admin = await Admin.findOne({ where: { username: req.body.username } });
      if (!admin) {
        await Admin.create({
          username: req.body.username,
          password: await bcrypt.hash(req.body.password, 10),
        }).then(() => {
          res.status(200).json("successfully");
        });
      } else {
        return res.status(401).send(" already have the account !to Login");
      }
    } else {
      return res.send(" data error incorrect ");
    }
  } catch (error) {
    res.send(error);
  }
});

module.exports = route;