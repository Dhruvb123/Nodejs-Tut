const express = require("express");

const {
  getLogin,
  postLogin,
  getSignup,
  postSignup,
  getHomePage,
  logout,
} = require("../Controllers/authController");
const { isAuth } = require("../Middleware/authMiddleware");

const router = express.Router();

router.get("/login", getLogin);
router.post("/login", postLogin);

router.get("/signup", getSignup);
router.post("/signup", postSignup);

router.get("/", isAuth, getHomePage);
router.get("/logout", isAuth, logout);

module.exports = router;
