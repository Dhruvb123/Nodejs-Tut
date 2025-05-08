const express = require("express");
const fs = require("fs");

const app = express();

// LOADS ENTIRE FILE TO MEMORY
// app.get("/", (req, res) => {
//   fs.readFileSync("./sample.txt", (err, data) => {
//     return res.end(data);
//   });
// });

// STREAMS PROCESSES CHUNKS ON THE GO
app.get("/", (req, res) => {
  const stream = fs.createReadStream("./sample.txt", { encoding: "utf-8" });
  stream.on("data", (chunk) => {
    res.write(chunk);
  });
  stream.on("end", () => {
    res.end();
  });
});

// CREATING ZIP FILE WO LOADING MAIN FILE INTO THE MEMORY

app.listen(3000, () => {
  console.log("App running on port 3000");
});
