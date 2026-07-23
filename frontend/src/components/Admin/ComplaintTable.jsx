import { useEffect, useState } from "react";
import axios from "axios";

function ComplaintTable() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://real-life-solutions-for-waste-management.onrender.com/api/complaints",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Show only the latest 5 complaints
      setComplaints(res.data.slice(0, 5));
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "#f39c12";
      case "In Progress":
        return "#3498db";
      case "Completed":
        return "#27ae60";
      default:
        return "#777";
    }
  };

  return (
    <div className="admin-table">
      <h2>Recent Complaints</h2>

      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Location</th>
            <th>Waste Type</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {complaints.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No complaints available.
              </td>
            </tr>
          ) : (
            complaints.map((complaint) => (
              <tr key={complaint._id}>
                <td>{complaint.createdBy?.name || "Unknown"}</td>

                <td>{complaint.location}</td>

                <td>{complaint.wasteType}</td>

                <td>
                  <span
                    style={{
                      background: getStatusColor(complaint.status),
                      color: "#fff",
                      padding: "6px 12px",
                      borderRadius: "20px",
                      fontSize: "13px",
                      fontWeight: "600",
                    }}
                  >
                    {complaint.status}
                  </span>
                </td>

                <td>
                  {new Date(complaint.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ComplaintTable;