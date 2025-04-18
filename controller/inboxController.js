//external imports
const createError = require("http-errors");

//internal imports
const User = require("../models/People.js");
const Conversation = require("../models/Conversation.js");
const Message = require("../models/Message.js");
const escape = require("../utilities/escape.js");

//login controller function(get index page)

async function getInbox(req, res, next) {
  try {
    const conversations = await Conversation.find({
      $or: [
        { "creator.id": req.user.userid },
        { "participation.id": req.user.userid },
      ],
    });
    req.locals.data = conversations;
    res.render("inbox");
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getInbox,
};
