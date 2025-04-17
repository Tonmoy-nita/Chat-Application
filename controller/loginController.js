//external imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//internal imports
const { User } = require("../models/People.js");

//login controller function

function getLogin(req, res, next) {
  res.render("index");
}

async function login(req, res, next) {
  try {
    //find a user who has this email/username
    const user = await User.findOne({
      $or: [{ email: req.body.username }, { phone: req.body.username }],
    });

    if (user && user._id) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (isValidPassword) {
        //prepare the user object to generate token
        const userObject = {
          username: user.name,
          mobile: user.mobile,
          email: user.email,
          role: "user",
        };

        //generate token

        const token = jwt.sign(userObject, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRY,
        });

        //set cookies

        res.cookie(process.env.COOKIE_NAME, token, {
          maxAge: process.env.JWT_EXPIRY,
          httpOnly: true,
          signed: true,
        });

        // res.locals.loggedInUser = userObject;
      } else {
      }
    } else {
    }
  } catch (err) {}
}

module.exports = {
  getLogin,
};
