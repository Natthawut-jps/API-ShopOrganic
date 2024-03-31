const express = require("express");
const route = express.Router();
const { Cart } = require("../../model/Cart");
const { Order_Detail } = require("../../model/Order_Detail");
const { Order } = require("../../model/Order");
const { Userinfo } = require("../../model/Userinfo");

route.post("/add", async (req, res) => {
  const cart = await Cart.findAll();
  const uid = await Userinfo.findOne({ where: { email: req.user._uid } });
  const customer_name = uid.dataValues.first_name + ' ' + uid.dataValues.last_name
  await Order.create({
    payment_menthod: "QR Code PrompPay",
    amount_total: req.body.amount_total,
    quantity: req.body.quantity,
    customer_name: customer_name,
    reference: "SO" + String(uid.dataValues.id) + new Date().getTime(),
    address_id: req.body.address_id,
    user_id: req.user._uid,
  }).then(async (response) => {
    await Order_Detail.bulkCreate(
      cart.map((item) => {
        const obj = new Object({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          categories: item.categories,
          imgURL: "Tometo.png",
          p_id: item.pid,
          user_id: item.uid,
          order_id: response.dataValues.id,
        });
        return obj;
      })
    ).then((response_2) => {
      Cart.truncate();
      res.status(200).json(response_2);
    });
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

route.get("/order_view_active", async (req, res) => {
  try {
    await Order.findOne({ where: {  user_id: req.user._uid, id: req.query.order_id } }).then(
      (response) => {
        res.status(200).json(response);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

route.get("/active_order", async (req, res) => {
  try {
    await Order_Detail.findAll({ where: { user_id: req.user._uid, order_id: req.query.order_id } }).then(
      (response) => {
        res.status(200).json(response);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

module.exports = route;
