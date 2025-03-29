async function isAuth(req, res, next) {
  if (req.cookies.userId) {
    next();
  } else {
    return res.redirect("/login");
  }
}

module.exports = { isAuth };
