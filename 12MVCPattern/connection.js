const mongoose = require("mongoose");

async function connectMongoDB(url) {
  return await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

module.exports = { connectMongoDB };
