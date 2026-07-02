import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/register",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }
      );

      toast.success(res.data.message);

      setTimeout(() => {navigate("/login");}, 1200);
    } catch (err) {
      toast.error(err.response?.data?.message ||"Registration Failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <div className="auth-left">
          <h1>Join SmartWaste</h1>

          <p>
            Help build cleaner cities by reporting waste issues,
            tracking complaints and supporting sustainable practices.
          </p>
        </div>

        <div className="auth-right">
          <h2>Create Account</h2>

          <input
            type="text"
            placeholder="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

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
          />

          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <button
            className="login-btn"
            onClick={handleRegister}
          >
            Register
          </button>
        </div>

      </div>
    </div>
  );
}

export default Register;