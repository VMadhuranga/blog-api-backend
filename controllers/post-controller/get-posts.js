const asyncHandler = require("express-async-handler");

const PostModel = require("../../models/post-model");

const getPosts = asyncHandler(async (req, res, next) => {
  const isAuthorized = Boolean(req.headers.authorization);

  const posts = await PostModel.find(
    isAuthorized ? {} : { isPublished: true },
    `title createdDate ${isAuthorized ? "isPublished" : ""}`,
  )
    .sort({ _id: 1 })
    .exec();

  res.json(posts);
});

module.exports = getPosts;
