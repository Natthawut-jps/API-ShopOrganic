const express = require("express");
const route = express.Router();
const { Userinfo } = require("../model/Userinfo");

// import chilren private
const cart_favorite  = require('./CartandFavorite');
const address = require('./address');

// private route authentication

// Cart
route.use('/CartAndFavorite', cart_favorite);
// Address
route.use('/address', address);
// userInfo
route.get('/userInfo', async (req, res) => {
    const userInfo = await Userinfo.findOne({ where: { email: req.user._uid }});
    res.status(200).json(userInfo);
});
module.exports = route;