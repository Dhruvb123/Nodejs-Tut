const express = require("express");
const cookieParser = require("cookie-parser"); // for session based auth

const { connectToDB } = require("./connection");
const { authRoutes } = require("./Routes/authRoute");

const app = express();

// DB Connection
connectToDB("mongodb://127.0.0.1:27017/auth-app")
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => console.log("Error while connecting to DB: ", err));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("view engine", "ejs");

// Routes
app.use("/", authRoutes);

app.listen(3000, () => console.log("App Running on Port 3000"));
