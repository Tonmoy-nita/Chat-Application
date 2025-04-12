//external imports
const express = require("express");

//internal impports
const { getUsers } = require("../controller/usersController.js");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse.js");
const avatarUpload = require("../middlewares/users/avatarUpload.js");

const router = express.Router();

//Users page
router.get("/", decorateHtmlResponse("Users"), getUsers);

//add user
router.post("/", avatarUpload);

//export routes
module.exports = router;
