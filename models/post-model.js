const mongoose = require("mongoose");

const { Schema } = mongoose;

const PostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  isPublished: { type: Boolean, default: false },
  createdDate: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Posts", PostSchema);
