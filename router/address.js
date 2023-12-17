const express = require("express");
const route = express.Router();
const { Shipping_address } = require('../model/Shipping_address');
const { Userinfo } = require('../model/Userinfo');

route.post('/ia', async(req, res) => {
    try {
        if( req.body && req.user ) {
            const user = await Userinfo.findOne({ email: req.user.email });
            if( user ) {
                const address = await Shipping_address.create({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    company: req.body.company,
                    street: req.body.street,
                    county: req.body.county,
                    tambon: req.body.tambon,
                    zipCode: req.body.zipCode,
                    email: req.body.email,
                    phone: req.body.phone
                });
                return res.json( address );
            } else {
               return res.send(' error incorrect user not account');
            };
        } else {
           return res.send(' !error none data info ');
        };
    } catch(error) {
        res.send( error );
    }
});

module.exports = route;