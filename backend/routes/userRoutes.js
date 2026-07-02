const express = require("express");

const {
  registerUser,
  loginUser,
  getUsers,
  updateUserRole,
} = require("../controllers/userController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

const router = express.Router();

// ==========================
// Public Routes
// ==========================

// Register User
router.post("/register", registerUser);

// Login User
router.post("/login", loginUser);

// ==========================
// Admin Routes
// ==========================

// Get All Users
router.get(
  "/",
  protect,
  adminOnly,
  getUsers
);

// Change User Role
router.put(
  "/:id/role",
  protect,
  adminOnly,
  updateUserRole
);

module.exports = router;