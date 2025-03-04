const express = require("express");

const app = express();
const PORT = 3000;

// Built-In Middleware
app.use(express.json());

// Custom Middleware
app.use((req, res, next) => {
  console.log("Hi I am Middleware 1");
  req.newProperty = "Attached By Middleware 1";
  next();

  // we can even send the response here itself
  // res.send("Pending");
});

app.use((req, res, next) => {
  console.log("Hi I am Middleware 2");
  console.log("New Property: ", req.newProperty);
  next();
});

app.get("/", (req, res) => {
  res.send("Route Reached");
});

app.listen(PORT);
