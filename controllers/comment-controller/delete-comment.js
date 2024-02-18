const asyncHandler = require("express-async-handler");
const { param, validationResult } = require("express-validator");

const CommentModel = require("../../models/comment-model");

const deleteComment = [
  param("post_id").trim().isMongoId().escape(),
  param("comment_id").trim().isMongoId().escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.array()) {
      const error = new Error("URL not recognized");
      error.statusCode = 404;
      throw error;
    }

    await CommentModel.findByIdAndDelete(req.params.comment_id);

    res.json({ message: "Comment deleted" });
  }),
];

module.exports = deleteComment;
