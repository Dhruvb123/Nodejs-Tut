const http = require("http");

const server = http.createServer((req, res) => {
  console.log("Request Received");
  res.end("HI User!!!");
});

server.listen(3000, () => {
  console.log("Listening On Port 3000");
});

// NEW SERVER

const fs = require("fs");

// Function to get today's date in ddmmyyyy format
const getFormattedDate = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const yyyy = today.getFullYear();
  return `${dd}${mm}${yyyy}`;
};

const server2 = http.createServer((req, res) => {
  const logTxt = `${Date.now()} | New Request Recv. | Request From -> ${
    req.url
  } | \n`;
  fs.appendFile(`log-${getFormattedDate()}.txt`, logTxt, (err) => {
    if (err) {
      console.log(err);
      return res.end("Internal Server Error: Unable to log request");
    }
    switch (req.url) {
      case "/":
        res.end("Home Page");
        break;
      case "/about":
        res.end("About Page");
        break;
      default:
        res.end("404");
        break;
    }
  });
});

server2.listen(3001);
