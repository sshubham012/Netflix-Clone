const express = require("express");
const router = express.Router();
const {
  getgitdata,
  register,
  getAllUsers,
  getUser,
  deleteOneUser,
  deleteAllUsers,
  login,
  githubAccessToken,
} = require("../controllers");

// Route to register/login a user
router.get("/github-access-token", githubAccessToken);
router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/user-data", getgitdata);
// Routes for user operations
router.get("/", getAllUsers);
router.delete("/", deleteAllUsers);
router.get("/:id", getUser);
router.delete("/:id", deleteOneUser);

module.exports = router;
