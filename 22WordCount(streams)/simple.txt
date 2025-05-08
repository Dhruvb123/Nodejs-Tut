const fs = require("fs");
const readline = require("readline");

const logPath = __dirname + "/file.txt";

const stream = fs.createReadStream(logPath, { encoding: "utf-8" });
const rl = readline.createInterface({ input: stream });

let wordCount = 0;

rl.on("line", (line) => {
  const data = line.toLowerCase().split(/\s+/);
  data.forEach((word) => {
    console.log("word: ", word);
    if (word === "event") {
      wordCount++;
    }
  });
});
rl.on("close", () => console.log(wordCount));
