const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { authenticateUser } = require("./Middlewares/authMiddleware");
const authRoute = require("./Routes/authRoute");
const urlRoute = require("./Routes/urlRoute");

dotenv.config();

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("view engine", "ejs");

// DB Connections
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("DB Connected!!!"))
  .catch((err) => console.log("Error while connecting to DB: ", err));

// Routes
app.use(authRoute);
app.use(authenticateUser);
app.use(urlRoute);

// Listening
app.listen(process.env.PORT, () =>
  console.log("App Running on port ", process.env.PORT)
);
