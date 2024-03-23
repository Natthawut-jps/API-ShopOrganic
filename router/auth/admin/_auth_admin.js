const express = require("express");
const route = express.Router();


// Admin-Side
const categories = require('./categories');

// private route authentication Admin-Side
route.use('/categories', categories);

module.exports = route;