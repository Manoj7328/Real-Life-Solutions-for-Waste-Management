import "./dashboard.css";

function StatCards({ complaints }) {
  const total = complaints.length;

  const pending = complaints.filter(
    (c) => c.status === "Pending"
  ).length;

  const inProgress = complaints.filter(
    (c) => c.status === "In Progress"
  ).length;

  const completed = complaints.filter(
    (c) => c.status === "Completed"
  ).length;

  const cards = [
    {
      icon: "📋",
      title: "Total Complaints",
      value: total,
      className: "total-card",
    },
    {
      icon: "🟡",
      title: "Pending",
      value: pending,
      className: "pending-card",
    },
    {
      icon: "🚛",
      title: "In Progress",
      value: inProgress,
      className: "progress-card",
    },
    {
      icon: "✅",
      title: "Completed",
      value: completed,
      className: "completed-card",
    },
  ];

  return (
    <div className="stats-grid">
      {cards.map((card, index) => (
        <div className={`stat-card ${card.className}`} key={index}>
          <div className="stat-icon">
            {card.icon}
          </div>

          <h3>{card.title}</h3>

          <h2>{card.value}</h2>
        </div>
      ))}
    </div>
  );
}

export default StatCards;