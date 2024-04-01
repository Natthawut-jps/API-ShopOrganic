const express = require("express");
const route = express.Router();


// route public
const logins = require('./Logins');
const register = require('./register');
const admin_login = require('./admin_login');
const admin_register = require('./admin_register');
const products = require('./product');
const categories = require('./categories');

route.use('/register', register);
route.use('/login', logins);
route.use('/admin_login', admin_login);
route.use('/admin_register', admin_register);
route.use('/products', products);
route.use('/categories', categories);

module.exports = route;
