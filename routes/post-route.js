const express = require("express");

const postController = require("../controllers/post-controller/index");

const router = express.Router();

router.get("/", postController.getPosts);

module.exports = router;
