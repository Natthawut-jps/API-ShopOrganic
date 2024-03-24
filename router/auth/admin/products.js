const express = require("express");
const route = express.Router();
const upload = require("../../upload");
const { Product } = require("../../../model/admin/Products");

route.post("/add", upload.single('product_image'), async (req, res) => {
  if (req.body && req.file) {
    const products = await Product.findOne({ where: { name: req.body.name } });
    if (!products) {
      await Product.create({
        name: req.body.name,
        price: parseInt(req.body.price).toFixed(2),
        categories: req.body.categories,
        imgURL: req.file.filename,
        description: req.body.description,
        quantity: parseInt(req.body.quantity),
        status: parseInt(req.body.status),
      }).then(() => {
        res.status(200).json("successfully");
      });
    } else {
      res.status(201).json("product this name aleady exists");
    }
  }
});

module.exports = route;
