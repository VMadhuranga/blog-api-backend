const asyncHandler = require("express-async-handler");
const { param, body, validationResult } = require("express-validator");

const PostModel = require("../../models/post-model");

const updateModel = [
  param("post_id").trim().isMongoId().escape(),
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
  body("publish").optional().trim().escape(),

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

    const post = new PostModel({
      title: req.body.title,
      content: req.body.content,
      isPublished: req.body.publish && req.body.publish === "yes",
      _id: req.params.post_id,
    });

    await PostModel.findByIdAndUpdate(req.params.post_id, post);

    res.json({ message: "Post updated" });
  }),
];

module.exports = updateModel;
