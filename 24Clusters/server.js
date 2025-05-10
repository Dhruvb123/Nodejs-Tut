const cluster = require("node:cluster");
const numCPUs = require("os").availableParallelism();
const express = require("express");

const app = express();

if (cluster.isPrimary) {
  console.log("Number of avaliable processor: ", numCPUs);
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  app.get("/", (req, res) => {
    return res.send(`Process Id: ${process.pid}`);
  });

  app.listen(3000, () => console.log("App running on PORT 3000"));
}
