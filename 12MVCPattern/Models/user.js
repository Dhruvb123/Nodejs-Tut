const mongoose = require("mongoose");

// Schema
const userSchema = mongoose.Schema({
  name: { type: String },
  age: { type: Number },
  email: { type: String, required: true },
});

// Model
const User = mongoose.model("users", userSchema);

module.exports = { User };
