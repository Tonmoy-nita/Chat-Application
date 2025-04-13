//external imports
const express = require("express");

//internal impports
const { getUsers } = require("../controller/usersController.js");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse.js");
const avatarUpload = require("../middlewares/users/avatarUpload.js");
const {
  addUserValidators,
  addUserValidationHandler,
  addUser,
} = require("../middlewares/users/userValidators.js");

const router = express.Router();

//Users page
router.get("/", decorateHtmlResponse("Users"), getUsers);

//add user
router.post(
  "/",
  avatarUpload,
  addUserValidators,
  addUserValidationHandler,
  addUser
);

//export routes
module.exports = router;
