const express = require("express");
const {
  getHomePage,
  getURLHistory,
  getAdminDashBoard,
  createShortURl,
  redirectShortURL,
} = require("../Controllers/urlController");
const { isAdmin } = require("../Middlewares/authMiddleware");

const router = express.Router();

router.get("/", getHomePage);

router.get("/history", getURLHistory);

router.post("/", createShortURl);

router.get("/url/:shortId", redirectShortURL);

router.get("/admin", isAdmin, getAdminDashBoard);

module.exports = router;
