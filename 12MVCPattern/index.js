// Same Project as 11 but using MVC Architecture

// Folders - Model (for each model a .js file)
//         - Routes (for each Route a .js file) - imports relevant functions from controller
//         - Controller (for each model a controller) - imports relevant model
//         - Middelware (for custom middlewares)
//         - Connection.js (a seperate file for connecting with db)

const express = require("express");

const { connectMongoDB } = require("./connection");
const { createLogs } = require("./Middlewares/Logging");
const { userRouter } = require("./Routes/userRoute");

const app = express();
const PORT = 3000;

// DB Connection
connectMongoDB("mongodb://127.0.0.1:27017/mvc-app");

// Middleware for logging
app.use(express.json());

const now = new Date();
const day = String(now.getDate()).padStart(2, "0"); // Ensure 2-digit day
const month = String(now.getMonth() + 1).padStart(2, "0"); // Ensure 2-digit month
const year = now.getFullYear();
const today = day + "" + month + "" + year;
app.use(createLogs(`logs-${today}.txt`));

// Routes
app.use("/api/users", userRouter);

// Listen
app.listen(PORT, () => console.log("App Running On Designated PORT"));
