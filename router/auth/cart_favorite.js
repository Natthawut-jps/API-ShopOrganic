const express = require('express');
const route = express.Router();
const { Cart } = require('../../model/Cart');
const { Favorite } = require('../../model/Favorite');

// Cart
route.get('/cart', async (req, res, next) => {
    const cart = await Cart.findAll();
    if(cart) {
        res.status(200).json(cart);
    } else {
        res.status(200).json({});
    }
});
route.post('/addTocart', async (req, res, next) => {
    const { id, name, price, categories, rating } = req.body;
    console.log(req.user)
    if (req.body) {
        await Cart.create({
            name: name,
            price: price,
            categories: categories,
            rating: rating,
            imgURL: req.body.imgURL,
            pid: id,
            uid: req.user._uid
        }).then(async () => {
            res.send(await Cart.findAll())
        });
    } else {
        res.errored.message;
    };
});
route.post('/increase', async (req, res, next) => {
    const { pid, price } = req.body;
    const data = await Cart.findOne({ where: { pid: pid } });
    if (data) {
        await Cart.update({
            price: data.dataValues.price + parseInt(price),
            quantity: data.dataValues.quantity + 1,
        }, {
            where: {
                pid: pid
            }
        }).then(async () => {
            res.send(await Cart.findAll())
        });
    }
})
route.post('/decrease', async (req, res, next) => {
    const { pid, price } = req.body;
    const data = await Cart.findOne({ where: { pid: pid } });
    if (data) {
        await Cart.update({
            price: data.dataValues.price === price ? price : data.dataValues.price - price,
            quantity: data.dataValues.quantity === 1 ? 1 : data.dataValues.quantity - 1,
        }, {
            where: {
                pid: pid
            }
        }).then(async () => {
            res.send(await Cart.findAll())
        });
    }
})

route.post('/remove', async (req, res, next) => {
    const { id } = req.body;
    if (await Cart.findOne({ where: { pid: id } })) {
        await Cart.destroy({
            where: { pid: id },
            force: true
        }).then(async () => {
            res.send(await Cart.findAll())
        });
    } else {
        res.errored.message;
    }
});

route.post('/removeAll', async (req, res, next) => {
    const { check } = req.body;
    if (check) {
        await Cart.destroy({ truncate: true }).then(async () => {
            res.send(await Cart.findAll())
        });
    }
});

// Favorite
route.get('/favorite', async (req, res, next) => {
    res.send(await Favorite.findAll());
});
route.post('/addFavorite', async (req, res, next) => {
    const { id, name, price, categories, rating, uid } = req.body;
    if (req.body) {
        await Favorite.create({
            name: name,
            price: price,
            categories: categories,
            rating: rating,
            imgURL: '/img/Tometo.png',
            pid: id,
            uid: uid
        }).then(async () => {
            res.send(await Favorite.findAll())
        });
    } else {
        res.errored.message;
    };
});
route.post('/removeFavorite', async (req, res, next) => {
    const { id } = req.body;
    if (await Favorite.findOne({ where: { pid: id } })) {
        await Favorite.destroy({
            where: { pid: id },
            force: true
        }).then(async () => {
            res.send(await Favorite.findAll())
        });
    } else {
        res.errored.message;
    }
})

route.post('/removeAllFavorite', async (req, res, next) => {
    const { check } = req.body;
    if (check) {
        await Favorite.destroy({ truncate: true }).then(async () => {
            res.send(await Favorite.findAll())
        });
    }
});

module.exports = route;