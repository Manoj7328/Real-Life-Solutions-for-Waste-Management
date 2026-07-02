import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showNavbar, setShowNavbar] = useState(true);

  // Re-check login whenever the route changes
  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    let prevScrollPos = window.scrollY;

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      if (
        currentScrollPos > prevScrollPos &&
        currentScrollPos > 100
      ) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <nav className={`navbar ${showNavbar ? "show" : "hide"}`}>
      <h2 className="logo">♻ SmartWaste</h2>

      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>

        {!isLoggedIn ? (
          <>
            <li>
              <Link to="/learn-more">Learn More</Link>
            </li>

            <li>
              <Link to="/login">Login</Link>
            </li>

            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>

            <li>
              <Link to="/report">Report Waste</Link>
            </li>

            <li>
              <Link to="/complaints">Complaints</Link>
            </li>

            <li>
              <button
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;