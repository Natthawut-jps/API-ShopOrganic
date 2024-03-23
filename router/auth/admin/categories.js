const express = require("express");
const route = express.Router();
const upload = require("../../upload");
const path = require("path");
const { Categories } = require("../../../model/admin/Categories");

route.get('/get_data', async (req, res) => {
  await Categories.findAll().then((response) => {
    res.status(200).json(response);
  });
})
route.post("/add", upload.single("category_image"), async (req, res) => {
  const category = await Categories.findOne({
    where: { category_name: req.body.category_name },
  });
  if (!category) {
    await Categories.create({
      category_name: req.body.category_name,
      description: req.body.description,
      imgURL: req.file.filename,
    }).then(() => {
      res.status(200).json("successfully");
    });
  } else {
    res.status(201).json("categories name aledy change name other");
  }
});

module.exports = route;
