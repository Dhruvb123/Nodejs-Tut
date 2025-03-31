const mongoose = require("mongoose");

const urlSchema = mongoose.Schema(
  {
    originalURL: { type: String, required: true },
    shortURL: { type: String, required: true, unique: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("URL", urlSchema);
