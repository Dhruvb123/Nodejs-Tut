const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

async function generateToken(data) {
  const token = jwt.sign(data, process.env.JWT_SecretKey, {
    expiresIn: process.env.JWT_ExpirerIn,
  });

  return token;
}

async function authenticateUser(req, res, next) {
  const token = req.cookie.token;
  if (!token) {
    res.redirect("/login");
  }

  jwt.verify(token, process.env.JWT_SecretKey, (err, user) => {
    if (err) console.log("Invalid Token: ", err);

    req.user = user;
    next();
  });
}

async function isAdmin(req, res, next) {
  const role = req.user.role;
  if (!role || role !== "admin") {
    return res.end("Unauthorized User");
  }
  next();
}

module.exports = { isAdmin, authenticateUser, generateToken };
