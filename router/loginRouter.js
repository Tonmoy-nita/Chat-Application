//external imports
const express = require("express");

//internal impports
const { getLogin, login, logout } = require("../controller/loginController.js");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse.js");
const {
  doLoginValidators,
  doLoginValidationHandler,
} = require("../middlewares/login/loginValidators.js");
const { redirectLoggedIn } = require("../middlewares/common/checkLogin.js");

const router = express.Router();

const page_title = "Login";
//login page
router.get("/", decorateHtmlResponse(page_title), redirectLoggedIn, getLogin);

//process login
router.post(
  "/",
  decorateHtmlResponse(page_title),
  doLoginValidators,
  doLoginValidationHandler,
  login
);

logout;
router.delete("/", logout);
//export routes
module.exports = router;
