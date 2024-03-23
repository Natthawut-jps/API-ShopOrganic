const express = require("express");
const route = express.Router();

// import chilren private
// Client-Side
const cart_favorite  = require('./cart_favorite');
const address = require('./address');
const userInfo = require('./userInfo');
const orders = require('./orders');

// private route authentication Client-Side
route.use('/cart-favorite', cart_favorite);
route.use('/address', address);
route.use('/user', userInfo);
route.use('/order', orders);

module.exports = route;