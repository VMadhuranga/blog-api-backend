const express = require("express");

const postController = require("../controllers/post-controller/index");
const commentRouter = require("./comment-route");

const router = express.Router();
router.use(commentRouter);

router.get("/", postController.getPosts);
router.post("/", postController.createPost);
router.get("/:post_id", postController.getPost);
router.put("/:post_id", postController.updatePost);

module.exports = router;
