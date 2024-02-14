const express = require("express");

const commentController = require("../controllers/comment-controller/index");

const router = express.Router();

router.get("/:post_id/comments", commentController.getComments);
router.post("/:post_id/comments", commentController.createComment);

module.exports = router;
