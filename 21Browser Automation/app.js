const express = require("express");
const os = require("os");
const path = require("path");
const fs = require("fs-extra");
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

function clearChromeData() {
  const chromeProfilePath = path.join(
    os.homedir(),
    "AppData",
    "Local",
    "Google",
    "Chrome",
    "User Data",
    "Default"
  );

  const targets = [
    "Cache",
    "Cookies",
    "History",
    "Login Data",
    "Web Data",
    "Session Storage",
    "Top Sites",
    "Visited Links",
  ];

  targets.forEach((target) => {
    const fullPath = path.join(chromeProfilePath, target);
    try {
      fs.removeSync(fullPath);
      console.log(`Deleted: ${target}`);
    } catch (err) {
      console.warn(`Failed to delete ${target}:`, err.message);
    }
  });

  console.log("Chrome cache and history cleared.");
}

function clearFirefoxData() {
  const profilesIniPath = path.join(
    os.homedir(),
    "AppData",
    "Roaming",
    "Mozilla",
    "Firefox",
    "profiles.ini"
  );

  if (!fs.existsSync(profilesIniPath)) {
    console.error("Firefox profiles.ini not found.");
    return;
  }

  const profilesIni = fs.readFileSync(profilesIniPath, "utf-8");
  const match = profilesIni.match(/Path=(.+)/);
  if (!match) {
    console.error("Default profile path not found.");
    return;
  }

  const profileRelativePath = match[1].trim();
  const profilePath = path.join(
    os.homedir(),
    "AppData",
    "Roaming",
    "Mozilla",
    "Firefox",
    profileRelativePath
  );

  const targets = [
    "cache2",
    "cookies.sqlite",
    "places.sqlite", // stores history & bookmarks
    "webappsstore.sqlite", // local storage
    "sessionstore.jsonlz4", // session
    "formhistory.sqlite",
    "offlineCache",
  ];

  targets.forEach((target) => {
    const fullPath = path.join(profilePath, target);
    try {
      fs.removeSync(fullPath);
      console.log(`Deleted: ${target}`);
    } catch (err) {
      console.warn(`Failed to delete ${target}:`, err.message);
    }
  });

  console.log("Firefox cache and history cleared.");
}

app.get("/clear", (req, res) => {
  let browser = req.query.app;
  try {
    clearFirefoxData();
    return res.send("success");
  } catch (err) {
    return res.send("Error Occured");
  }
});

app.listen(3000, () => {
  console.log("App running on PORT 3000");
});
