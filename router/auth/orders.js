const express = require("express");
const route = express.Router();
const { Cart } = require('../../model/Cart');
const { Order_Detail } = require('../../model/Order_Detail');
const { Order } = require('../../model/Order');

route.post('/add', async (req, res) => {
    const cart = await Cart.findAll();
   await Order.create({
    payment_menthod: 'QR Code PrompPay',
    amount_total: req.body.amount_total,
    quantity: req.body.quantity,
    address_id: req.body.address_id,
    user_id: req.user._uid
   }).then((response) => {
    cart.map(async (item) => {
        await Order_Detail.create({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            categories: item.categories,
            p_id: item.pid,
            user_id: item.uid,
            order_id: response.id
        }).then(() => {
            Cart.truncate();
        })
    })
   })
   res.status(200).send('seccess')
})

module.exports = route;