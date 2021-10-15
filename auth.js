const jwtSecret = "your_jwt_secret"; //must match key used in JWTStrategy

const { Router } = require("express");
const jwt = require("jsonwebtoken"),
  passport = require("passport");

require("./passport"); // local passport file

let generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username, //the username that is encoded into the JWT
    expiresIn: "7d", // time token will expire in
    algorithm: "HS256", //this algorithm is used to "sign" or encode the values of the JWT
  });
};

// post login

module.exports = (router) => {
  router.post("/login", (req, res) => {
    passport.authenticate("local", { session: false }, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: "something went wrong",
          user: user,
        });
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error);
        }
        let token = generateJWTToken(user.toJSON());
        return res.json({ user, token });
      });
    })(req, res);
  });
};
