import { useEffect, useState } from "react";
import axios from "axios";

import AdminSidebar from "../../components/Admin/AdminSidebar";
import "./Admin.css";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    fetchUsers();
  }, []);

  // ==========================
  // Fetch Users
  // ==========================
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://real-life-solutions-for-waste-management.onrender.com/api/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Change Role
  // ==========================
  const changeRole = async (id, role) => {
    if (
      !window.confirm(
        `Are you sure you want to make this user ${
          role === "admin" ? "an Admin" : "a User"
        }?`
      )
    ) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `https://real-life-solutions-for-waste-management.onrender.com/api/users/${id}/role`,
        { role },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(res.data.message);

      setTimeout(() => {
        setMessage("");
      }, 2500);

      fetchUsers();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to update role."
      );
    }
  };

  // ==========================
  // Search Filter
  // ==========================
  const filteredUsers = users.filter((user) => {
    return (
      user.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      user.email
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  });

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-main">

        <div className="admin-navbar">
          <h2>Manage Users</h2>
        </div>

        {message && (
          <div
            style={{
              background: "#16a34a",
              color: "#fff",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "20px",
              fontWeight: "600",
            }}
          >
            {message}
          </div>
        )}

        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            marginBottom: "20px",
          }}
        />

        <div
          className="admin-table"
          style={{
            background: "#fff",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow:
              "0 2px 10px rgba(0,0,0,.08)",
          }}
        >
          <table>
            <thead>
              <tr
                style={{
                  background: "#198754",
                  color: "#fff",
                }}
              >
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {loading ? (
                <tr>
                  <td
                    colSpan="5"
                    style={{
                      textAlign: "center",
                      padding: "30px",
                    }}
                  >
                    Loading users...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    style={{
                      textAlign: "center",
                      padding: "30px",
                    }}
                  >
                    No users found.
                  </td>
                </tr>
              ) : (                filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>

                    <td>{user.email}</td>

                    <td>
                      <span
                        style={{
                          background:
                            user.role === "admin"
                              ? "#198754"
                              : "#6c757d",
                          color: "#fff",
                          padding: "6px 12px",
                          borderRadius: "20px",
                          fontSize: "13px",
                          fontWeight: "600",
                        }}
                      >
                        {user.role === "admin"
                          ? "Admin"
                          : "User"}
                      </span>
                    </td>

                    <td>
                      {new Date(
                        user.createdAt
                      ).toLocaleDateString()}
                    </td>

                    <td>
                      {user._id === currentUserId ? (
                        <button
                          disabled
                          style={{
                            background: "#adb5bd",
                            color: "#fff",
                            border: "none",
                            padding: "8px 14px",
                            borderRadius: "6px",
                          }}
                        >
                          Current Admin
                        </button>
                      ) : user.role === "user" ? (
                        <button
                          onClick={() =>
                            changeRole(
                              user._id,
                              "admin"
                            )
                          }
                          style={{
                            background: "#198754",
                            color: "#fff",
                            border: "none",
                            padding: "8px 14px",
                            borderRadius: "6px",
                            cursor: "pointer",
                          }}
                        >
                          Make Admin
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            changeRole(
                              user._id,
                              "user"
                            )
                          }
                          style={{
                            background: "#dc3545",
                            color: "#fff",
                            border: "none",
                            padding: "8px 14px",
                            borderRadius: "6px",
                            cursor: "pointer",
                          }}
                        >
                          Remove Admin
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default AdminUsers;