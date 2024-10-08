const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  title: {
    type: String,
  },
  post: {
    type: mongoose.Types.ObjectId,
    ref: "Post",
  },
  text: {
    type: String,
    required: true,
  },
  date_created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Comment = mongoose.model("Comment", CommentSchema);
