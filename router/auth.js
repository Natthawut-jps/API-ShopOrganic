const express = require("express");
const route = express.Router();
const passport = require('passport');

// import chilren private
const cart_favorite  = require('./CartandFavorite');
const address = require('./address');

// private route authentication
route.use('/CartAndFavorite', passport.authenticate('auth_usp', { session: false }), cart_favorite);
route.use('/address', passport.authenticate('auth_usp', { session: false }), address);

module.exports = route;