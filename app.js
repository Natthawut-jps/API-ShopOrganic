require('dotenv').config({ path: './.env'});
require('./router/passport');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const path = require('path');
const app = express();
// middlewere
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

// model
require('./model/Cart');
require('./model/Favorite');
require('./model/Order');
require('./model/Products');
require('./model/Shipping_address');
require('./model/Current_address');
require('./model/Userinfo');

// import route
const logins = require('./router/Logins');
const register = require('./router/register');
// public route
app.use('/login', logins);
app.use('/register', register);

// import private route
const cart_favorite  = require('./router/CartandFavorite');
const auth = require('./router/authorization');
// private route
app.use('/CartAndFavorite', passport.authenticate('auth_usp', { session: false }), cart_favorite);
app.use('/address', passport.authenticate('auth_usp', { session: false }), )
// listen server
app.listen(process.env.PORT, () => {
    console.log(`successfully a port ${process.env.PORT}`)
})