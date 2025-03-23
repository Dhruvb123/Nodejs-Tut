const express = require("express");

const {
  createShortUrl,
  redirectShortURL,
  getAnalytics,
} = require("../Controllers/urlController");

const urlRouter = express.Router();

urlRouter.route("/").post(createShortUrl);

urlRouter.route("/:url").get(redirectShortURL);

urlRouter.route("/getAnalytics/:url").get(getAnalytics);

module.exports = { urlRouter };
