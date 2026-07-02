import { useEffect, useState } from "react";
import axios from "axios";

import DashboardHeader from "../components/Dashboard/DashboardHeader";
import StatCards from "../components/Dashboard/StatCards";
import DashboardCharts from "../components/Dashboard/DashboardCharts";
import RecentComplaints from "../components/Dashboard/RecentComplaints";

function Dashboard() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/complaints",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComplaints(res.data);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          padding: "60px",
          textAlign: "center",
          fontSize: "20px",
          fontWeight: "600",
          color: "#2E7D32",
        }}
      >
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <DashboardHeader />

      <StatCards complaints={complaints} />

      <DashboardCharts complaints={complaints} />

      <RecentComplaints complaints={complaints} />
    </div>
  );
}

export default Dashboard;