const express = require("express");
const route = express.Router();
const { Userinfo } = require("../../../model/Userinfo");

route.get('/get_customers', async (req, res) => {
    const customers = await Userinfo.findAll();
    if(customers) {
        res.status(200).json(customers);
    }
})

module.exports = route;