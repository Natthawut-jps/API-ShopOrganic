const express = require("express");
const route = express.Router();
const upload = require("../upload");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Userinfo } = require("../../model/Userinfo");
require("dotenv").config({ path: "../../.env.local" });
const fs = require("fs");

// userInfo
route.get("/user_info", async (req, res) => {
  const userInfo = await Userinfo.findOne({
    where: { email: req.user._uid },
    attributes: { exclude: ["password", "accept"] },
  });
  if (userInfo) {
    res.status(200).json(userInfo);
  } else {
    res.status(200).json({});
  }
});

route.post("/update", upload.single("profile"), async (req, res) => {
  const up = async () => {
    if (req.file !== undefined) {
      await Userinfo.update(
        {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          imgURL: req.file.filename,
        },
        { where: { email: req.user._uid } }
      ).then(() => {
        console.log(req.body);
        if (req.body.imgURL !== "profile.jpg") {
          fs.unlink("./public/img/" + req.body.imgURL, (err) => {
            if (err) throw err;
            console.log("path/file.txt was deleted");
          });
        }
        const _ut = jwt.sign(
          { _uid: req.body.email },
          process.env.DOTENV_JWT_UT,
          { algorithm: "HS384", expiresIn: "5m" }
        );
        const _ur = jwt.sign(
          { _uid: req.body.email },
          process.env.DOTENV_JWT_UR,
          { algorithm: "HS384", expiresIn: "15d" }
        );
        res.status(200).json({ _ut: _ut, _ur: _ur });
      });
    } else {
      await Userinfo.update(
        {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
        },
        { where: { email: req.user._uid } }
      ).then(() => {
        const _ut = jwt.sign(
          { _uid: req.body.email },
          process.env.DOTENV_JWT_UT,
          { algorithm: "HS384", expiresIn: "5m" }
        );
        const _ur = jwt.sign(
          { _uid: req.body.email },
          process.env.DOTENV_JWT_UR,
          { algorithm: "HS384", expiresIn: "15d" }
        );
        res.status(200).json({ _ut: _ut, _ur: _ur });
      });
    }
  };
  const user = await Userinfo.findOne({ where: { email: req.body.email } });
  if (req.body.email === req.user._uid && user) {
    up();
  } else if (user && req.body.email !== req.user._uid) {
    res.status(201).json("aleady email exchange other");
  } else if (!user) {
    up();
  }
});

route.post("/change_password", async (req, res) => {
  const user = await Userinfo.findOne({ where: { email: req.user._uid } });
  if (user) {
    const pass = await bcrypt.compare(req.body.password_old, user.password);
    if (pass) {
      const password_hash = await bcrypt.hash(req.body.new_password, 10);
      await Userinfo.update({ password: password_hash }, {where: { email: req.user._uid }}).then((success) => {
        res.status(200).json('success');
      });
    } else {
      res.status(201).json("incorrect password");
    }
  }
});
module.exports = route;
