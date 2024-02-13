const express = require("express");

const commentController = require("../controllers/comment-controller/index");

const router = express.Router();

router.get("/:post_id/comments", commentController.getComments);

module.exports = router;
