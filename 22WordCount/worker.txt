const { parentPort } = require("worker_threads");

parentPort.on("message", ({ lines, tWord }) => {
  let count = 0;
  lines.forEach((line) => {
    const data = line.split(" ");
    data.forEach((word) => {
      if (word.toLowerCase() === tWord) {
        count++;
      }
    });
  });

  parentPort.postMessage(count);
});
