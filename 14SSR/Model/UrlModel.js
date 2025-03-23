const mongoose = require("mongoose");

const urlSchema = mongoose.Schema({
  originalURL: { type: String, require: true },
  shortURL: { type: String, require: true },
  visited: [],
});

const urlModel = mongoose.model("URL", urlSchema);

module.exports = urlModel;
