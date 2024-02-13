const mongoose = require("mongoose");

const { Schema } = mongoose;

const CommentSchema = new Schema({
  text: { type: String, required: true },
  commentedUser: { type: String, required: true },
  commentedPost: { type: Schema.Types.ObjectId, ref: "Posts", required: true },
  createdDate: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Comments", CommentSchema);
