const express = require("express");
const passport = require("passport");
const route = express.Router();

route.get("/auth/username", async (req, res, next) => {
  passport.authenticate(
    "login_username",
    { session: false },
    async (err, user) => {
      try {
        if (user) {
          return res.json(user);
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
