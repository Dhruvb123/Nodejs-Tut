// Same Project as 11 but using MVC Architecture

// Folders - Model (for each model a .js file)
//         - Routes (for each Route a .js file) - imports relevant functions from controller
//         - Controller (for each model a controller) - imports relevant model
//         - Middelware (for custom middlewares)
//         - Connection.js (a seperate file for connecting with db)

const express = require("express");

const { connectMongoDB } = require("./connection");
const { createLogs } = require("./Middlewares/Logging");

const app = express();
const PORT = 3000;

// DB Connection
connectMongoDB("mongodb://127.0.0.1:27017/mvc-app");

// Middleware for logging
app.use(createLogs(`logs-${Date.now()}.txt`));

// Routes

// Listen
app.listen(PORT, "App Running On Designated PORT");
