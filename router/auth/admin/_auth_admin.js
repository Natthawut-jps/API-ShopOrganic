const express = require("express");
const route = express.Router();


// Admin-Side
const categories = require('./categories');
const products = require('./products');
const orders =require("./orders");
const customers = require("./customers");

// private route authentication Admin-Side
route.use('/categories', categories);
route.use('/products', products);
route.use('/orders', orders);
route.use('/customers', customers);


module.exports = route;