const express = require("express");
const route = express.Router();
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env.local" });
const { Userinfo } = require("../../model/Userinfo");

route.post("/find_user", async (req, res) => {
  try {
    if (req.body) {
      const user = await Userinfo.findOne({
        where: { email: req.body.email, gmail: 0 },
      });
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(201).json("not found user ");
      }
    } else {
      res.status(201).json("data incorrect");
    }
  } catch (error) {
    console.log(error);
  }
});

route.post("/send_email", async (req, res) => {
  try {
    if (req.body) {
      const user = await Userinfo.findOne({
        where: { email: req.body.email, gmail: 0 },
      });
      if (user) {
        const _re = jwt.sign(
          { _uid: user.dataValues.email },
          process.env.DOTENV_JWT_RESET_PASSWORD,
          { algorithm: "HS384", expiresIn: "5m" }
        );
        const url = `http://localhost:5173/password-reset/${_re.slice(0, 30)}`;

        // Email
        const transporter = nodemailer.createTransport({
          service: "gmail",
          secure: true,
          auth: {
            user: "user.natthawut@gmail.com",
            pass: "mrhwhjvpluaolikg",
          },
        });
        const mailOption = {
          from: "natthawut.jps@gmail.com",
          to: user.dataValues.email,
          subject: "Reset-Password",
          text: url,
        };

        transporter.sendMail(mailOption, async (err, info) => {
          if (err) {
            return console.log(err);
          } else {
            return info;
          }
        });
        res.status(200).json({ _re: _re });
      } else {
        res.status(201).json("user not found");
      }
    } else {
      res.status(201).json("data incorrect");
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = route;
