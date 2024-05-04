const express = require("express");
const route = express.Router();

// Admin-Side
const categories = require("./categories");
const products = require("./products");
const orders = require("./orders");
const customers = require("./customers");
const dashboad = require("./dashboad");
const excel_order = require("./excel");
const contact = require("./contact");

// private route authentication Admin-Side
route.use("/categories", categories);
route.use("/products", products);
route.use("/orders", orders);
route.use("/customers", customers);
route.use("/dashboads", dashboad);
route.use("/excel", excel_order);
route.use("/contact", contact);

module.exports = route;
