async function isAuth(req, res, next) {
  if (req.cookies.token) {
    next();
  } else {
    return res.redirect("/login");
  }
}

module.exports = { isAuth };
