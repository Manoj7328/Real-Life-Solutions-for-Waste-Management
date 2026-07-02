import "./dashboard.css";

function DashboardHeader() {
  const currentHour = new Date().getHours();

  let greeting = "Good Evening";

  if (currentHour < 12) {
    greeting = "Good Morning";
  } else if (currentHour < 18) {
    greeting = "Good Afternoon";
  }

  return (
    <div className="dashboard-header-card">
      <div>
        <h1>{greeting} 👋</h1>

        <p className="dashboard-subtitle">
          Welcome to the Smart Waste Management Dashboard
        </p>

        <p className="dashboard-description">
          Monitor complaints, track waste collection progress, and manage
          reports efficiently from one place.
        </p>
      </div>

      <div className="dashboard-logo">
        ♻
      </div>
    </div>
  );
}

export default DashboardHeader;