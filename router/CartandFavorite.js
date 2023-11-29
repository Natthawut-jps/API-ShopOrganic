const express = require('express');
const route = express.Router();
const { Cart } = require('../model/Cart');

route.get('/', async (req, res, next) => {
    const cart = await Cart.findAll();
    res.send(cart)
});
route.post('/increaseCart', async (req, res, next) => {
    const { id, name, price, categories, rating, uid } = req.body;
    const data = await Cart.findOne({ where: { pid: id } });
    if (data) {
        await Cart.update({
            price: price + data.dataValues.price,
            quantity: data.dataValues.quantity + 1,
        }, {
            where: {
                uid: id
            }
        })
    } else {
        await Cart.create({
            name: name,
            price: price,
            categories: categories,
            rating: rating,
            imgURL: 'http://localhost:8080/img/Tometo.png',
            pid: id,
            uid: uid
        });
    }
    res.send(await Cart.findAll());
});

route.post('/decrease', async (req, res, next) => {
    const { id } = req.body;
    if (await Cart.findOne({ where: { pid: id } })) {
        await Cart.destroy(
            { where: { pid: id }, force: true })
    };
    res.send(await Cart.findAll());
});

module.exports = route;