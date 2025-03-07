// REST API Project mimic but with mongo db
const express = require("express");
const mongoose = require("mongoose");
const PORT = 3000;

const app = express();

// Middleware
app.use(express.json());

// Connection (local)
mongoose
  .connect("mongodb://127.0.0.1:27017/my-app-1", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((err) => {
    console.log("Error while connecting to DB: ", err);
  });

// Schema
const userSchema = mongoose.Schema({
  name: { type: String },
  age: String,
  email: { type: String, required: true },
});

// Model
const User = mongoose.model("user", userSchema);

// Routes
app.get("/", (req, res) => {
  res.send("User Data - Node + MongoDB Project");
});

// HTML Doc (SSR)
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.send(
    `<ul>${users
      .map((user) => {
        return `<li>${user.name} - ${user.age}</li>`;
      })
      .join("")}</ul>`
  );
});

// Get All Users Route
app.get("/api/users", async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

// Get User By Id
app.get("/api/users/:userId", async (req, res) => {
  const id = req.params.userId;
  const user = await User.findById(id);

  if (!user) {
    return res.status(404).send("User Not Found");
  }

  res.status(200).json(user);
});

// Post Add A New User
// Just Adding it to current user will lead to loss of new user hence we add them using file module
app.post("/api/users", async (req, res) => {
  try {
    var newUser = new User(req.body);
    await newUser.save();
    return res.status(201).json("User Added");
  } catch (err) {
    res.send("Error Occured While Adding New User");
    console.log(err);
  }
});

// PATCH & DELETE Requests
app
  .route("/api/users/:userId")
  .patch(async (req, res) => {
    try {
      const id = req.params.userId;
      var user = await User.findById(id);
      if (!user) {
        return res.status(404).send("User Not Found");
      }

      Object.keys(req.body).forEach((key) => {
        user[key] = req.body[key];
      });

      await user.save();
      return res.status(200).send("User updated successfully");
    } catch (err) {
      console.log("Update Error-> ", err);
      res.status(500).send("Error Occured while updating");
    }
  })
  .delete(async (req, res) => {
    const id = req.params.userId;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).send("User Not Found");
    }

    return res.status(200).send("User Deleted");
  });

app.listen(PORT, () => console.log(`App Running on port ${PORT}`));
