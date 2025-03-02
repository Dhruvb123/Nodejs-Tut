const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

var users = require("./MOCK_DATA.json");
const { stringify } = require("querystring");

// Middleware to parse JSON body
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("User Data - Rest API Project");
});

// HTML Doc (SSR)
app.get("/users", (req, res) => {
  res.send(
    `<ul>${users
      .map((user) => {
        return `<li>${user.first_name} - ${user.last_name}</li>`;
      })
      .join("")}</ul>`
  );
});

// Get All Users Route
app.get("/api/users", (req, res) => {
  res.json(users);
});

// Get User By Id
app.get("/api/users/:userId", (req, res) => {
  const id = Number(req.params.userId);
  console.log(id);
  const user = users.find((user) => user.id === id);
  console.log(user);
  res.json(user);
});

// Post Add A New User
// Just Adding it to current user will lead to loss of new user hence we add them using file module
app.post("/api/users", (req, res) => {
  try {
    var newUser = req.body;
    newUser = { ...newUser, id: users.length + 1 };
    users.push(newUser);
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
      if (err) {
        res.send(err);
        console.log(err);
      }
    });

    res.send("User Added Successfully");
  } catch (err) {
    res.send("Error Occured While Adding New User");
    console.log(err);
  }
});

// PATCH & DELETE Requests
app
  .route("/api/users/:userId")
  .patch((req, res) => {
    const id = Number(req.params.userId);
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return res.status(404).send("User Not Found");
    }

    // Update user
    users[userIndex] = { ...users[userIndex], ...req.body };

    // Write updated array to file
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error updating user");
      }

      res.send("User updated successfully");
    });
  })
  .delete((req, res) => {
    const id = Number(req.params.userId);
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return res.status(404).send("User Not Found");
    }

    // Remove user from array
    users.splice(userIndex, 1);

    // Write To File
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
      if (err) {
        res.send(err);
        console.log(err);
      }

      res.send("User Deleted successfully");
    });
  });

app.listen(PORT, () => console.log(`Server Running On Port: ${PORT}`));
