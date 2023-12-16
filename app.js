require('dotenv').config({ path: './.env'});
require('./router/passport');
const express = require('express');
const cors = require('cors');
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
// public route
app.use('/login', logins)

// import private route
const cartand_favorite  = require('./router/CartandFavorite');
const passport = require('passport');
// private route
app.use('/CartAndFavorite', cartand_favorite);

// listen server
app.listen(process.env.PORT, () => {
    console.log(`successfully a port ${process.env.PORT}`)
})