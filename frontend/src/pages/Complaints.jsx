import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Complaints.css";
import { toast } from "react-toastify";

import SearchFilter from "../components/Complaints/SearchFilter";
import ComplaintCard from "../components/Complaints/ComplaintCard";

function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [wasteFilter, setWasteFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("Newest");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/complaints",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComplaints(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch complaints");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/complaints/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchComplaints();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update complaint status");
    }
  };

  const deleteComplaint = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this complaint?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/complaints/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Complaint deleted successfully");

      fetchComplaints();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete complaint");
    }
  };

  // ============================
  // Search + Filter + Sort Logic
  // ============================

  const filteredComplaints = complaints
    .filter((item) => {
      const keyword = search.toLowerCase();

      const matchesSearch =
        item.title.toLowerCase().includes(keyword) ||
        item.location.toLowerCase().includes(keyword) ||
        item.description.toLowerCase().includes(keyword) ||
        item.wasteType.toLowerCase().includes(keyword);

      const matchesStatus =
        statusFilter === "All" ||
        item.status === statusFilter;

      const matchesWaste =
        wasteFilter === "All" ||
        item.wasteType.toLowerCase().includes(
          wasteFilter.toLowerCase()
        );

      return (
        matchesSearch &&
        matchesStatus &&
        matchesWaste
      );
    })
    .sort((a, b) => {
      if (sortOrder === "Newest") {
        return (
          new Date(b.createdAt) -
          new Date(a.createdAt)
        );
      }

      return (
        new Date(a.createdAt) -
        new Date(b.createdAt)
      );
    });

  return (
    <div className="complaints-page">
      <h1>Reported Complaints</h1>

      <SearchFilter
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        wasteFilter={wasteFilter}
        setWasteFilter={setWasteFilter}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      {loading ? (
        <h2>Loading complaints...</h2>
      ) : filteredComplaints.length === 0 ? (
        <h2>No complaints found.</h2>
      ) : (
        <div className="complaints-grid">
          {filteredComplaints.map((item) => (
            <ComplaintCard
              key={item._id}
              item={item}
              updateStatus={updateStatus}
              deleteComplaint={deleteComplaint}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Complaints;