const express = require("express");
const passport = require("passport");
const route = express.Router();

route.post("/admin", async (req, res, next) => {
  passport.authenticate(
    "admin_login",
    { session: false },
    async (err, user) => {
      try {
        if (user._uta && user._ura) {
          res.status(200).json(user);
        } else {
          res.status(401).send(err);
        }
      } catch (error) {
        res.status(401).send(error);
      }
    }
  )(req, res, next);
});

module.exports = route;
