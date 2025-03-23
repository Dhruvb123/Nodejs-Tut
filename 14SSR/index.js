const express = require("express");

const { connectToMongoDB } = require("./connection");
const { urlRouter } = require("./Router/urlRouter");

const app = express();
const PORT = 3000;

// DB Connection
connectToMongoDB("mongodb://127.0.0.1:27017/urlShortner-app");

// No custom middleware just inbuilt
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set ejs
app.set("view engine", "ejs");

// Routes

// ejs ssr
app.get("/", (req, res) => {
  res.render("home", { name: "ABCXYZ" });
});
app.use("/shortURL", urlRouter);

// Listen
app.listen(PORT, () => console.log("App Running On Designated PORT"));
