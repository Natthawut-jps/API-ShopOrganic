require("dotenv").config({ path: "../.env.local" });
const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const { Userinfo } = require("../model/Userinfo");
const { Admin } = require("../model/admin/Admin");

// login username and password auth validation
passport.use(
  "login_username",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false,
    },
    async (email, password, cb) => {
      try {
        const user = await Userinfo.findOne({ where: { email: email } });
        if (user) {
          if (await bcrypt.compare(password, user.password)) {
            const _ut = jwt.sign(
              { _uid: user.dataValues.email },
              process.env.DOTENV_JWT_UT,
              { algorithm: "HS384", expiresIn: "5m" }
            );
            const _ur = jwt.sign(
              { _uid: user.dataValues.email },
              process.env.DOTENV_JWT_UR,
              { algorithm: "HS384", expiresIn: "15d" }
            );
            return cb(null, { _ut: _ut, _ur: _ur });
          } else {
            cb(" Incorrect password");
          }
        } else {
          return cb(null, false, {
            massage: " username and password Incorrect !New create Account",
          });
        }
      } catch (error) {
        cb(error, null);
      }
    }
  )
);
// admin Login
passport.use(
  "admin_login",
  new LocalStrategy(async (username, password, cb) => {
    try {
      const admin = await Admin.findOne({ where: { username: username } });
      if (admin) {
        if (await bcrypt.compare(password, admin.password)) {
          const _uta = jwt.sign(
            { _uida: admin.dataValues.username },
            process.env.DOTENV_JWT_UT_ADMIN,
            { algorithm: "HS384", expiresIn: "3m" }
          );
          const _ura = jwt.sign(
            { _uida: admin.dataValues.username },
            process.env.DOTENV_JWT_UR_ADMIN,
            { algorithm: "HS384", expiresIn: "5d" }
          );
          return cb(null, { _uta: _uta, _ura: _ura });
        } else {
          cb(" Incorrect password");
        }
      } else {
        return cb(null, false, {
          massage: " username and password Incorrect !New create Account",
        });
      }
    } catch (error) {
      cb(error, null);
    }
  })
);
// authentication endpoint at Authorize
passport.use(
  "auth_usp",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.DOTENV_JWT_UT,
    },
    async (payload, cb) => {
      try {
        if (payload) {
          return cb(null, payload);
        } else {
          return cb(null, false, {
            massage: " error payload null or undefind incorrect",
          });
        }
      } catch (error) {
        cb(error, null);
      }
    }
  )
);
passport.use(
  "admin_auth_usp",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.DOTENV_JWT_UT_ADMIN,
    },
    async (payload, cb) => {
      try {
        if (payload) {
          return cb(null, payload);
        } else {
          return cb(null, false, {
            massage: " error payload null or undefind incorrect",
          });
        }
      } catch (error) {
        cb(error, null);
      }
    }
  )
);

// auth profiles user data store private
passport.use(
  "admin_authorized",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.DOTENV_JWT_UR_ADMIN,
    },
    async (payload, cb) => {
      try {
        if (payload) {
          const _uta = jwt.sign(
            { _uida: payload._uida },
            process.env.DOTENV_JWT_UT_ADMIN,
            {
              algorithm: "HS384",
              expiresIn: "3m",
            }
          );
          const _ura = jwt.sign(
            { _uida: payload._uida },
            process.env.DOTENV_JWT_UR_ADMIN,
            {
              algorithm: "HS384",
              expiresIn: "5d",
            }
          );
          return cb(null, { _uta: _uta, _ura: _ura });
        } else {
          return cb(null, false, {
            massage: " error please you login again!!",
          });
        }
      } catch (error) {
        cb(error, false);
      }
    }
  )
);

passport.use(
  "authorized",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.DOTENV_JWT_UR,
    },
    async (payload, cb) => {
      try {
        if (payload) {
          const _ut = jwt.sign(
            { _uid: payload._uid },
            process.env.DOTENV_JWT_UT,
            {
              algorithm: "HS384",
              expiresIn: "5m",
            }
          );
          const _ur = jwt.sign(
            { _uid: payload._uid },
            process.env.DOTENV_JWT_UR,
            {
              algorithm: "HS384",
              expiresIn: "15d",
            }
          );
          return cb(null, { _ut: _ut, _ur: _ur });
        } else {
          return cb(null, false, {
            massage: " error please you login again!!",
          });
        }
      } catch (error) {
        cb(error, false);
      }
    }
  )
);

passport.use(
  "reset_password_new",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.DOTENV_JWT_RESET_PASSWORD,
    },
    async (payload, cb) => {
      try {
        if (payload) {
          return cb(null, payload);
        } else {
          return cb(null, false, {
            massage: " error payload null or undefind incorrect",
          });
        }
      } catch (error) {
        cb(error, null);
      }
    }
  )
);
