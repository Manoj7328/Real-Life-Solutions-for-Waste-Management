import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function ReportWaste() {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    wasteType: "",
    description: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const data = new FormData();

      data.append("title", formData.title);
      data.append("location", formData.location);
      data.append("description", formData.description);
      data.append("wasteType", formData.wasteType);

      if (selectedImage) {
        data.append("image", selectedImage);
      }

      await axios.post(
        "http://localhost:5000/api/complaints",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Waste Report Submitted Successfully!");
      setTimeout(() => {
      // Optional: navigate("/complaints");
      }, 1000);

      setFormData({
        title: "",
        location: "",
        wasteType: "",
        description: "",
      });

      setSelectedImage(null);
      setPreviewImage(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit complaint");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="report-page">
      <div className="report-card">
        <h1>♻ Report Waste</h1>

        <p className="report-subtitle">
          Help keep your city clean by reporting waste issues.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Waste Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location (Area / City)"
            value={formData.location}
            onChange={handleChange}
            required
          />

          <select
            name="wasteType"
            value={formData.wasteType}
            onChange={handleChange}
            required
          >
            <option value="">Select Waste Type</option>
            <option>Plastic Waste</option>
            <option>Organic Waste</option>
            <option>E-Waste</option>
            <option>Paper Waste</option>
            <option>Metal Waste</option>
            <option>Medical Waste</option>
          </select>

          <textarea
            rows="5"
            name="description"
            placeholder="Describe the waste problem..."
            value={formData.description}
            onChange={handleChange}
            required
          />

          <label className="upload-label">
            Upload Waste Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />

          {previewImage && (
            <div className="preview-box">
              <img src={previewImage} alt="Preview" />
            </div>
          )}

          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Report"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReportWaste;