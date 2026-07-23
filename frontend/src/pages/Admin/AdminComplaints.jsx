import { useEffect, useState } from "react";
import axios from "axios";

import AdminSidebar from "../../components/Admin/AdminSidebar";
import "./Admin.css";

function AdminComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Notification
  const [message, setMessage] = useState("");

  // Image Modal
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    fetchComplaints();
  }, []);

  // ----------------------------
  // Fetch Complaints
  // ----------------------------
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

      setComplaints(res.data);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  // ----------------------------
  // Update Status
  // ----------------------------
  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `https://real-life-solutions-for-waste-management.onrender.com/api/complaints/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("✅ Complaint status updated successfully");

      setTimeout(() => {
        setMessage("");
      }, 2500);

      fetchComplaints();
    } catch (error) {
      console.error(error);
    }
  };

  // ----------------------------
  // Delete Complaint
  // ----------------------------
  const deleteComplaint = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this complaint?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `https://real-life-solutions-for-waste-management.onrender.com/api/complaints/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("🗑️ Complaint deleted successfully");

      setTimeout(() => {
        setMessage("");
      }, 2500);

      fetchComplaints();
    } catch (error) {
      console.error(error);
    }
  };

  // ----------------------------
  // Search & Filter
  // ----------------------------
  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      complaint.createdBy?.name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      complaint.location
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      complaint.wasteType
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      complaint.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-main">

        <div className="admin-navbar">
          <h2>Manage Complaints</h2>
        </div>

        {/* Success Notification */}
        {message && (
          <div
            style={{
              background: "#16a34a",
              color: "#fff",
              padding: "12px 18px",
              borderRadius: "8px",
              marginBottom: "20px",
              fontWeight: "600",
            }}
          >
            {message}
          </div>
        )}

        {/* Search & Filter */}
        <div
          style={{
            display: "flex",
            gap: "15px",
            marginBottom: "20px",
            flexWrap: "wrap",
          }}
        >
          <input
            type="text"
            placeholder="Search by user, location or waste type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              outline: "none",
            }}
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              minWidth: "180px",
              cursor: "pointer",
            }}
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div
          className="admin-table"
          style={{
            background: "#fff",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 2px 12px rgba(0,0,0,.08)",
          }}
        >
          <table>
            <thead>
              <tr
                style={{
                  background: "#198754",
                  color: "#fff",
                }}
              >
                <th>User</th>
                <th>Location</th>
                <th>Waste Type</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredComplaints.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    style={{
                      textAlign: "center",
                      padding: "30px",
                    }}
                  >
                    No complaints found.
                  </td>
                </tr>
              ) : (                filteredComplaints.map((complaint) => (
                  <tr key={complaint._id}>
                    <td>{complaint.createdBy?.name || "Unknown"}</td>

                    <td>{complaint.location}</td>

                    <td>{complaint.wasteType}</td>

                    <td>
                      <select
                        value={complaint.status}
                        onChange={(e) =>
                          updateStatus(
                            complaint._id,
                            e.target.value
                          )
                        }
                        style={{
                          padding: "8px 12px",
                          borderRadius: "8px",
                          border: "none",
                          color: "#fff",
                          fontWeight: "600",
                          cursor: "pointer",
                          background:
                            complaint.status === "Pending"
                              ? "#dc3545"
                              : complaint.status === "In Progress"
                              ? "#f59e0b"
                              : "#198754",
                        }}
                      >
                        <option value="Pending">
                          Pending
                        </option>

                        <option value="In Progress">
                          In Progress
                        </option>

                        <option value="Completed">
                          Completed
                        </option>
                      </select>
                    </td>

                    <td>
                      {new Date(
                        complaint.createdAt
                      ).toLocaleDateString()}
                    </td>

                    <td
                      style={{
                        display: "flex",
                        gap: "8px",
                        flexWrap: "wrap",
                      }}
                    >
                      {complaint.image ? (
                        <button
                          onClick={() =>
                            setSelectedImage(
                              `https://real-life-solutions-for-waste-management.onrender.com${complaint.image}`
                            )
                          }
                          style={{
                            background: "#0d6efd",
                            color: "#fff",
                            border: "none",
                            padding: "8px 12px",
                            borderRadius: "6px",
                            cursor: "pointer",
                          }}
                        >
                          View
                        </button>
                      ) : (
                        <button
                          disabled
                          style={{
                            background: "#adb5bd",
                            color: "#fff",
                            border: "none",
                            padding: "8px 12px",
                            borderRadius: "6px",
                          }}
                        >
                          No Image
                        </button>
                      )}

                      <button
                        onClick={() =>
                          deleteComplaint(complaint._id)
                        }
                        style={{
                          background: "#dc3545",
                          color: "#fff",
                          border: "none",
                          padding: "8px 12px",
                          borderRadius: "6px",
                          cursor: "pointer",
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <div
            onClick={() => setSelectedImage("")}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0,0,0,0.75)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999,
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "12px",
                maxWidth: "700px",
                width: "90%",
                textAlign: "center",
              }}
            >
              <img
                src={selectedImage}
                alt="Complaint"
                style={{
                  maxWidth: "100%",
                  maxHeight: "75vh",
                  borderRadius: "10px",
                }}
              />

              <br />

              <button
                onClick={() => setSelectedImage("")}
                style={{
                  marginTop: "20px",
                  background: "#198754",
                  color: "#fff",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default AdminComplaints;