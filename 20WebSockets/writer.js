const fs = require("fs");
const path = require("path");

const LOG_FILE_PATH = path.join(__dirname, "logs.txt");

function writeLog() {
  const timestamp = new Date().toISOString();
  const logMessage = `${timestamp} - This is a new log entry.\n`;

  fs.appendFile(LOG_FILE_PATH, logMessage, (err) => {
    if (err) {
      console.error("Error writing to log file:", err);
    } else {
      console.log("Log entry added:", logMessage.trim());
    }
  });
}

// Write a log entry every 5 seconds
setInterval(writeLog, 5000);
