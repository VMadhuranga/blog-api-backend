/* eslint-disable import/no-extraneous-dependencies */

require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const RateLimit = require("express-rate-limit");
const jwtStrategy = require("./config/jwt-strategy");

const postRouter = require("./routes/post-route");
const authorRouter = require("./routes/author-route");

// Setup DB connection
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.error(error);
  }
}
connectDB();

const app = express();

// Add helmet to the middleware chain.
app.use(helmet());

// Set up rate limiter: maximum of sixty requests per minute
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60,
});
// Apply rate limiter to all requests
app.use(limiter);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression()); // Compress all routes
app.use(express.static(path.join(__dirname, "public")));

const corsOptions = {
  origin: [process.env.READER_URL, process.env.AUTHOR_URL],
};
app.use(cors(corsOptions));

// Setup passport
passport.use(jwtStrategy);

app.use("/posts", postRouter);
app.use("/author", authorRouter);

// error handler
app.use((err, req, res, next) => {
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "Something went wrong";
  const errData = err.data || null;
  const errStack = process.env.NODE_ENV === "development" ? err.stack : {};

  console.error(errStack);

  res.status(errStatus).json({
    message: errMsg,
    data: errData,
  });
});

module.exports = app;
