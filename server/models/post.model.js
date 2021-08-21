const { model, Schema } = require("mongoose");

const postSchema = new Schema({
  body: {
    type: String,
    lowercase: true,
    trim: true,
  },
  username: "String",
  createdAt: Schema.Types.String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  comments: [
    {
      body: String,
      username: String,
      createdAt: String,
    },
  ],
  likes: [
    {
      username: String,
      createdAt: String,
    },
  ],
});

module.exports = model("Post", postSchema);
