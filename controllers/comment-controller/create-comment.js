const asyncHandler = require("express-async-handler");
const { param, body, validationResult } = require("express-validator");

const CommentModel = require("../../models/comment-model");

const createComment = [
  param("post_id").trim().isMongoId().escape(),
  body("user_name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("User name must not be empty")
    .escape(),
  body("comment")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Comment must not be empty")
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const error = new Error();

    if (errors.array().find((err) => err.path === "post_id")) {
      error.message = "URL not recognized";
      error.statusCode = 404;
      throw error;
    }

    const bodyErrors = errors.array().filter((err) => err.location === "body");

    if (bodyErrors.length > 0) {
      error.message = "Invalid input";
      error.statusCode = 422;
      error.data = bodyErrors;
      throw error;
    }

    const comment = new CommentModel({
      text: req.body.comment,
      commentedUser: req.body.user_name,
      commentedPost: req.params.post_id,
    });

    await comment.save();

    res.status(201).json({ message: "Comment created" });
  }),
];

module.exports = createComment;
