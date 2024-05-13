const express = require("express");
const route = express.Router();

// route public
const logins = require("./Logins");
const register = require("./register");
const admin_login = require("./admin_login");
const products = require("./product");
const categories = require("./categories");
const reset_password = require("./reset_password");
const contact = require("./contact");

route.use("/register", register);
route.use("/login", logins);
route.use("/admin_login", admin_login);
route.use("/products", products);
route.use("/categories", categories);
route.use("/reset_password", reset_password);
route.use("/contact", contact);

module.exports = route;
