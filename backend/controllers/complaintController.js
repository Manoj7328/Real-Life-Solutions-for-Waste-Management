const Complaint = require("../models/Complaint");

// Create Complaint
const createComplaint = async (req, res) => {
  try {
    const { title, description, location, wasteType } = req.body;

    const image = req.file ? `/uploads/${req.file.filename}` : "";

    const complaint = await Complaint.create({
      title,
      description,
      location,
      wasteType,
      image,
      createdBy: req.user.id,
    });

    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Complaints
const getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.json(complaints);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Status
const updateComplaintStatus = async (req, res) => {
  try {
    console.log("Complaint ID:", req.params.id);
    console.log("New Status:", req.body.status);

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    complaint.status = req.body.status;

    await complaint.save();

    res.json({
      message: "Status updated successfully",
      complaint,
    });
  } catch (error) {
    console.error("Update Status Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Complaint
const deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    await complaint.deleteOne();

    res.json({
      message: "Complaint deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createComplaint,
  getComplaints,
  updateComplaintStatus,
  deleteComplaint,
};