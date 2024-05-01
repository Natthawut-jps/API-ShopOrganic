const express = require("express");
const route = express.Router();
const { Userinfo } = require("../../../model/Userinfo");
const { Order } = require("../../../model/Order");

route.get("/get_customers", async (req, res) => {
  const customers = await Userinfo.findAll();
  if (customers) {
    res.status(200).json(customers);
  }
});

route.get("/order", async (req, res) => {
  try {
    await Order.findAll({ where: { user_id: req.query.user_id } }).then(
      (response) => {
        res.status(200).json(response);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

module.exports = route;
