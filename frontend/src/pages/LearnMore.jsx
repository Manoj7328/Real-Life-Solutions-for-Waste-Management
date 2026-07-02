import { useNavigate } from "react-router-dom";

function LearnMore() {
  const navigate = useNavigate();

  return (
    <div className="learn-container">
      <h1>About SmartWaste</h1>

      <p>
        SmartWaste is a web application that helps citizens report waste
        issues directly to municipal authorities. It promotes cleaner
        cities through technology and active public participation.
      </p>

      <h2>How It Works</h2>

      <ol>
        <li>Register or Login</li>
        <li>Report waste with an image and location</li>
        <li>Municipality reviews the complaint</li>
        <li>Track the complaint status</li>
        <li>Waste gets cleaned</li>
      </ol>

      <h2>Why Use SmartWaste?</h2>

      <ul>
        <li>✔ Quick complaint reporting</li>
        <li>✔ Real-time complaint tracking</li>
        <li>✔ Image uploads for better verification</li>
        <li>✔ Cleaner and healthier communities</li>
        <li>✔ Encourages citizen participation</li>
      </ul>

      <button
        className="primary-btn"
        onClick={() => navigate("/report")}
      >
        Report Waste
      </button>
    </div>
  );
}

export default LearnMore;