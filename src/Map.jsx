import { useEffect } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  Polyline,
  useMap
} from "react-leaflet";

import "leaflet/dist/leaflet.css";


function MapController({ target }) {

  const map = useMap();

  useEffect(() => {

    if (target) {
      map.flyTo(target, 15, {
        duration: 1.5
      });
    }

  }, [target, map]);

  return null;
}


function Map({ focusLocation, showRoute,reports }) {

  const position = [19.0760, 72.8777];

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{
        height: "100%",
        width: "100%"
      }}
    >

      <MapController target={focusLocation} />


      {/* OpenStreetMap */}

      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* 🛣️ RECOMMENDED SAFE ROUTE */}

{showRoute && (
  <Polyline
    positions={[
      [19.0760, 72.8777],
      [19.0748, 72.8745],
      [19.0735, 72.8715],
      [19.0728, 72.8685],
      [19.0725, 72.8625]
    ]}
    pathOptions={{
      color: "blue",
      weight: 7,
      opacity: 0.9
    }}
  >

    <Popup>
      🛣️ <b>Recommended Safe Route</b>
      <br />
      Destination: Safe Shelter
      <br />
      Avoiding high-risk areas
    </Popup>

  </Polyline>
)}


      {/* USER LOCATION */}

      <Marker position={position}>

        <Popup>
          📍 <b>You are here</b>
        </Popup>

      </Marker>


      {/* HIGH RISK */}

      <Circle
        center={[19.0800, 72.8800]}
        radius={700}
        pathOptions={{
          color: "red",
          fillColor: "red",
          fillOpacity: 0.35
        }}
      >

        <Popup>
          🔴 <b>HIGH FLOOD RISK</b>
          <br />
          Risk Score: 82/100
        </Popup>

      </Circle>


      {/* MEDIUM RISK */}

      <Circle
        center={[19.0700, 72.8700]}
        radius={500}
        pathOptions={{
          color: "orange",
          fillColor: "orange",
          fillOpacity: 0.30
        }}
      >

        <Popup>
          🟠 <b>MEDIUM FLOOD RISK</b>
          <br />
          Risk Score: 55/100
        </Popup>

      </Circle>


      {/* LOW RISK */}

      <Circle
        center={[19.0850, 72.8650]}
        radius={400}
        pathOptions={{
          color: "green",
          fillColor: "green",
          fillOpacity: 0.25
        }}
      >

        <Popup>
          🟢 <b>LOW FLOOD RISK</b>
          <br />
          Risk Score: 20/100
        </Popup>

      </Circle>


      {/* SAFE SHELTER */}

      <Marker position={[19.0725, 72.8625]}>

        <Popup>

          🏫 <b>Safe Shelter</b>

          <br />

          Capacity: 500 people

          <br />

          Distance: 1.2 km

        </Popup>

      </Marker>


      {/* HOSPITAL */}

      <Marker position={[19.0820, 72.8920]}>

        <Popup>

          🏥 <b>Emergency Hospital</b>

          <br />

          24/7 Emergency Services

        </Popup>

      </Marker>

        {/* 🚨 CITIZEN REPORTS */}

{reports.map((report) => (

  <Marker
    key={report.id}
    position={report.location}
  >

    <Popup>

      🚨 <b>Citizen Flood Report</b>

      <br />

      Type: {report.type}

      <br />

      Water Depth: {report.waterDepth}

    </Popup>

  </Marker>

))}
    </MapContainer>
  );
}

export default Map;