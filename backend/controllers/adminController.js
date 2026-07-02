const User = require("../models/User");
const Complaint = require("../models/Complaint");

const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalComplaints = await Complaint.countDocuments();

    const pending = await Complaint.countDocuments({
      status: "Pending",
    });

    const completed = await Complaint.countDocuments({
      status: "Completed",
    });

    res.json({
      totalUsers,
      totalComplaints,
      pending,
      completed,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};