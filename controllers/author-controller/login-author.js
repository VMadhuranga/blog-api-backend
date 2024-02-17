/* eslint-disable import/no-extraneous-dependencies */
require("dotenv").config();
const asyncHandler = require("express-async-handler");
const { body, validationResult, matchedData } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const AuthorModel = require("../../models/author-model");

const loginAuthor = [
  body("user_name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("User name should not be empty")
    .isAlphanumeric()
    .withMessage("User name should only contain letters and numbers")
    .escape(),
  body("password")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Password should not be empty")
    .isAlphanumeric()
    .withMessage("Password should only contain letters and numbers")
    .escape(),

  asyncHandler(async (req, res, next) => {
    const data = matchedData(req);

    const author = await AuthorModel.findOne({
      userName: req.body.user_name,
    }).exec();

    if (!author && data.user_name) {
      await body("user_name")
        .custom(() => {
          throw new Error("Invalid user name");
        })
        .run(req);
    }

    if (author && data.password) {
      await body("password")
        .custom(async (value) => {
          if (!(await bcrypt.compare(value, author.password))) {
            throw new Error("Incorrect password");
          }
        })
        .run(req);
    }

    const errors = validationResult(req);
    const error = new Error();

    if (!errors.isEmpty()) {
      error.message = "Invalid input";
      error.statusCode = 401;
      error.data = errors.array();
      throw error;
    }

    const secret = process.env.SECRET_KEY;
    const options = {
      expiresIn: 60,
    };

    const token = jwt.sign({ userName: req.body.user_name }, secret, options);

    res.json({ message: "Authorized", token });
  }),
];

module.exports = loginAuthor;
