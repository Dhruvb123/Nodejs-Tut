const fs = require("fs");

function createLogs(fileName) {
  return (req, res, next) => {
    fs.appendFile(
      fileName,
      `${Date.now()} | ${req.method} Request | Req From -> ${req.route}\n`,
      (err) => {
        console.log("Error while logging : ", err);
      }
    );
    next();
  };
}

module.exports = { createLogs };
