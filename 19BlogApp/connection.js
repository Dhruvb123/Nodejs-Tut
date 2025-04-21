const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");

function connectToDB() {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("DB Connected"))
    .catch((err) => {
      console.log("Error occured while connecting to DB");
    });
}

module.exports = { connectToDB };
