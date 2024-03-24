const express = require("express");
const route = express.Router();


// Admin-Side
const categories = require('./categories');
const products = require('./products');

// private route authentication Admin-Side
route.use('/categories', categories);
route.use('/products', products);

module.exports = route;