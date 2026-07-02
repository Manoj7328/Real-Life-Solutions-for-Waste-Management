import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleReport = () => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/report");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <span className="hero-tag">
              ♻ SMART WASTE SOLUTIONS
            </span>

            <h1>
              Smart Waste
              <br />
              Disposal Solutions
            </h1>

            <p>
              Leveraging smart technologies and sustainable practices
              to deliver streamlined waste disposal solutions that are
              both efficient and environmentally conscious.
            </p>

            <div className="hero-buttons">
              <button
                className="primary-btn"
                onClick={handleReport}
              >
                Report Waste
              </button>

              <button
                className="secondary-btn"
                onClick={() => navigate("/learn-more")}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}

      <section className="stats">
        <div className="card">
          <h2>120+</h2>
          <p>Total Reports</p>
        </div>

        <div className="card">
          <h2>85+</h2>
          <p>Resolved Cases</p>
        </div>

        <div className="card">
          <h2>40+</h2>
          <p>Active Users</p>
        </div>

        <div className="card">
          <h2>15+</h2>
          <p>Municipal Partners</p>
        </div>
      </section>

      {/* About */}

      <section className="about">
        <h2>Building Cleaner Communities</h2>

        <p>
          Our Smart Waste Management platform empowers citizens to
          report waste issues, track complaints, and collaborate
          with municipal authorities to maintain cleaner and healthier
          cities.
        </p>
      </section>

      {/* Features */}

      <section className="features">
        <h2>Why Choose Our Platform?</h2>

        <div className="feature-grid">

          <div className="feature-card">
            <h3>📍 Smart Tracking</h3>
            <p>
              Report waste locations accurately using location-based services.
            </p>
          </div>

          <div className="feature-card">
            <h3>📷 Image Upload</h3>
            <p>
              Upload real-time waste images for faster action.
            </p>
          </div>

          <div className="feature-card">
            <h3>📊 Live Monitoring</h3>
            <p>
              Track complaint progress through a dedicated dashboard.
            </p>
          </div>

          <div className="feature-card">
            <h3>♻ Eco Friendly</h3>
            <p>
              Encourage sustainable waste disposal and recycling.
            </p>
          </div>

        </div>
      </section>
    </>
  );
}

export default Home;