const express = require("express");

const authorController = require("../controllers/author-controller/index");

const router = express.Router();

router.post("/login", authorController.loginAuthor);

module.exports = router;
