const fs = require("fs");
const http = require("http");
const express = require("express");
const readline = require("readline");
const path = require("path");

const LOG_FILE_PATH = __dirname + "/logs.txt";

// SOCKET BASICS
const socketIo = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname + "/public"));

async function getLastNLines(path, n) {
  const stream = fs.createReadStream(path, { encoding: "utf8" });
  const rl = readline.createInterface({ input: stream });

  const lines = [];

  try {
    for await (const line of rl) {
      lines.push(line);
    }
    return lines.slice(-n);
  } catch (error) {
    throw error;
  }
}

io.on("connection", async (socket) => {
  console.log("New client connected");

  // Send last 10 lines
  const lastLines = await getLastNLines(LOG_FILE_PATH, 10);
  socket.emit("init", lastLines);

  // Track last file size
  let lastSize = 0;

  // Initialize with current file size
  fs.stat(LOG_FILE_PATH, (err, stats) => {
    if (stats) {
      lastSize = stats.size;
    }
  });

  // Watch for changes
  const watcher = fs.watch(LOG_FILE_PATH, { encoding: "utf8" }, (eventType) => {
    if (eventType === "change") {
      fs.stat(LOG_FILE_PATH, (err, stats) => {
        if (err) {
          console.error("Stat error:", err);
          return;
        }

        const newSize = stats.size;

        // If the file shrunk (maybe log rotated), reset
        if (newSize < lastSize) {
          lastSize = newSize;
          return;
        }

        const readStream = fs.createReadStream(LOG_FILE_PATH, {
          encoding: "utf8",
          start: lastSize,
        });

        let newContent = "";
        readStream.on("data", (chunk) => {
          newContent += chunk;
        });
        readStream.on("end", () => {
          if (newContent.trim()) {
            const newLines = newContent.trim().split("\n");
            newLines.forEach((line) => socket.emit("log", line));
          }
          lastSize = newSize;
        });

        readStream.on("error", (err) => {
          console.error("Read stream error:", err);
        });
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    watcher.close(); // stop watching when client leaves
  });
});

server.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});
