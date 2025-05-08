const fs = require("fs");
const readline = require("readline");
const { Worker } = require("worker_threads");

const logPath = __dirname + "/file.txt";

const stream = fs.createReadStream(logPath, { encoding: "utf-8" });
const rl = readline.createInterface({ input: stream });

let batch = [];
const batchSize = 10;
let workers = [];

function createNewWorker(lines) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(__dirname + "/worker.js");

    worker.postMessage({ lines, tWord: "event" });

    worker.on("message", (count) => {
      resolve(count);
    });
    worker.on("error", reject);
  });
}

rl.on("line", (line) => {
  batch.push(line);

  if (batch.length >= batchSize) {
    workers.push(createNewWorker(batch));
    batch = [];
  }
});

rl.on("close", async () => {
  if (batch.length > 0) {
    workers.push(createNewWorker(batch));
  }

  const countArr = await Promise.all(workers);

  console.log(countArr);
});
