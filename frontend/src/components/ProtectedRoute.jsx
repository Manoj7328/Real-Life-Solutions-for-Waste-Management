import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const location = useLocation();

  // User not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Protect admin routes
  if (
    location.pathname.startsWith("/admin") &&
    role !== "admin"
  ) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;