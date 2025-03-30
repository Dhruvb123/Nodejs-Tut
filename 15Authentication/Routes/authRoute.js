const express = require("express");

const {
  getHomePage,
  getLoginPage,
  getSignUpPage,
  login,
  signUp,
  logout,
} = require("../Controller/authController");

const router = express.Router();

// CUSTOM MIDDLEWARE IMPORT
const { isAuth } = require("../Middleware/Auth");

// SignUp Routes
router.get("/signup", getSignUpPage);
router.post("/signup", signUp);

// Login Routes
router.get("/login", getLoginPage);
router.post("/login", login);

// Other Routes Route
router.get("/", isAuth, isAuth, getHomePage);
router.get("/logout", logout);

module.exports = { authRoutes: router };
