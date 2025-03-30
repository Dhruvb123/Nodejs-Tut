const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./Routes/authRoutes");
const { connectToDb } = require("./connection");

const dotenv = require("dotenv");
dotenv.config();

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.set("view engine", "ejs");

// Connect DB
connectToDb();

app.use("/", authRoutes);

app.listen(process.env.PORT, () => console.log("App Running On Port!!!"));
