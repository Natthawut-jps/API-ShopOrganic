require('dotenv').config({ path: './.env.local'});
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
require('./model/Admin');
require('./model/Transaction');

// import route
const logins = require('./router/Logins');
const register = require('./router/register');
// public route
app.use('/login', logins);
app.use('/register', register);

// import private route
const auth = require('./router/auth');
const authorize = require('./router/authorization');

// private route
app.use('/auth', passport.authenticate('auth_usp', { session: false }), auth);
app.use('/refresh/r_auth', passport.authenticate("authorized", { session: false }), async (req, res) => {
    res.status(200).json(req.user)
});

// listen server
app.listen(process.env.DOTENV_PORT, () => {
    console.log(`successfully a port ${process.env.DOTENV_PORT}`)
})