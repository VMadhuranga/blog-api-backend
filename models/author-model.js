const mongoose = require("mongoose");

const { Schema } = mongoose;

const AuthorSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("Author", AuthorSchema);
