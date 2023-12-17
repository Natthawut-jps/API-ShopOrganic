require("dotenv").config({ path: "../.env.local" });
const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const { Userinfo } = require("../model/Userinfo");

// login username and password auth validation
passport.use(
  "login_username",
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },
    async (email, password, cb) => {
      try {
        const user = await Userinfo.findOne({ email: email });
        if (user) {
          if (bcrypt.compare(password, user.password)) {
            const _ut = jwt.sign(
              { _uid: user.id },
              process.env.DOTENV_jwt_Secrect_ut,
              { algorithm: "HS384", expiresIn: "5m" }
            );
            const _ur = jwt.sign(
              { _uid: user.id },
              process.env.DOTENV_jwt_Secrect_ur,
              { algorithm: "HS384", expiresIn: "15d" }
            );
            return cb(null, { _ut: _ut, _ur: _ur });
          } else {
            cb(" Incorrect password");
          }
        } else {
          return cb(null, false,{ massage:  " username and password Incorrect !New create Account" });
        }
      } catch (error) {
        cb(error, null);
      }
    }
  )
);

// authentication endpoint at Authorize
passport.use('auth_usp', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.DOTENV_jwt_Secrect_ut
},
async( payload, cb ) => {
    try {
        if( payload ) {
            return cb(null, payload );
        } else {
            return cb(null, false, { massage: ' error payload null or undefind incorrect' });
        };
    } catch( error ) {
        cb( error, null );
    };
}
));

// auth profiles user data store private
passport.use(
  "authorized",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.DOTENV_jwt_Secrect_ut,
    },
    async (payload, cb) => {
      try {
        if (payload) {
          const _ut = jwt.sign(
            { _uid: payload._uid },
            process.env.DOTENV_jwt_Secrect_ut,
            {
              algorithm: "HS384",
              expiresIn: "5m",
            }
          );
          const _ur = jwt.sign(
            { _uid: user._uid },
            process.env.DOTENV_jwt_Secrect_ur,
            {
              algorithm: "HS384",
              expiresIn: "15d",
            }
          );
          return cb(null, { _ut: _ut, _ur: _ur });
        } else {
          return cb(null, false, { massage: " error please you login again!!" });
        }
      } catch (error) {
        cb(error, false);
      }
    }
  )
);
