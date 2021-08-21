const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
  },
  password: {
    type: Schema.Types.String,
    required: true,
  },
  email: {
    type: Schema.Types.String,
    required: true,
    lowercase: true,
  },
  createdAt: Schema.Types.String,
});

module.exports = model("User", userSchema);
