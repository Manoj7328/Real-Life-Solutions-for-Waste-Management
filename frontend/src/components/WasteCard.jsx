function WasteCard({ title, location, status }) {
  return (
    <div className="card">
      <h2>{title}</h2>

      <p>
        <strong>Location:</strong> {location}
      </p>

      <p>
        <strong>Status:</strong> {status}
      </p>
    </div>
  );
}

export default WasteCard;