const express = require("express");
const { exec } = require("child_process");
const os = require("os");

const app = express();
const PORT = 3000;

const isWindows = os.platform() === "win32";
const isMac = os.platform() === "darwin";
const isLinux = os.platform() === "linux";

app.get("/clear", (req, res) => {
  const browser = req.query.app;
  let command;

  if (browser === "firefox") {
    command = isWindows
      ? "start firefox -P default -no-remote -new-instance -url about:preferences#privacy"
      : isMac
      ? "open -a Firefox --args -P default -no-remote -new-instance -url about:preferences#privacy"
      : "firefox -P default -no-remote -new-instance -url about:preferences#privacy";
  } else if (browser === "chrome") {
    command = isWindows
      ? "start chrome --incognito"
      : isMac
      ? "open -a Google\\ Chrome --args --user-data-dir=/tmp/ChromeProfile --incognito"
      : "google-chrome --user-data-dir=/tmp/ChromeProfile --incognito";
  } else {
    return res.status(400).send("Unsupported browser specified.");
  }

  exec(command, (error) => {
    if (error) {
      return res
        .status(500)
        .send(`Error clearing cache and history for ${browser}.`);
    }
    res.send(`Cleared cache and history for ${browser}.`);
  });
});

app.get("/open", (req, res) => {
  const browser = req.query.app;
  const url = req.query.url;

  if (!url) {
    return res.status(400).send("URL is required.");
  }

  let command;

  if (browser === "firefox") {
    command = isWindows
      ? `start firefox ${url}`
      : isMac
      ? `open -a Firefox ${url}`
      : `firefox ${url}`;
  } else if (browser === "chrome") {
    command = isWindows
      ? `start chrome ${url}`
      : isMac
      ? `open -a Google\\ Chrome ${url}`
      : `google-chrome ${url}`;
  } else {
    return res.status(400).send("Unsupported browser specified.");
  }

  exec(command, (error) => {
    if (error) {
      return res.status(500).send(`Error opening URL in ${browser}.`);
    }
    res.send(`Opened ${url} in ${browser}.`);
  });
});

app.get("/close", (req, res) => {
  const browser = req.query.app;
  let command;

  if (browser === "firefox") {
    command = isWindows
      ? "taskkill /F /IM firefox.exe"
      : isMac
      ? "pkill firefox"
      : "pkill firefox";
  } else if (browser === "chrome") {
    command = isWindows
      ? "taskkill /F /IM chrome.exe"
      : isMac
      ? "pkill 'Google Chrome'"
      : "pkill chrome";
  } else {
    return res.status(400).send("Unsupported browser specified.");
  }

  exec(command, (error) => {
    if (error) {
      return res.status(500).send(`Error closing ${browser}.`);
    }
    res.send(`Closed ${browser}.`);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
