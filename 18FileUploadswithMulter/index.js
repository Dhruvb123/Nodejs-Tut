const express = require("express");
const multer = require("multer");

// Use 1 , not actually opening file on backend
const upload = multer({ dest: "upload/" });

// Use 2
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "myuploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploader = multer({ storage: storage });

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

// Routes
app.get("/", (req, res) => {
  return res.render("home");
});
// app.post("/upload", upload.single("profile_img"), (req, res) => {
//   console.log(req.file);
//   return res.json("file uploaded successfully");
// });
app.post("/upload", uploader.single("profile_img"), (req, res) => {
  console.log(req.file);
  return res.json("file uploaded successfully");
});
app.post("/upload-many", uploader.array("documents"), (req, res) => {
  console.log(req.files);
  return res.json("files uploaded successfully");
});
app.listen(3000, () => console.log("App Running!!!"));
