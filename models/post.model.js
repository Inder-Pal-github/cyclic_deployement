const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  creator: { type: String, required: true },
  userId:{type:String, required: true },
  createdAt: { type: Date, default: new Date() },

});

const PostModel = mongoose.model("post", PostSchema);
module.exports = { PostModel };
