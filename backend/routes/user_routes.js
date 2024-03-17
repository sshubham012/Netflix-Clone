const express = require("express");
const router = express.Router();
const {
  register,
  getAllUsers,
  getUser,
  deleteOneUser,
  deleteAllUsers,
} = require("../controllers");

// Route to register a new user
router.post("/auth/register", register);

// Routes for user operations
router.get("/", getAllUsers);
router.delete("/", deleteAllUsers);
router.get("/:id", getUser);
router.delete("/:id", deleteOneUser);

module.exports = router;
