import { useState } from "react";

function Dashboard({ onLogout }) {
  const [violations, setViolations] = useState([]);
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [violationType, setViolationType] = useState("Red Light");
  const [fineAmount, setFineAmount] = useState(500);

  function addViolation(e) {
    e.preventDefault();

    setViolations([
      ...violations,
      {
        id: Date.now(),
        vehicleNumber,
        violationType,
        fineAmount: Number(fineAmount),
        status: "Pending",
      },
    ]);

    setVehicleNumber("");
    setViolationType("Red Light");
    setFineAmount(500);
  }

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h2>🚦 Smart Traffic System</h2>
        <button onClick={onLogout} style={styles.logout}>
          Logout
        </button>
      </header>

      <main style={styles.main}>
        <h1>Traffic Dashboard</h1>
        <p>Manage and monitor traffic violations.</p>

        <div style={styles.cards}>
          <div style={styles.card}>
            <h3>Total Violations</h3>
            <h2>{violations.length}</h2>
          </div>
          <div style={styles.card}>
            <h3>Pending Violations</h3>
            <h2>
              {violations.filter((v) => v.status === "Pending").length}
            </h2>
          </div>
          <div style={styles.card}>
            <h3>Total Fine Amount</h3>
            <h2>₹{violations.reduce((sum, v) => sum + v.fineAmount, 0)}</h2>
          </div>
        </div>

        <section style={styles.panel}>
          <h2>Add Traffic Violation</h2>

          <form onSubmit={addViolation} style={styles.form}>
            <label>Vehicle Number</label>
            <input
              placeholder="AP39AB1234"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
              required
            />

            <label>Violation Type</label>
            <select
              value={violationType}
              onChange={(e) => {
                setViolationType(e.target.value);
                setFineAmount(
                  e.target.value === "Red Light"
                    ? 500
                    : e.target.value === "No Helmet"
                    ? 1000
                    : e.target.value === "Over Speeding"
                    ? 1500
                    : 500
                );
              }}
            >
              <option>Red Light</option>
              <option>No Helmet</option>
              <option>Over Speeding</option>
              <option>Wrong Parking</option>
            </select>

            <label>Fine Amount (₹)</label>
            <input
              type="number"
              min="1"
              value={fineAmount}
              onChange={(e) => setFineAmount(e.target.value)}
              required
            />

            <button type="submit" style={styles.addButton}>
              + Add Violation
            </button>
          </form>
        </section>

        <section style={styles.panel}>
          <h2>Recent Violations</h2>

          {violations.length === 0 ? (
            <p>No violations added yet.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th>Vehicle Number</th>
                    <th>Violation</th>
                    <th>Fine</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {violations.map((v) => (
                    <tr key={v.id}>
                      <td>{v.vehicleNumber.toUpperCase()}</td>
                      <td>{v.violationType}</td>
                      <td>₹{v.fineAmount}</td>
                      <td>{v.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f1f5f9",
    color: "#172033",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    background: "#10243e",
    color: "white",
    padding: "16px 5%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  logout: {
    padding: "10px 18px",
    background: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  main: {
    maxWidth: "1100px",
    margin: "auto",
    padding: "25px 16px",
  },
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "16px",
    margin: "25px 0",
  },
  card: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px #0001",
  },
  panel: {
    background: "white",
    padding: "22px",
    borderRadius: "10px",
    marginBottom: "22px",
    boxShadow: "0 2px 8px #0001",
  },
  form: {
    display: "grid",
    gap: "12px",
    maxWidth: "450px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
  },
  addButton: {
    padding: "12px",
    background: "#087fdb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default Dashboard;