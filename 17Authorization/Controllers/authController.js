const { generateToken } = require("../Middlewares/authMiddleware");
const User = require("../Models/userModel");

async function getLoginPage(req, res) {
  console.log("Login Get Route Reached");
  return res.render("login");
}

async function getSignupPage(req, res) {
  return res.render("signup");
}

async function postLoginPage(req, res) {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).redirect("/login");
    }

    const data = {
      id: user._id,
      username: user.username,
      role: user.role,
    };
    const token = await generateToken(data);
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/");
  } catch (err) {
    console.log("Error in Login: ", err);
  }
}

async function postSignupPage(req, res) {
  console.log(req.body);
  const { username, password } = req.body;
  try {
    await User.create({ username, password });
    return res.redirect("/login");
  } catch (err) {
    console.log("Error in signup page: ", err);
  }
}

function logout(req, res) {
  res.clearCookie("token");
  res.redirect("/login");
}

module.exports = {
  getLoginPage,
  getSignupPage,
  postLoginPage,
  postSignupPage,
  logout,
};
