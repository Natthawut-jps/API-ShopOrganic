require("dotenv").config({ path: "../.env.local" });
const express = require("express");
const route = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { Userinfo } = require("../model/Userinfo");

route.post("/usr", async (req, res) => {
  try {
    if (req.body) {
      const user = await Userinfo.findOne( { where: { email: req.body.email } });
      if ( !user ) {
       await Userinfo.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 10),
            phone: req.body.phone,
            imgURL: req.body.imgURL
        });
        const _ut = jwt.sign(
          { _uid: req.body.email },
          process.env.DOTENV_jwt_Secrect_ut,
          { algorithm: "HS384", expiresIn: "5m" }
        );
        const _ur = jwt.sign(
          { _uid: req.body.email },
          process.env.DOTENV_jwt_Secrect_ur,
          { algorithm: "HS384", expiresIn: "15d" }
        );
        return res.json({ _ut: _ut, _ur: _ur });
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