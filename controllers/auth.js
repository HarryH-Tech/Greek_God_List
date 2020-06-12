const User = require("../models/User");
const jwt = require("jsonwebtoken"); //generate signed token
const expressJwt = require("express-jwt"); //authorization check

const { errorHandler } = require("../helpers/dbErrorHandler");

exports.signup = (req, res) => {
  console.log(req.body);
  const user = new User(req.body);
  user.save((error, user) => {
    if (error) {
      console.log("ERROR IN CONTROLER  = ", error);
      return res.status(400).json({
        error: errorHandler(error),
      });
    }
    user.salt = undefined;
    user.hashedPassword = undefined;
    res.json({
      user,
    });
  });
};

exports.signin = (req, res) => {
  //find user based on email
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with that email does not exist.",
      });
    }

    //if user found ensure email and password match
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password do not match.",
      });
    }

    //generate sign token with user id and secret
    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_SECRET
    );

    res.cookie("t", token, { expire: new Date() + 9999 });
    //return response with user and token to client
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, email, name, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "Signout Successful" });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: "auth",
});

exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    return res.status(403).json({
      error: "Access Denied",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  //if role = 0 user is not an admin
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "Admin Only! Access Denied.",
    });
  }
  next();
};
