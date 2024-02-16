const express = require("express");
const route = express.Router();

// import chilren private
const cart_favorite  = require('./CartandFavorite');
const address = require('./address');
const userInfo = require('./userInfo');

// private route authentication
route.use('/CartAndFavorite', cart_favorite);
route.use('/address', address);
route.use('/user', userInfo);


module.exports = route;