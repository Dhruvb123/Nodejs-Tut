const express = require("express");

const { connectToMongoDB } = require("./connection");
const { urlRouter } = require("./Router/urlRouter");

const app = express();
const PORT = 3000;

// DB Connection
connectToMongoDB("mongodb://127.0.0.1:27017/urlShortner-app");

// No custom middleware just inbuilt
app.use(express.json());

// Routes
app.use("/shortURL", urlRouter);

// Listen
app.listen(PORT, () => console.log("App Running On Designated PORT"));
