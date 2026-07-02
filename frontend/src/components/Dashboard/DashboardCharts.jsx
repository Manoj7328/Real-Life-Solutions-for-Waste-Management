import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import "./dashboard.css";

function DashboardCharts({ complaints }) {
  const pending = complaints.filter(
    (c) => c.status === "Pending"
  ).length;

  const inProgress = complaints.filter(
    (c) => c.status === "In Progress"
  ).length;

  const completed = complaints.filter(
    (c) => c.status === "Completed"
  ).length;

  const statusData = [
    {
      name: "Pending",
      value: pending,
    },
    {
      name: "In Progress",
      value: inProgress,
    },
    {
      name: "Completed",
      value: completed,
    },
  ];

  const wasteCount = {};

  complaints.forEach((item) => {
    wasteCount[item.wasteType] =
      (wasteCount[item.wasteType] || 0) + 1;
  });

  const wasteData = Object.keys(wasteCount).map((key) => ({
    name: key,
    value: wasteCount[key],
  }));

  const COLORS = [
    "#2E7D32",
    "#43A047",
    "#66BB6A",
    "#81C784",
    "#A5D6A7",
    "#26A69A",
  ];

  return (
    <div className="charts-grid">
      <div className="chart-card">
        <h2>📊 Complaint Status Overview</h2>

        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={statusData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="value"
              fill="#2E7D32"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <h2>♻ Waste Type Distribution</h2>

        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={wasteData}
              dataKey="value"
              nameKey="name"
              outerRadius={110}
              label
            >
              {wasteData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default DashboardCharts;