const express = require("express");
const route = express.Router();
const passport = require("passport");

route.post('/authorization', async(req, res, next) => {
    passport.authenticate('authorized', { session: false }, async( err, auth) => {
        try {
            if( auth ) {
                res.json( auth )
            } else {
                res.send( err )
            }
        } catch( error ) {
            res.send(error)
        };

    })( req, res, next);
});

module.exports = route;