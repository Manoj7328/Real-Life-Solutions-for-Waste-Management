import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import LearnMore from "./pages/LearnMore";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import ReportWaste from "./pages/ReportWaste";
import Complaints from "./pages/Complaints";

import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminComplaints from "./pages/Admin/AdminComplaints";
import AdminUsers from "./pages/Admin/AdminUsers";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Routes with Navbar */}
        <Route element={<Layout />}>

          <Route path="/" element={<Home />} />

          <Route
            path="/learn-more"
            element={<LearnMore />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/report"
            element={
              <ProtectedRoute>
                <ReportWaste />
              </ProtectedRoute>
            }
          />

          <Route
            path="/complaints"
            element={
              <ProtectedRoute>
                <Complaints />
              </ProtectedRoute>
            }
          />

          {/* =======================
              ADMIN ROUTES
          ======================= */}

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/complaints"
            element={
              <ProtectedRoute>
                <AdminComplaints />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <ProtectedRoute>
                <AdminUsers />
              </ProtectedRoute>
            }
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;