const asyncHandler = require("express-async-handler");
const { param, validationResult } = require("express-validator");

const PostModel = require("../../models/post-model");
const CommentModel = require("../../models/comment-model");

const getComments = [
  param("post_id").trim().isMongoId().escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const error = new Error();

    if (!errors.isEmpty()) {
      error.message = "URL not recognized";
      error.statusCode = 404;
      throw error;
    }

    const [post, comments] = await Promise.all([
      PostModel.findById(req.params.post_id, "_id").lean().exec(),

      CommentModel.find({
        commentedPost: req.params.post_id,
      })
        .sort({ _id: 1 })
        .exec(),
    ]);

    if (!post) {
      error.message = "Resource not found";
      error.statusCode = 404;
      throw error;
    }

    res.json(comments);
  }),
];

module.exports = getComments;
