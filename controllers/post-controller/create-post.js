const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const PostModel = require("../../models/post-model");

const createPost = [
  body("title")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Title should not be empty")
    .escape(),
  body("content")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Content should not be empty")
    .escape(),
  body("publish").optional().trim().unescape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new Error("Invalid input");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    const post = new PostModel({
      title: req.body.title,
      content: req.body.content,
      isPublished: req.body.publish && req.body.publish === "yes",
    });

    await post.save();

    res.status(200).json({ message: "Post created" });
  }),
];

module.exports = createPost;
