const express = require("express");
const passport = require("passport");

const authorController = require("../controllers/author-controller/index");
const postRouter = require("./post-route");

const router = express.Router();

router.post("/login", authorController.loginAuthor);
router.use(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  postRouter,
);

module.exports = router;
