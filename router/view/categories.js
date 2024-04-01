const express = require("express");
const route = express.Router();
const { Categories } = require("../../model/admin/Categories");

route.get("/get_category", async (req, res) => {
  await Categories.findAll().then((response) => {
    res.status(200).json(response);
  });
});

module.exports = route;