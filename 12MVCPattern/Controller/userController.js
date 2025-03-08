var User = require("../Models/user");

async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (err) {
    console.log("Error in Getting All Users-> ", err);
    return res.status(500).json("Error Occured");
  }
}

async function getUserById(req, res) {
  try {
    const id = req.params.userId;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).send("User Not Found");
    }

    res.status(200).json(user);
  } catch (err) {
    console.log("Error in getting userById -> ", err);
    return res.status(500).send("Error Occured while getting user by Id");
  }
}

async function createUser(req, res) {
  try {
    var newUser = new User(req.body);
    await newUser.save();
    return res.status(201).json("User Added");
  } catch (err) {
    console.log("Error -> ", err);
    return res.status(500).send("Error Occured while creating user");
  }
}

async function updateUserById(req, res) {
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
    console.log("Error -> ", err);
    return res.status(500).send("Error Occured while updating user");
  }
}

async function deleteUserById(req, res) {
  try {
    const id = req.params.userId;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).send("User Not Found");
    }

    return res.status(200).send("User Deleted");
  } catch (err) {
    console.log("Error in deleting user -> ", err);
    return res.status(500).send("Error Occured while deleting user");
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};
