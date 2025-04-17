//external imports
const express = require("express");

//internal impports
const { getInbox } = require("../controller/inboxController.js");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse.js");
const checkLogin = require("../middlewares/common/checkLogin.js");

const router = express.Router();

//Inbox page
router.get("/", decorateHtmlResponse("Inbox"), checkLogin, getInbox);

//export routes
module.exports = router;
