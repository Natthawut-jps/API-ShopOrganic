const express = require("express");
const route = express.Router();
const upload = require("../../upload");
const fs = require("fs");
const { Categories } = require("../../../model/admin/Categories");

route.get("/get_data", async (req, res) => {
  await Categories.findAll().then((response) => {
    res.status(200).json(response);
  });
});
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
    res.status(201).json('"categories has this name already exists"');
  }
});

route.post("/edit", upload.single("category_edit"), async (req, res) => {
  try {
    const category = await Categories.findByPk(req.body.id);
    const category_name = await Categories.findOne({
      where: { category_name: req.body.category_name },
    });
    if (category.dataValues.category_name === req.body.category_name) {
      if (req.file !== undefined) {
        await Categories.update(
          {
            category_name: req.body.category_name,
            description: req.body.description,
            imgURL: req.file.filename,
          },
          {
            where: { id: req.body.id },
          }
        ).then(() => {
          if (req.body.imgURL) {
            fs.unlink("./public/img/" + req.body.imgURL, (err) => {
              if (err) throw err;
              console.log("path/file.txt was deleted");
            });
          }
          res.status(200).json("successfully");
        });
      } else {
        await Categories.update(
          {
            category_name: req.body.category_name,
            description: req.body.description,
          },
          {
            where: { id: req.body.id },
          }
        ).then(() => {
          res.status(200).json("successfully");
        });
      }
    } else if (!category_name) {
      if (req.file !== undefined) {
        await Categories.update(
          {
            category_name: req.body.category_name,
            description: req.body.description,
            imgURL: req.file.filename,
          },
          {
            where: { id: req.body.id },
          }
        ).then(() => {
          if (req.body.imgURL) {
            fs.unlink("./public/img/" + req.body.imgURL, (err) => {
              if (err) throw err;
              console.log("path/file.txt was deleted");
            });
          }
          res.status(200).json("successfully");
        });
      } else {
        await Categories.update(
          {
            category_name: req.body.category_name,
            description: req.body.description,
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
    const category = await Categories.findByPk(req.body.id);
    if (category) {
      await Categories.destroy({ where: { id: req.body.id } }).then(() => {
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
