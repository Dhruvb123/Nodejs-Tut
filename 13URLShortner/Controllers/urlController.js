const { urlModel } = require("../Model/UrlModel");
const { nanoid } = require("nanoid");

async function createShortUrl(req, res) {
  const url = req.body;

  if (!url) {
    return res.status(400).json("Please supply a URL");
  }

  var urlObj = urlModel.findById(url);
  if (urlObj) {
    return res.status(200).json("Short URL: ", urlObj.shortURL);
  }

  try {
    var entry = new urlModel({
      originalURL: url,
      shortURL: nanoid(8),
      visited: [],
    });
    await entry.save();
    return res.status(200).json("Short URL: ", entry.s);
  } catch (err) {
    console.log("Error in creating User -> ", err);
    return res.status(500).send("Error Occured while creating user");
  }
}

async function redirectShortURL(req, res) {
  const shortUrl = urlModel.findById(req.params.url);
  if (!shortUrl || shortUrl.length() !== 8) {
    return res.status(400).json("Please supply a Valid Short URL");
  }

  const urlObj = urlModel.findById(shortUrl);
  if (!urlObj) {
    return res.status(400).json("Please supply a Valid Short URL");
  }

  return res.redirect(urlObj.originalURL);
}

module.exports = { createShortUrl, redirectShortURL };
