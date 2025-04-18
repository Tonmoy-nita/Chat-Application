//external imports
const express = require("express");

//internal impports
const { getInbox } = require("../controller/inboxController.js");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse.js");
const { checkLogin } = require("../middlewares/common/checkLogin.js");

const router = express.Router();

//Inbox page
router.get("/", decorateHtmlResponse("Inbox"), checkLogin, getInbox);

//search user for conversation
// router.post("/search", checkLogin, searchUser);

//add conversation
// router.post("/conversation", checkLogin, addConversation);

//get messages of a conversation
// router.get("/messages/:conversation_id", checkLogin, getMessages);

//send messages
// router.post("/messages", checkLogin, attachmentUpload, sendMessage);

//export routes
module.exports = router;
