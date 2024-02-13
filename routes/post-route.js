const express = require("express");

const postController = require("../controllers/post-controller/index");
const commentRouter = require("./comment-route");

const router = express.Router();
router.use(commentRouter);

router.get("/", postController.getPosts);
router.get("/:post_id", postController.getPost);

module.exports = router;
