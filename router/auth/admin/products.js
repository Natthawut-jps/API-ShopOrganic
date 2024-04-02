const express = require("express");
const route = express.Router();
const upload = require("../../upload");
const fs = require("fs");
const { Product } = require("../../../model/admin/Products");
const { Categories } = require("../../../model/admin/Categories");

route.get("/get_products", async (req, res) => {
  await Product.findAll().then((response) => {
    res.status(200).json(response);
  });
});
route.post("/add", upload.single("product_image"), async (req, res) => {
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
      }).then(async () => {
        const productAll = await Product.findAll({
          where: { categories: req.body.categories },
        });
        await Categories.update(
          {
            quantity: productAll.length,
          },
          {
            where: { category_name: req.body.categories },
          }
        ).then(() => {
          res.status(200).json("successfully");
        });
      });
    } else {
      res.status(201).json("product this name aleady exists");
    }
  }
});

route.post("/edit", upload.single("imgURL"), async (req, res) => {
  try {
    const product = await Product.findByPk(req.body.id);
    const product_name = await Product.findOne({
      where: { name: req.body.name },
    });
    if (product.dataValues.name === req.body.name) {
      if (req.file !== undefined) {
        await Product.update(
          {
            name: req.body.name,
            price: req.body.price,
            categories: req.body.categories,
            description: req.body.description,
            quantity: req.body.quantity,
            status: req.body.status,
            imgURL: req.file.filename,
          },
          {
            where: { id: req.body.id },
          }
        ).then(() => {
          if (req.body.imgURL) {
            fs.unlink("./public/img/" + req.body.image_old, (err) => {
              if (err) throw err;
              console.log("path/file.txt was deleted");
            });
          }
          res.status(200).json("successfully");
        });
      } else {
        await Product.update(
          {
            name: req.body.name,
            price: req.body.price,
            categories: req.body.categories,
            description: req.body.description,
            quantity: req.body.quantity,
            status: req.body.status,
          },
          {
            where: { id: req.body.id },
          }
        ).then(() => {
          res.status(200).json("successfully");
        });
      }
    } else if (!product_name) {
      if (req.file !== undefined) {
        await Product.update(
          {
            name: req.body.name,
            price: req.body.price,
            categories: req.body.categories,
            description: req.body.description,
            quantity: req.body.quantity,
            status: req.body.status,
            imgURL: req.file.filename,
          },
          {
            where: { id: req.body.id },
          }
        ).then(() => {
          if (req.body.imgURL) {
            fs.unlink("./public/img/" + req.body.image_old, (err) => {
              if (err) throw err;
              console.log("path/file.txt was deleted");
            });
          }
          res.status(200).json("successfully");
        });
      } else {
        await Product.update(
          {
            name: req.body.name,
            price: req.body.price,
            categories: req.body.categories,
            description: req.body.description,
            quantity: req.body.quantity,
            status: req.body.status,
          },
          {
            where: { id: req.body.id },
          }
        ).then(() => {
          res.status(200).json("successfully");
        });
      }
    } else {
      res.status(201).json('"categories has this name already exists"');
    }
  } catch (error) {
    console.log(error);
  }
});

route.post("/deleted", async (req, res) => {
  try {
    const product = await Product.findByPk(req.body.id);
    if (product) {
      await Product.destroy({ where: { id: req.body.id } }).then(() => {
        res.status(200).json("successfully");
      });
    } else {
      res.status(201).json("error not name categories");
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = route;
