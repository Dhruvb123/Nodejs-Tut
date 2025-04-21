const express = require("express");
const fs = require("fs");
const http = require("http");
const socket = require("socket.io");
const readline = require("readline");
const os = require("os");

const app = express();
const server = http.createServer(app);

const io = socket(server);

const LOG_FILE_PATH = __dirname + "/logs.txt";

app.use(express.static(__dirname + "/public"));

// async function readLast10Lines(path) {
//   const stream = fs.createReadStream(path, { encoding: "utf-8" });
//   const rl = readline.createInterface({ input: stream });

//   let lines = [];

//   try {
//     for await (var line of rl) {
//       lines.push(line);
//     }
//   } catch (err) {
//     console.log(err);
//   }
//   return lines.slice(-10);
// }

async function readLast10Lines(filePath) {
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const bufferSize = 1024;
  let buffer = Buffer.alloc(bufferSize);
  let position = fileSize;
  let lineCount = 0;
  let lines = "";
  const newline = os.EOL;

  const fd = fs.openSync(filePath, "r");

  while (position > 0 && lineCount <= 10) {
    const chunkSize = Math.min(bufferSize, position);
    position -= chunkSize;
    fs.readSync(fd, buffer, 0, chunkSize, position);

    const chunkText = buffer.toString("utf-8", 0, chunkSize);
    lines = chunkText + lines;

    lineCount = lines.split(/\r?\n/).length - 1;
  }

  fs.closeSync(fd);

  return lines.trim().split(/\r?\n/).slice(-10);
}

io.on("connection", async (socket) => {
  console.log("Client Connected");

  const data = await readLast10Lines(LOG_FILE_PATH);

  socket.emit("init", data);

  let ptr = 0;

  fs.stat(LOG_FILE_PATH, (err, stats) => {
    if (stats) {
      ptr = stats.size;
    }
  });

  fs.watch(LOG_FILE_PATH, { encoding: "utf-8" }, (eventType) => {
    if (eventType === "change") {
      fs.stat(LOG_FILE_PATH, (err, stats) => {
        if (err) {
          console.log("Error: ", err);
          return;
        }

        const stream = fs.createReadStream(LOG_FILE_PATH, {
          encoding: "utf-8",
          start: ptr,
        });

        let newLines = [];

        stream.on("data", (chunk) => {
          newLines.push(chunk);
        });
        stream.on("end", () => {
          newLines.forEach((line) => {
            socket.emit("log-update", line);
          });
        });
        stream.on("error", (err) => {
          console.log("Error in reading the stream: ", err);
        });

        ptr = stats.size;
      });
    }
  });
});

server.listen(3000, () => console.log("Server Running"));
