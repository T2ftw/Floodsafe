import { useState } from "react";
import Map from "./Map";
import "./App.css";

function App() {
  const getReportLocation = () => {

  if (!navigator.geolocation) {
    setMessage("❌ Location is not supported by this browser.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {

      const location = [
        position.coords.latitude,
        position.coords.longitude
      ];

      setReportLocation(location);

      setMessage("📍 Current location detected.");
    },

    () => {
      setMessage("⚠️ Unable to access your location.");
    }
  );

};

const submitReport = () => {

  const location = reportLocation || [19.0760, 72.8777];

  const newReport = {
    id: Date.now(),
    type: reportType,
    waterDepth: waterDepth,
    location: location
  };

  setReports((previousReports) => [
    ...previousReports,
    newReport
  ]);

  setShowReport(false);

  setMessage(
    "🚨 Flood report submitted and added to the map."
  );

};

  const [showReport, setShowReport] = useState(false);
  const [message, setMessage] = useState("");
  const [focusLocation, setFocusLocation] = useState(null);
  const [showRoute, setShowRoute] = useState(false);

  const [reportType, setReportType] = useState("Flooding");
  const [waterDepth, setWaterDepth] = useState("Less than 15 cm");
  const [reportLocation, setReportLocation] = useState(null);
  const [reports, setReports] = useState([]);

  const findSafeZone = () => {

  const shelterLocation = [19.0725, 72.8625];

  setFocusLocation(shelterLocation);

  setMessage(
    "🏫 Nearest safe shelter found. Map moved to the shelter."
  );
};

  const findSafeRoute = () => {

  setShowRoute(true);

  setMessage(
    "🛣️ Recommended safe route displayed on the map."
  );
};

  return (
    <div className="app">

      {/* HEADER */}

      <header className="header">
        <div>
          <h1>🌊 FLOODSAFE</h1>
          <p>Smart Flood Management & Emergency Response</p>
        </div>

        <div className="status">
          <span className="status-dot"></span>
          SYSTEM ACTIVE
        </div>
      </header>


      {/* MAIN CONTENT */}

      <main className="main-content">

        {/* LEFT PANEL */}

        <section className="control-panel">

          {/* RISK CARD */}

          <div className="risk-card">

            <div className="risk-header">
              <span>CURRENT FLOOD RISK</span>
              <span className="risk-badge">HIGH</span>
            </div>

            <div className="risk-score">
              82
              <span>/100</span>
            </div>

            <div className="risk-description">
              🔴 High flood risk detected in your area
            </div>

            <div className="risk-bar">
              <div className="risk-progress"></div>
            </div>

          </div>


          {/* ACTION BUTTONS */}

          <div className="actions">

            <button
              className="action-button safe"
              onClick={findSafeZone}
            >
              <span>🏫</span>
              <div>
                <strong>Find Safe Zone</strong>
                <small>Locate nearest shelter</small>
              </div>
            </button>


            <button
              className="action-button route"
              onClick={findSafeRoute}
            >
              <span>🛣️</span>
              <div>
                <strong>Find Safe Route</strong>
                <small>Navigate away from danger</small>
              </div>
            </button>


            <button
              className="action-button report"
              onClick={() => setShowReport(true)}
            >
              <span>🚨</span>
              <div>
                <strong>Report Flooding</strong>
                <small>Alert the community</small>
              </div>
            </button>

          </div>


          {/* MESSAGE */}

          {message && (
            <div className="message">
              {message}
            </div>
          )}


          {/* LEGEND */}

          <div className="legend">

            <h3>Risk Levels</h3>

            <div className="legend-item">
              <span className="legend-dot green"></span>
              Low
            </div>

            <div className="legend-item">
              <span className="legend-dot yellow"></span>
              Moderate
            </div>

            <div className="legend-item">
              <span className="legend-dot orange"></span>
              High
            </div>

            <div className="legend-item">
              <span className="legend-dot red"></span>
              Severe
            </div>

          </div>

        </section>


        {/* MAP */}

        <section className="map-section">

          <div className="map-header">
            <div>
              <h2>Live Flood Risk Map</h2>
              <p>Real-time disaster awareness map</p>
            </div>

            <div className="location-status">
              📍 Location detected
            </div>
          </div>

          <Map
  focusLocation={focusLocation}
  showRoute={showRoute}
  reports={reports}
/>

        </section>

      </main>


      {/* REPORT MODAL */}

      {showReport && (
        <div className="modal-overlay">

          <div className="report-modal">

            <button
              className="close-button"
              onClick={() => setShowReport(false)}
            >
              ✕
            </button>

            <h2>🚨 Report Flooding</h2>

            <p>
              Help others by reporting the current situation.
            </p>

            <label>Incident Type</label>

            <select
  value={reportType}
  onChange={(e) => setReportType(e.target.value)}
>
  <option>Flooding</option>
  <option>Waterlogging</option>
  <option>Road Blocked</option>
  <option>Heavy Rainfall</option>
</select>


            <label>Water Depth</label>

            <select
  value={waterDepth}
  onChange={(e) => setWaterDepth(e.target.value)}
>
  <option>Less than 15 cm</option>
  <option>15 - 30 cm</option>
  <option>30 - 60 cm</option>
  <option>More than 60 cm</option>
</select>


            <label>Location</label>

            <button
  className="location-button"
  onClick={getReportLocation}
>
  📍 Use My Current Location
</button>


            <label>Photo (Optional)</label>

            <input type="file" accept="image/*" />


            <button
  className="submit-report"
  onClick={submitReport}
>
  Submit Report
</button>

          </div>

        </div>
      )}

    </div>
  );
}

export default App;