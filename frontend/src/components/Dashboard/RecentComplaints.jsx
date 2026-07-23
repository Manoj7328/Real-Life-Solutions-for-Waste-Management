import "./dashboard.css";

function RecentComplaints({ complaints }) {
  return (
    <div className="recent-complaints-card">
      <div className="recent-header">
        <h2>📋 Recent Complaints</h2>
      </div>

      {complaints.length === 0 ? (
        <div className="empty-state">
          <h3>No complaints found.</h3>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="complaints-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Waste Type</th>
                <th>Location</th>
                <th>Status</th>
                <th>Reported By</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {complaints.slice(0, 8).map((item) => (
                <tr key={item._id}>
                  <td>
                    {item.image ? (
                      <img
                        src={`https://real-life-solutions-for-waste-management.onrender.com${item.image}`}
                        alt={item.title}
                        className="complaint-image"
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>

                  <td>{item.title}</td>

                  <td>{item.wasteType}</td>

                  <td>{item.location}</td>

                  <td>
                    <span
                      className={`status-badge ${
                        item.status === "Pending"
                          ? "pending"
                          : item.status === "In Progress"
                          ? "progress"
                          : "completed"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>{item.createdBy?.name || "Unknown"}</td>

                  <td>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default RecentComplaints;