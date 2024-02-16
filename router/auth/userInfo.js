const express = require("express");
const route = express.Router();
const { Userinfo } = require("../../model/Userinfo");

// userInfo
route.get("/userInfo", async (req, res) => {
  const userInfo = await Userinfo.findOne({ where: { email: req.user._uid } });
  if (userInfo) {
    res.status(200).json(userInfo);
  } else {
    res.status(200).json({});
  }
});

module.exports = route;
