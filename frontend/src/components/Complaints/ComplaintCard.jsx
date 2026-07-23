import "../../pages/Complaints.css";

function ComplaintCard({
  item,
  updateStatus,
  deleteComplaint,
}) {
  return (
    <div className="complaint-card">
      {item.image && (
        <img
          src={`https://real-life-solutions-for-waste-management.onrender.com${item.image}`}
          alt="Waste"
          style={{
            width: "100%",
            height: "220px",
            objectFit: "cover",
            borderRadius: "10px",
            marginBottom: "15px",
          }}
        />
      )}

      <h2>{item.title}</h2>

      <p>
        <strong>📍 Location:</strong> {item.location}
      </p>

      <p>
        <strong>♻ Waste Type:</strong> {item.wasteType}
      </p>

      <p>
        <strong>📝 Description:</strong>
      </p>

      <p>{item.description}</p>

      <p>
        <strong>👤 Reported By:</strong>{" "}
        {item.createdBy?.name || "Unknown"}
      </p>

      <p>
        <strong>📅 Date:</strong>{" "}
        {new Date(item.createdAt).toLocaleDateString()}
      </p>

      <p>
        <strong>Status:</strong>
      </p>

      <select
        value={item.status}
        onChange={(e) =>
          updateStatus(item._id, e.target.value)
        }
      >
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      <button
        onClick={() => deleteComplaint(item._id)}
        style={{
          marginTop: "15px",
          width: "100%",
          background: "#d32f2f",
          color: "white",
          border: "none",
          padding: "12px",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        🗑 Delete Complaint
      </button>
    </div>
  );
}

export default ComplaintCard;