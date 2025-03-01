// Mimicing chp 06 functionality with express
const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json()); // Middleware to parse JSON body

// Logging Middleware
app.use((req, res, next) => {
  if (req.url !== "/favicon.ico") {
    const logTxt = `${Date.now()} | ${req.method} Request | Req From -> ${
      req.url
    }\n`;
    fs.appendFile("logs.txt", logTxt, (err) => {
      if (err) {
        console.error("Error logging request:", err);
      }
    });
  }
  next(); // Move to next middleware/route handler
});

app.get("/", (req, res) => {
  return res.send("HI From Home Page");
});

app.get("/about", (req, res) => {
  return res.send(`HI ${req.query.name} From About Page`);
});

app.get("/signup", (req, res) => {
  return res.send("Get req from signup page");
});

app.post("/signup", (req, res) => {
  const { username, email } = req.body;
  return res.send(`HI ${username} Form About Page`);
});

app.listen(3000, () => {
  console.log("Server Running On Port 3000");
});
