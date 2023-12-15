const express = require('express');
const path = require('path');
const app = express();
const port = 8080;
const cors = require('cors');
const CartandFavorite  = require('./router/CartandFavorite');
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

// router
app.use('/CartAndFavorite', CartandFavorite);

// listen server
app.listen(port, () => {
    console.log(`successfully a port ${port}`)
})