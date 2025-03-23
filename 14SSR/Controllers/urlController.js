const urlModel = require("../Model/UrlModel");

// using nanoId that supprts ES Module as Common JS Module
async function getNanoid() {
  const { nanoid } = await import("nanoid");
  return nanoid;
}

async function createShortUrl(req, res) {
  console.log("create end-pt hit");
  const url = req.body.url;

  if (!url) {
    return res.status(400).json("Please supply a URL");
  }

  var urlObj = await urlModel.findOne({ originalURL: url });
  if (urlObj) {
    return res.status(200).json(urlObj.shortURL);
  }

  try {
    const nanoid = await getNanoid();
    var entry = new urlModel({
      originalURL: url,
      shortURL: nanoid(8),
      visited: [],
    });
    await entry.save();
    return res.status(200).json({ shortURL: entry.shortURL });
  } catch (err) {
    console.log("Error in creating User -> ", err);
    return res.status(500).send("Error Occured while creating user");
  }
}

async function redirectShortURL(req, res) {
  const object = await urlModel.findOne({ shortURL: req.params.url });

  if (!object || object.shortURL.length !== 8) {
    return res.status(400).send("Please supply a Valid Short URL");
  }

  object.visited.push(Date.now());

  await object.save();

  return res.redirect(object.originalURL);
}

async function getAnalytics(req, res) {
  const object = await urlModel.findOne({ shortURL: req.params.url });

  if (!object || object.shortURL.length !== 8) {
    return res.status(400).send("Please supply a Valid Short URL");
  }

  const totalVisits = object.visited.length;
  const lastVisit = formatTimestamp(object.visited[totalVisits - 1]);

  return res.status(200).json({ totalVisits, lastVisit });
}

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day}-${month}-${year} : ${hours} - ${minutes} - ${seconds}`;
}

module.exports = { createShortUrl, redirectShortURL, getAnalytics };
