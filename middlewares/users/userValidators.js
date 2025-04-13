//external imports
const { check } = require("express-validator");

const addUserValidators = [
  check("name")
    .isLength({ min: 1 })
    .withMessage("Name is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not contain anything other than alphabet")
    .trim(),

  check("email")
    .isEmail()
    .withMessage("Invalid email address")
    .trim()
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          throw createError("Email already is use!");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),

  check("mobile")
    .isMobilePhone("en-IN", {
      strictMode: true, //country code chara allow korbe na
    })
    .withMessage("Mobile number must be a valid Indian mobile number")
    .custom(async (value) => {
      try {
        const user = await User.findOne({ mobile: value });
        if (user) {
          throw createError("Mobile number already is use");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  check("password")
    .isStrongPassword()
    .withMessage(
      "Password must be at least * characters long & should contain at least 1 lowercase, 1 uppercase, 1 number, 1 special character"
    ),
];

module.exports = {
  addUserValidators,
};
