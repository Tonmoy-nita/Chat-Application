//external imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

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
    //jodi user valid hoi abong database e user r data store thake orthat valid user with user._id
    if (user && user._id) {
      //ebar password check hobe ager paoa valid user r database e store password abong login page e enter kora password r sathe
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      //jodi password math hoi then valid user r token generate kora hobe
      if (isValidPassword) {
        //prepare the user object to generate token(JWT token r body)
        const userObject = {
          username: user.name,
          mobile: user.mobile,
          email: user.email,
          role: "user",
        };

        //generate token
        //jwt token r body userObject and signature JWT_SECRET
        const token = jwt.sign(userObject, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRY,
        });

        // ebar user r login kora hole take authentication token doa hobe jate take onno requrest r jonno bar bar login korte na hoi
        //seti hobe JWT_TOKEN(token) r madhome abong sei token ti ke user ke pathano hobe cookie r madhome
        //set cookies

        res.cookie(process.env.COOKIE_NAME, token, {
          maxAge: process.env.JWT_EXPIRY,
          httpOnly: true,
          signed: true,
        });

        res.locals.loggedInUser = userObject;

        res.render("inbox");
      } else {
        throw createError("Login failed! please try again");
      }
    } else {
      throw createError("User not found");
    }
  } catch (err) {
    res.render("index", {
      data: {
        username: req.body.username,
      },
      errors: {
        common: {
          message: err.message, //display the error message
        },
      },
    });
  }
}

module.exports = {
  getLogin,
  login,
};
