const express = require("express");
const route = express.Router();
const { Product } = require("../../model/admin/Products");

route.get("/get_product", async (req, res) => {
  await Product.findAll().then((response) => {
    res.status(200).json(response);
  });
});

module.exports = route;