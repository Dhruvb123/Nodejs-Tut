const express = require("express");
const {
  getLoginPage,
  getSignupPage,
  postLoginPage,
  postSignupPage,
  logout,
} = require("../Controllers/authController");

const router = express.Router();

router.get("/login", getLoginPage);
router.get("/signup", getSignupPage);

router.post("/login", postLoginPage);
router.post("/signup", postSignupPage);

router.get("/logout", logout);

module.exports = router;
