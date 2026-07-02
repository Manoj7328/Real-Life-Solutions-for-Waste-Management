import AdminSidebar from "../../components/Admin/AdminSidebar";
import AdminNavbar from "../../components/Admin/AdminNavbar";
import AdminStats from "../../components/Admin/AdminStats";
import ComplaintTable from "../../components/Admin/ComplaintTable";
import "./Admin.css";

function AdminDashboard() {
  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-main">
        <AdminNavbar />

        <AdminStats />

        <ComplaintTable />
      </div>
    </div>
  );
}

export default AdminDashboard;