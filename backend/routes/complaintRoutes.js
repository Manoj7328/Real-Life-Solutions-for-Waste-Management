const express = require("express");
const multer = require("multer");
const path = require("path");

const {
  createComplaint,
  getComplaints,
  updateComplaintStatus,
  deleteComplaint,
} = require("../controllers/complaintController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

const router = express.Router();

// ==========================
// Multer Storage
// ==========================
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },

  filename(req, file, cb) {
    cb(
      null,
      Date.now() +
        "-" +
        Math.round(Math.random() * 1e9) +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

// ==========================
// User Routes
// ==========================

// Create Complaint
router.post(
  "/",
  protect,
  upload.single("image"),
  createComplaint
);

// View Complaints
router.get("/", protect, getComplaints);

// ==========================
// Admin Routes
// ==========================

// Update Complaint Status
router.put(
  "/:id",
  protect,
  adminOnly,
  updateComplaintStatus
);

// Delete Complaint
router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteComplaint
);

module.exports = router;