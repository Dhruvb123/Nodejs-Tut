const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express;

// Middlewares
app.use(urlencoded, { http: true });
app.use(cookieParser);

// DB Connections
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("DB Connected!!!"))
  .catch((err) => console.log("=Error while connecting to DB: ", err));

// Routes
app.get();

// Listening
app.listen(process.env.PORT, () => console.log("App Running!!!"));
