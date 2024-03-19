const express = require("express");
const route = express.Router();
const { Cart } = require("../../model/Cart");
const { Order_Detail } = require("../../model/Order_Detail");
const { Order } = require("../../model/Order");
const { Userinfo } = require("../../model/Userinfo");

route.post("/add", async (req, res) => {
  const cart = await Cart.findAll();
  const uid = await Userinfo.findOne({ where: { email: req.user._uid } });
  await Order.create({
    payment_menthod: "QR Code PrompPay",
    amount_total: req.body.amount_total,
    quantity: req.body.quantity,
    reference: "SO" + String(uid.dataValues.id) + new Date().getTime(),
    address_id: req.body.address_id,
    user_id: req.user._uid,
  }).then(async (response) => {
    cart.map(async (item) => {
      await Order_Detail.create({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        categories: item.categories,
        imgURL: "Tometo.png",
        p_id: item.pid,
        user_id: item.uid,
        order_id: response.dataValues.id,
      });
    });
    Cart.truncate();
    res.status(200).json(response.dataValues.id);
  });
});

route.get("/get_order", async (req, res) => {
  try {
    await Order.findAll({ where: { user_id: req.user._uid } }).then(
      (response) => {
        res.status(200).json(response);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

route.post("/details", async (req, res) => {
  try {
    await Order_Detail.findAll({ where: { order_id: req.body.order_id } }).then(
      (response) => {
        console.log(response);
        res.status(200).json(response);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

module.exports = route;
