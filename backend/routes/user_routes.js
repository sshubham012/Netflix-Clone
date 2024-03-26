const express = require("express");
const router = express.Router();
const {
  register,
  getAllUsers,
  getUser,
  deleteOneUser,
  deleteAllUsers,
  login,
  githubLogin
} = require("../controllers");

// Route to register/login a user
router.get("/githubAccess", githubLogin);
router.post("/auth/register", register);
router.post("/auth/login", login);

// Routes for user operations
router.get("/", getAllUsers);
router.delete("/", deleteAllUsers);
router.get("/:id", getUser);
router.delete("/:id", deleteOneUser);

module.exports = router;
