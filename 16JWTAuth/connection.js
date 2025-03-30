const mongoose = require("mongoose");

async function connectToDb() {
  const url = process.env.MongoDB_URI;
  await mongoose
    .connect(url)
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log("Error while connecting to DB: ", err));
}

module.exports = { connectToDb };
