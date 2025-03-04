const express = require("express");

const app = express();
const PORT = 3000;

// Built-In Middleware
app.use(express.json());

app.get("/", (req, res) => {
  console.log(req.headers);

  // Adding Header To Response (Best Practice to add X- in front of custom heders)
  res.setHeader("X-CustomHeader", "HI This is from Server");
  res.send("Route Reached");
});

app.listen(PORT);
