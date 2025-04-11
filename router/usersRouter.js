//external imports
const express = require("express");

//internal impports
const { getUsers } = require("../controller/usersController.js");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse.js");

const router = express.Router();

//Users page
router.get("/", decorateHtmlResponse("Users"), getUsers);

//export routes
module.exports = router;
