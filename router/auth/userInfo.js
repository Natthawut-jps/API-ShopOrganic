const express = require("express");
const route = express.Router();
const upload = require("../upload");
const { Userinfo } = require("../../model/Userinfo");

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
  await Userinfo.update(
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      imgURL: req.file.filename,
    },
    { where: { email: req.user._uid } }
  ).then(() => {
    res.status(200).send("success");
  });
  console.log(req.file)
});
module.exports = route;
