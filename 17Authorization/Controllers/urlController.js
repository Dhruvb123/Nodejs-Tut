const URL = require("../Models/urlModel");
const shortId = require("shortid");

async function createShortURl(req, res) {
  const { originalURL } = req.body;
  const shortURL = shortId.generate(6);

  console.log(req.body);

  await URL.create({ originalURL, shortURL, userId: req.user.id });
  res.redirect("/history");
}

async function getURLHistory(req, res) {
  const urls = await URL.find({ userId: req.user.id });
  return res.render("history", { urls });
}

function getHomePage(req, res) {
  return res.render("home");
}

async function getAdminDashBoard(req, res) {
  const urls = await URL.find({});
  console.log(urls);
  return res.render("admin", { urls });
}

async function redirectShortURL(req, res) {
  const shortUrl = req.params.shortId;
  const urlObj = await URL.findOne({ userId: req.user.id, shortUrl });
  if (!shortUrl || !urlObj) {
    return res.render("home");
  }
  return res.redirect(urlObj.originalURL);
}

module.exports = {
  createShortURl,
  getURLHistory,
  getHomePage,
  getAdminDashBoard,
};
