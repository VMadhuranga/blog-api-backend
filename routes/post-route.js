const express = require("express");

const postController = require("../controllers/post-controller/index");

const router = express.Router();

router.get("/", postController.getPosts);
router.get("/:post_id", postController.getPost);

module.exports = router;
