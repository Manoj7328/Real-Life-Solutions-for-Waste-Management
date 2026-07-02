import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        formData
      );

      // Save login information
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user.id);
      localStorage.setItem("name", res.data.user.name);
      localStorage.setItem("role", res.data.user.role);

      toast.success(res.data.message);

      setTimeout(() => {
        if (res.data.user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/dashboard");
        }
      }, 1200);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Login Failed"
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-left">
          <h1>Welcome Back</h1>

          <p>
            Access your dashboard, track waste reports,
            and contribute towards a cleaner environment.
          </p>
        </div>

        <div className="auth-right">
          <h2>Login</h2>

          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
          />

          <button
            className="login-btn"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;