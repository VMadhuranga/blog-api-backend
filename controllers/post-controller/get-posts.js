const asyncHandler = require("express-async-handler");

const PostModel = require("../../models/post-model");

const getPosts = asyncHandler(async (req, res, next) => {
  const posts = await PostModel.find(
    { isPublished: true },
    "title createdDate isPublished",
  )
    .sort({ _id: 1 })
    .exec();

  res.json(posts);
});

module.exports = getPosts;
