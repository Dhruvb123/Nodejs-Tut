const express = require("express");
const cookieParser = require("cookie-parser");

const dotenv = require("dotenv");
dotenv.config();

// MongoDB connection
const { connectToDB } = require("./connection");
connectToDB();

const app = express();

// Middlewares
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.send("Home Page Reached");
});

app.listen(process.env.PORT, () => {
  console.log("App listening on PORT: ", process.env.PORT);
});
