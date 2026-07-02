import "../../pages/Complaints.css";

function SearchFilter({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  wasteFilter,
  setWasteFilter,
  sortOrder,
  setSortOrder,
}) {
  return (
    <div className="search-filter-container">
      <input
        type="text"
        placeholder="🔍 Search by title, location, waste type..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="filter-select"
      >
        <option value="All">All Status</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      <select
        value={wasteFilter}
        onChange={(e) => setWasteFilter(e.target.value)}
        className="filter-select"
      >
        <option value="All">All Waste Types</option>
        <option value="Plastic">Plastic</option>
        <option value="Organic">Organic</option>
        <option value="Metal">Metal</option>
        <option value="Glass">Glass</option>
        <option value="E-Waste">E-Waste</option>
        <option value="Other">Other</option>
      </select>

      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className="filter-select"
      >
        <option value="Newest">Newest First</option>
        <option value="Oldest">Oldest First</option>
      </select>
    </div>
  );
}

export default SearchFilter;