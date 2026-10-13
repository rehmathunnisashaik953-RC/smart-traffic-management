import { useState } from "react";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [activePage, setActivePage] = useState("Dashboard");

  const [vehicles, setVehicles] = useState(124);
  const [signal, setSignal] = useState("Green");

  const [violations, setViolations] = useState([
    {
      id: 1,
      vehicle: "AP16AB1234",
      type: "Red Light Jump",
      fine: 1000,
      date: new Date().toLocaleDateString(),
      status: "Pending",
    },
  ]);

  const [vehicleNumber, setVehicleNumber] = useState("");
  const [violationType, setViolationType] =
    useState("Red Light Jump");

  const [search, setSearch] = useState("");

  const fineAmounts = {
    "Red Light Jump": 1000,
    Overspeeding: 2000,
    "No Helmet": 500,
    "No Parking": 500,
    "Wrong Side Driving": 1500,
  };

  const roads = [
    { name: "Main Road", vehicles: 42, status: "Heavy" },
    { name: "City Center", vehicles: 28, status: "Normal" },
    { name: "Highway", vehicles: 35, status: "Moderate" },
    { name: "Market Road", vehicles: 19, status: "Normal" },
  ];

  function handleLogin(e) {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      alert("Enter username and password");
      return;
    }

    setLoggedIn(true);
  }

  function issueFine(e) {
    e.preventDefault();

    if (!vehicleNumber.trim()) {
      alert("Enter vehicle registration number");
      return;
    }

    const vehicle = vehicleNumber.trim().toUpperCase();

    const duplicate = violations.some(
      (v) =>
        v.vehicle === vehicle &&
        v.type === violationType &&
        v.date === new Date().toLocaleDateString()
    );

    if (duplicate) {
      alert("This demo violation is already recorded today.");
      return;
    }

    setViolations((prev) => [
      {
        id: Date.now(),
        vehicle,
        type: violationType,
        fine: fineAmounts[violationType],
        date: new Date().toLocaleDateString(),
        status: "Pending",
      },
      ...prev,
    ]);

    setVehicleNumber("");
    alert("Demo fine recorded successfully!");
  }

  function markPaid(id) {
    setViolations((prev) =>
      prev.map((v) =>
        v.id === id ? { ...v, status: "Paid" } : v
      )
    );
  }

  function handleLogout() {
    setLoggedIn(false);
    setPassword("");
    setActivePage("Dashboard");
  }

  const filteredViolations = violations.filter(
    (v) =>
      v.vehicle.toLowerCase().includes(search.toLowerCase()) ||
      v.type.toLowerCase().includes(search.toLowerCase())
  );

  const pendingAmount = violations
    .filter((v) => v.status === "Pending")
    .reduce((total, v) => total + v.fine, 0);

  // LOGIN PAGE
  if (!loggedIn) {
    return (
      <div className="login-page">
        <form className="login-card" onSubmit={handleLogin}>
          <div className="login-icon">🚦</div>
          <h1>SmartTraffic</h1>
          <p>Smart Traffic Management System</p>

          <label>Username</label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login to Dashboard</button>

          <small>
            Demo login: enter any username and password.
            This is not secure officer authentication.
          </small>
        </form>
      </div>
    );
  }

  // MAIN APPLICATION
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>🚦 SmartTraffic</h2>
        <p className="menu-title">MAIN MENU</p>

        {[
          ["Dashboard", "▦"],
          ["Traffic Monitoring", "🚗"],
          ["Signal Control", "🚥"],
          ["Violations", "📋"],
          ["Analytics", "📊"],
        ].map(([page, icon]) => (
          <div
            key={page}
            className={`menu ${
              activePage === page ? "active" : ""
            }`}
            onClick={() => setActivePage(page)}
          >
            {icon} {page}
          </div>
        ))}

        <div className="sidebar-bottom">
          <p>Logged in as</p>
          <strong>{username}</strong>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <h1>{activePage}</h1>
            <p>Smart Traffic Management System</p>
          </div>
          <span className="live">● DEMO MODE</span>
        </header>

        {/* DASHBOARD */}
        {activePage === "Dashboard" && (
          <>
            <section className="welcome">
              <div>
                <h2>Welcome, {username} 👋</h2>
                <p>
                  Monitor traffic, signals and traffic violations.
                </p>
              </div>
              <button
                onClick={() => setVehicles((v) => v + 1)}
              >
                + Simulate Vehicle
              </button>
            </section>

            <section className="stats">
              <div className="stat-card">
                <span>Total Vehicles</span>
                <h2>🚗 {vehicles}</h2>
                <p>Demo vehicle count</p>
              </div>

              <div className="stat-card">
                <span>Active Signals</span>
                <h2>🚦 12</h2>
                <p>Configured signals</p>
              </div>

              <div className="stat-card">
                <span>Violations</span>
                <h2>⚠️ {violations.length}</h2>
                <p>Recorded demo violations</p>
              </div>

              <div className="stat-card">
                <span>Pending Fines</span>
                <h2>₹{pendingAmount}</h2>
                <p>Unpaid demo amount</p>
              </div>
            </section>

            <section className="content-grid">
              <div className="panel">
                <h2>Traffic Overview</h2>
                <p className="muted">
                  Illustrative traffic distribution
                </p>

                <div className="chart">
                  {[45, 70, 52, 88, 62, 96, 72, 55, 82, 65, 90, 48].map(
                    (height, index) => (
                      <div className="bar-wrap" key={index}>
                        <div
                          className="bar"
                          style={{ height: `${height}%` }}
                        />
                        <small>{index + 1}</small>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="panel">
                <h2>Traffic Signal</h2>
                <p className="muted">Demo signal controller</p>

                <div className="traffic-light">
                  <span className={signal === "Red" ? "red on" : "red"} />
                  <span
                    className={
                      signal === "Yellow" ? "yellow on" : "yellow"
                    }
                  />
                  <span
                    className={
                      signal === "Green" ? "green on" : "green"
                    }
                  />
                </div>

                <h3>Signal: {signal}</h3>

                <button onClick={() => setActivePage("Signal Control")}>
                  Manage Signals
                </button>
              </div>
            </section>

            <section className="panel">
              <h2>Recent Violations</h2>
              <ViolationTable
                violations={violations.slice(0, 5)}
                onPaid={markPaid}
              />
              <button onClick={() => setActivePage("Violations")}>
                View All Violations
              </button>
            </section>
          </>
        )}

        {/* TRAFFIC MONITORING */}
        {activePage === "Traffic Monitoring" && (
          <section className="panel">
            <h2>Road Traffic Monitoring</h2>
            <p className="muted">
              Sample data for project demonstration.
            </p>

            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Road Name</th>
                    <th>Vehicles</th>
                    <th>Traffic Status</th>
                  </tr>
                </thead>
                <tbody>
                  {roads.map((road) => (
                    <tr key={road.name}>
                      <td>{road.name}</td>
                      <td>{road.vehicles}</td>
                      <td>
                        <span
                          className={`status ${road.status.toLowerCase()}`}
                        >
                          {road.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button onClick={() => setVehicles((v) => v + 1)}>
              + Simulate Vehicle
            </button>
            <p>Total demo vehicle count: {vehicles}</p>
          </section>
        )}

        {/* SIGNAL CONTROL */}
        {activePage === "Signal Control" && (
          <section className="panel signal-panel">
            <h2>Traffic Signal Control</h2>
            <p className="muted">
              Change the simulated signal for this project.
            </p>

            <div className="traffic-light">
              <span className={signal === "Red" ? "red on" : "red"} />
              <span
                className={signal === "Yellow" ? "yellow on" : "yellow"}
              />
              <span className={signal === "Green" ? "green on" : "green"} />
            </div>

            <h3>Current Signal: {signal}</h3>

            <div className="signal-buttons">
              <button onClick={() => setSignal("Red")}>Red</button>
              <button onClick={() => setSignal("Yellow")}>Yellow</button>
              <button onClick={() => setSignal("Green")}>Green</button>
            </div>

            <p className="muted">
              These controls only change the website demo. They do not
              control real road traffic lights.
            </p>
          </section>
        )}

        {/* VIOLATIONS AND FINES */}
        {activePage === "Violations" && (
          <>
            <section className="stats">
              <div className="stat-card">
                <span>Total Violations</span>
                <h2>{violations.length}</h2>
              </div>
              <div className="stat-card">
                <span>Pending Fines</span>
                <h2>
                  {violations.filter((v) => v.status === "Pending").length}
                </h2>
              </div>
              <div className="stat-card">
                <span>Pending Amount</span>
                <h2>₹{pendingAmount}</h2>
              </div>
            </section>

            <section className="panel">
              <h2>Record Traffic Violation</h2>
              <p className="muted">
                Enter the vehicle number and choose a violation.
              </p>

              <form className="fine-form" onSubmit={issueFine}>
                <label>Vehicle Registration Number</label>
                <input
                  type="text"
                  placeholder="e.g. AP16AB1234"
                  value={vehicleNumber}
                  onChange={(e) => setVehicleNumber(e.target.value)}
                  required
                />

                <label>Violation Type</label>
                <select
                  value={violationType}
                  onChange={(e) => setViolationType(e.target.value)}
                >
                  {Object.keys(fineAmounts).map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>

                <h3>Demo Fine Amount: ₹{fineAmounts[violationType]}</h3>

                <button type="submit">Record Demo Fine</button>
              </form>
            </section>

            <section className="panel">
              <h2>Violation Records</h2>

              <input
                className="search-input"
                type="text"
                placeholder="Search vehicle number or violation..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <ViolationTable
                violations={filteredViolations}
                onPaid={markPaid}
              />
            </section>
          </>
        )}

        {/* ANALYTICS */}
        {activePage === "Analytics" && (
          <>
            <section className="stats">
              <div className="stat-card">
                <span>Total Violations</span>
                <h2>{violations.length}</h2>
              </div>
              <div className="stat-card">
                <span>Paid Fines</span>
                <h2>
                  ₹
                  {violations
                    .filter((v) => v.status === "Paid")
                    .reduce((sum, v) => sum + v.fine, 0)}
                </h2>
              </div>
              <div className="stat-card">
                <span>Pending Fines</span>
                <h2>₹{pendingAmount}</h2>
              </div>
            </section>

            <section className="panel">
              <h2>Violations by Type</h2>

              {Object.keys(fineAmounts).map((type) => {
                const count = violations.filter(
                  (v) => v.type === type
                ).length;

                return (
                  <div className="analytics-row" key={type}>
                    <span>{type}</span>
                    <div className="analytics-track">
                      <div
                        className="analytics-fill"
                        style={{
                          width: `${
                            violations.length
                              ? (count / violations.length) * 100
                              : 0
                          }%`,
                        }}
                      />
                    </div>
                    <strong>{count}</strong>
                  </div>
                );
              })}
            </section>
          </>
        )}

        <footer>
          Smart Traffic Management System | MCA Project | Demo Data
        </footer>
      </main>
    </div>
  );
}

function ViolationTable({ violations, onPaid }) {
  if (violations.length === 0) {
    return <p>No violation records found.</p>;
  }

  return (
    <div className="table-scroll">
      <table>
        <thead>
          <tr>
            <th>Vehicle Number</th>
            <th>Violation</th>
            <th>Date</th>
            <th>Fine</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {violations.map((v) => (
            <tr key={v.id}>
              <td>{v.vehicle}</td>
              <td>{v.type}</td>
              <td>{v.date}</td>
              <td>₹{v.fine}</td>
              <td>
                <span
                  className={`status ${
                    v.status === "Paid" ? "normal" : "heavy"
                  }`}
                >
                  {v.status}
                </span>
              </td>
              <td>
                {v.status === "Pending" ? (
                  <button onClick={() => onPaid(v.id)}>
                    Mark Paid
                  </button>
                ) : (
                  "Completed"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;