const express = require("express");
const route = express.Router();


// route public
const logins = require('./Logins');
const register = require('./register');

route.use('/register', register);
route.use('/login', logins);

module.exports = route;
