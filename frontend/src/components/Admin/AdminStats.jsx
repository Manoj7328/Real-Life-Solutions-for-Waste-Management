import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminStats.css";

function AdminStats() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalComplaints: 0,
    pending: 0,
    completed: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "https://real-life-solutions-for-waste-management.onrender.com/api/admin/dashboard-stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStats(res.data);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: "👥",
      color: "#1976d2",
    },
    {
      title: "Complaints",
      value: stats.totalComplaints,
      icon: "📋",
      color: "#2e7d32",
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: "⏳",
      color: "#f9a825",
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: "✅",
      color: "#43a047",
    },
  ];

  return (
    <div className="stats-container">
      {cards.map((item, index) => (
        <div className="stat-card" key={index}>
          <div
            className="stat-icon"
            style={{ background: item.color }}
          >
            {item.icon}
          </div>

          <div className="stat-info">
            <h2>{item.value}</h2>
            <p>{item.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminStats;