const asyncHandler = require("express-async-handler");
const { param, validationResult } = require("express-validator");

const PostModel = require("../../models/post-model");

const getPost = [
  param("post_id").trim().isMongoId().escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const error = new Error();

    if (!errors.isEmpty()) {
      error.message = "URL not recognized";
      error.statusCode = 404;
      throw error;
    }

    const post = await PostModel.findById(req.params.post_id).exec();

    if (!post) {
      error.message = "Resource not found";
      error.statusCode = 404;
      throw error;
    }

    res.json(post);
  }),
];

module.exports = getPost;
