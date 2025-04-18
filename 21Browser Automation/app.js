const express = require("express");
const os = require("os");
const { exec } = require("child_process");
const app = express();

const OS = os.platform();

function generateCmd(type, browser, url) {
  let cmd = "";
  if (type === "open") {
    if (OS === "win32") {
      if (browser === "chrome") {
        cmd = `start chrome ${url}`;
      } else if (browser === "firefox") {
        cmd = `start firefox ${url}`;
      } else {
        cmd = "abort";
      }
    } else if (OS === "darwin") {
      if (browser === "chrome") {
        cmd = `open chrome ${url}`;
      } else if (browser === "firefox") {
        cmd = `open firefox ${url}`;
      } else {
        cmd = "abort";
      }
    } else {
      cmd = "abort";
    }
  } else if (type === "close") {
    if (OS === "win32") {
      if (browser === "chrome") {
        cmd = "taskkill /F /IM chrome.exe";
      } else if (browser === "firefox") {
        cmd = "taskkill /F /IM firefox.exe";
      } else {
        cmd = "abort";
      }
    } else if (OS === "darwin") {
      if (browser === "chrome") {
        cmd = "pkill chrome";
      } else if (browser === "firefox") {
        cmd = "pkill firefox";
      } else {
        cmd = "abort";
      }
    } else {
      cmd = "abort";
    }
  } else if (type === "clear") {
    if (OS === "win32") {
      if (browser === "chrome") {
        cmd = "taskkill /F /IM chrome.exe";
      } else if (browser === "firefox") {
        cmd = "taskkill /F /IM firefox.exe";
      } else {
        cmd = "abort";
      }
    } else if (OS === "darwin") {
      if (browser === "chrome") {
        cmd = "pkill chrome";
      } else if (browser === "firefox") {
        cmd = "pkill firefox";
      } else {
        cmd = "abort";
      }
    } else {
      cmd = "abort";
    }
  } else {
    cmd = "abort";
  }
  return cmd;
}

app.get("/", (req, res) => {
  res.status(200).send("Home EndPt Reached");
});

app.get("/open", (req, res) => {
  let browser = req.query.app;
  let url = req.query.url;
  let cmd = generateCmd("open", browser, url);
  if (!cmd || cmd === "abort") {
    return res.send("Failed");
  }
  exec(cmd, (err) => {
    if (err) {
      return res.send("Error Ocured");
    }
    return res.send("Success");
  });
});

app.get("/close", (req, res) => {
  let browser = req.query.app;

  let cmd = generateCmd("close", browser, url);

  if (!cmd || cmd === "abort") {
    return res.send("Failed");
  }

  exec(cmd, (err) => {
    if (err) {
      return res.send("Error Ocured");
    }
    return res.send("Success");
  });
});

app.get("/clear", (req, res) => {
  let browser = req.query.app;
  res.setHeader("Clear-Site-Data", '"cache","storage","cookies"');
});

app.listen(3000, () => {
  console.log("App running on PORT 3000");
});
