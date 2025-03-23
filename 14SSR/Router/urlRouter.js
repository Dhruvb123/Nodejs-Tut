const express = require("express");
const {
  createShortUrl,
  redirectShortURL,
} = require("../Controllers/urlController");
const urlRouter = express.Router();

urlRouter.route("/").post(createShortUrl);

urlRouter.route("/:url").get(redirectShortURL);

module.exports = { urlRouter };
