import { NavLink, useNavigate } from "react-router-dom";

function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    localStorage.removeItem("name");

    navigate("/login");
  };

  return (
    <div className="admin-sidebar">

      <div className="admin-logo">
        ♻ SmartWaste
        <br />

        <span
          style={{
            fontSize: "15px",
            fontWeight: "400",
          }}
        >
          Admin Panel
        </span>
      </div>

      <div className="admin-menu">

        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          📊 Dashboard
        </NavLink>

        <NavLink
          to="/admin/complaints"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          📋 Manage Complaints
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          👥 Manage Users
        </NavLink>

      </div>

      <button
        className="logout-btn-admin"
        onClick={handleLogout}
      >
        🚪 Logout
      </button>

    </div>
  );
}

export default AdminSidebar;