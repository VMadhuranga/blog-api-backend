const asyncHandler = require("express-async-handler");
const { param, validationResult } = require("express-validator");

const PostModel = require("../../models/post-model");
const CommentModel = require("../../models/comment-model");

const deletePost = [
  param("post_id").trim().isMongoId().escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new Error("URL not recognized");
      error.statusCode = 404;
      throw error;
    }

    const commentsByPost = await CommentModel.countDocuments({
      commentedPost: req.params.post_id,
    }).exec();

    if (commentsByPost) {
      await CommentModel.deleteMany({ commentedPost: req.params.post_id });
    }

    await PostModel.findByIdAndDelete(req.params.post_id);

    res.json({ message: "Post deleted" });
  }),
];

module.exports = deletePost;
