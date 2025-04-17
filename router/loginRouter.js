//external imports
const express = require("express");

//internal impports
const { getLogin, login } = require("../controller/loginController.js");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse.js");
const {
  doLoginValidators,
  doLoginValidationHandler,
} = require("../middlewares/login/loginValidators.js");

const router = express.Router();

//login page
router.get("/", decorateHtmlResponse("Login"), getLogin);

//process login
router.post("/", doLoginValidators, doLoginValidationHandler, login);

//export routes
module.exports = router;
