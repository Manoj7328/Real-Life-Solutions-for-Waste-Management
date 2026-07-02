const express = require("express");

const {
  getDashboardStats,
} = require("../controllers/adminController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/dashboard-stats", protect, getDashboardStats);

module.exports = router;