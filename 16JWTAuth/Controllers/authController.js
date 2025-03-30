const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");

const dotenv = require("dotenv");
dotenv.config();

// Sign UP
async function getSignup(req, res) {
  return res.render("signup");
}

async function postSignup(req, res) {
  console.log("SignUp post route reached");
  const { username, password } = req.body;

  try {
    console.log("Signup Request Body: ", req.body);

    const newUser = await User.create({ username, password });
    console.log("User Created: ", newUser);

    res.redirect("/login");
  } catch (err) {
    console.error("Signup Error: ", err);
    res.status(400).send("Error: User already exists or invalid input.");
  }
}

// Login
async function getLogin(req, res) {
  console.log("Login Get Route Reached");
  return res.render("login");
}

async function postLogin(req, res) {
  console.log("Login Post Route Reached");
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePasswords(password))) {
      return res.status(401).send("Invalid credentials.");
    }

    // Generating jwt token

    // only this data will be signed and passed to backend.
    const data = {
      id: user._id,
      username: user.username,
    };
    const token = jwt.sign(data, process.env.JWT_SecretKey, {
      expiresIn: process.env.JWT_Expires_In,
    });

    res.cookie("token", token, { httpOnly: true, secure: false });
    res.redirect("/");
  } catch (err) {
    console.log("Login Error: ", err);
    res.status(500).send("Internal Server Error");
  }
}

// Auth App Routes
async function getHomePage(req, res) {
  console.log("Home Page Route Reached");
  const token = req.cookies.token;
  if (!token) {
    return res.redirect("/login");
  }

  try {
    const decodedData = jwt.verify(token, process.env.JWT_SecretKey);
    console.log(decodedData);
    const user = await User.findById(decodedData.id);
    return res.render("Home", { username: user.username });
  } catch (err) {
    res.status(401).send("Token Error");
  }
}

function logout(req, res) {
  res.clearCookie("token");
  res.redirect("/login");
}

module.exports = {
  getLogin,
  postLogin,
  getSignup,
  postSignup,
  getHomePage,
  logout,
};
