const express = require("express");

// Instead of app use userRouter from express
const userRouter = express.Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
} = require("../Controller/userController");

// Functions are imported from controller
userRouter.route("/").get(getAllUsers).post(createUser);

userRouter
  .route("/:userId")
  .get(getUserById)
  .patch(updateUserById)
  .delete(deleteUserById);

module.exports = { userRouter };
