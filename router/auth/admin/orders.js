const express = require("express");
const route = express.Router();
const { Order } = require("../../../model/Order");


route.get('/get_orders', async (req, res) => {
    await Order.findAll().then((response) => {
        res.status(200).json(response);
    })
})

module.exports = route;