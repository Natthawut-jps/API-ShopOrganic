require("dotenv").config({ path: "./.env.local" });
require("./router/passport");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const path = require("path");
const app = express();
// middlewere
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

// model Client-Side
require("./model/Cart");
require("./model/Favorite");
require("./model/Order");
require("./model/Order_Detail");
require("./model/admin/Products");
require("./model/Shipping_address");
require("./model/Userinfo");
require("./model/Transaction");
// model Server-Side
require("./model/admin/Admin");
require("./model/admin/Categories");

// import route
const publict = require("./router/view/_public");

// public route
app.use("/public", publict);

// import private route
const auth = require("./router/auth/_auth");
const admin = require("./router/auth/admin/_auth_admin");
// private route
app.use("/auth", passport.authenticate("auth_usp", { session: false }), auth);
app.use(
  "/admin",
  passport.authenticate("admin_auth_usp", { session: false }),
  admin
);
app.use(
  "/refresh/r_auth",
  passport.authenticate("authorized", { session: false }),
  async (req, res) => {
    res.status(200).json(req.user);
  }
);
app.use(
  "/admin_authRefreshToken/refresh_token",
  passport.authenticate("admin_authorized", { session: false }),
  async (req, res) => {
    res.status(200).json(req.user);
  }
);

// listen server
app.listen(process.env.DOTENV_PORT, () => {
  console.log(`successfully a port ${process.env.DOTENV_PORT}`);
});
