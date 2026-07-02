import "./AdminNavbar.css";

function AdminNavbar() {
  const adminName = localStorage.getItem("name") || "Admin";

  const today = new Date();

  const date = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="admin-navbar">
      <div>
        <h2>Admin Dashboard</h2>
        <p>Waste Management Monitoring System</p>
      </div>

      <div className="admin-navbar-right">
        <h3>👤 Welcome, {adminName}</h3>
        <span>{date}</span>
      </div>
    </div>
  );
}

export default AdminNavbar;