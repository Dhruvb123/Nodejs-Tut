const User = require("../Model/user");

// Sign UP
async function getSignUpPage(req, res) {
  return res.render("signup");
}

async function signUp(req, res) {
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
async function getLoginPage(req, res) {
  return res.render("login");
}

async function login(req, res) {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).send("Invalid credentials.");
    }

    // Set cookie with user ID (for identification)
    res.cookie("userId", user._id.toString(), { httpOnly: true });
    res.redirect("/");
  } catch (err) {
    console.log("Login Error: ", err);
    res.status(500).send("Internal Server Error");
  }
}

// Auth App Routes
async function getHomePage(req, res) {
  if (!req.cookies.userId) {
    return res.redirect("/login");
  }

  const user = await User.findById(req.cookies.userId);
  return res.render("Home", { username: user.username });
}

function logout(req, res) {
  res.clearCookie("userId");
  res.redirect("/login");
}

module.exports = {
  getHomePage,
  getLoginPage,
  getSignUpPage,
  login,
  signUp,
  logout,
};
