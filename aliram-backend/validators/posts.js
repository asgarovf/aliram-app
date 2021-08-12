/* const { body, validationResult } = require("express-validator");

exports.postCreateValidator = (req, res, next) => {
  body("text")
    .exists()
    .withMessage("Post text is required")
    .isLength({ min: 2, max: 500 })
    .withMessage("Length should be between 2 and 500");
  next();
}; */
