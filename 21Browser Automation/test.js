const express = require("express");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;
const http = require("http");
const socketIO = require("socket.io");

const app = express();

const server = http.createServer(app);
const io = socketIO(server);

const log_file_path = __dirname + "logs.tx";

async function readLines() {
  let lines = [];
  let lineCnt = 0;

  let stat;
  try {
    stat = await fsPromises.stat(log_file_path);
  } catch (error) {
    console.log("Error occured in fs.stat");
    return [];
  }

  let endSize = stat.size;
  let startSize = endSize - 100;
  let text = "";

  while (endSize > 0 && lineCnt <= 10) {
    const stream = fs.createReadStream(log_file_path, {
      encoding: "utf-8",
      start: startSize < 0 ? startSize : 0,
      end: endSize,
    });

    for await (const chunk of stream) {
      let curText = chunk.toString().split("\n");
      text = text + curText;
      if (curText.lineCnt > 1) {
        lineCnt += curText.length;
      }
    }
    startSize -= 100;
    endSize -= 100;
  }
  lines = text.split("\n");
  return lines.slice(-10);
}

io.on("connection", async (socket) => {
  console.log("New Clt Connected: ", socket.id);

  io.emit("init", await readLines());
});

server.listen(3000, () => console.log("App running on Port 3000"));

// BROWSER AUTOMATION
