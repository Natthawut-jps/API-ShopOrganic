const express = require("express");
const route = express.Router();
const { Order } = require("../../../model/Order");
const { Order_Detail } = require("../../../model/Order_Detail");
const { Shipping_address } = require("../../..//model/Shipping_address");

route.get("/get_orders", async (req, res) => {
  await Order.findAll().then((response) => {
    res.status(200).json(response);
  });
});

route.post("/change_status", async (req, res) => {
  try {
    const tracking = await Order.findOne({
      where: { tracking_id: req.body.tracking_id },
    });
    if (
      tracking &&
      tracking.dataValues.id === req.body.order_id &&
      tracking &&
      tracking.dataValues.tracking_id === req.body.tracking_id
    ) {
      if (req.body.status && req.body.tracking_id && req.body.order_id) {
        await Order.update(
          {
            status: req.body.status,
            tracking_id: req.body.tracking_id,
          },
          {
            where: { id: req.body.order_id },
          }
        ).then(() => {
          res.status(200).json("successfully");
        });
      }
    } else if (!tracking) {
      await Order.update(
        {
          status: req.body.status,
          tracking_id: req.body.tracking_id,
        },
        {
          where: { id: req.body.order_id },
        }
      ).then(() => {
        res.status(200).json("successfully");
      });
    } else {
      res.status(201).json("aleady Tracking ID");
    }
  } catch (error) {
    console.log(error);
  }
});

route.get("/address", async (req, res) => {
  try {
    await Shipping_address.findByPk(req.query.id).then((response) => {
      res.status(200).json(response);
    });
  } catch (error) {
    console.log(error);
  }
});

route.get("/order_detail", async (req, res) => {
  try {
    await Order_Detail.findAll({ where: { order_id: req.query.id }}).then((response) => {
      res.status(200).json(response);
    });
  } catch (error) {
    console.log(error);
  }
});
module.exports = route;
