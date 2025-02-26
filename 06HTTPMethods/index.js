const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  //logging type of request
  if (req.url !== "/favicon.ico") {
    const logTxt = `${Date.now()} | ${req.method} Request | Req From -> ${
      req.url
    }\n`;
    fs.appendFile(`logs.txt`, logTxt, (err) => {
      if (err) {
        console.log(err);
        return res.end("Internal Server Error: Unable to log request");
      }
    });
  }
  switch (req.url) {
    case "/":
      res.end("HOME PAGE");
      break;
    case "/about":
      res.end("ABOUT PAGE");
      break;
    case "/signup":
      if (req.method === "GET") {
        res.end("GET Request");
      } else if (req.method === "POST") {
        // DB Query
        res.end("POST Request");
      }
      break;
    default:
      res.end("404");
      break;
  }
});

server.listen(3000);
