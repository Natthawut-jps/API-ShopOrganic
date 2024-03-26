const express = require("express");
const route = express.Router();
const { Order } = require("../../../model/Order");

route.get('/get_orders', async (req, res) => {
    const orders = await Order.findAll();
    if(orders) {
        res.status(200).json(orders)
    }
})

module.exports = route;