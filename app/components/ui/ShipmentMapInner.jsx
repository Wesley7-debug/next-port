"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default Leaflet marker icon
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Origin = Green
const originIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Current location = Red
const currentIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Destination = Blue
const destIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Normalize coordinates
function normalizeCoord(lat, lng) {
  if (lat == null || lng == null) {
    return null;
  }

  const a = parseFloat(lat);
  const b = parseFloat(lng);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    return null;
  }

  // If coordinates were accidentally provided as [lng, lat],
  // swap them to Leaflet's expected [lat, lng] format.
  if (Math.abs(a) > 90 && Math.abs(b) <= 90) {
    return [b, a];
  }

  return [a, b];
}

export default function ShipmentMapInner({ shipment }) {
  const o = normalizeCoord(
    shipment?.origin?.latitude,
    shipment?.origin?.longitude
  );

  const c = normalizeCoord(
    shipment?.currentLocation?.latitude,
    shipment?.currentLocation?.longitude
  );

  const d = normalizeCoord(
    shipment?.destination?.latitude,
    shipment?.destination?.longitude
  );

  const oName =
    shipment?.origin?.name ||
    shipment?.from ||
    "Origin";

  const cName =
    shipment?.currentLocation?.name ||
    "Current Location";

  const dName =
    shipment?.destination?.name ||
    shipment?.to ||
    "Destination";

  // Collect all valid coordinates
  const positions = [];

  if (o) positions.push(o);
  if (c) positions.push(c);
  if (d) positions.push(d);

  // Draw route from current location to destination
  // when both coordinates are available.
  const polylinePositions =
    c && d
      ? [c, d]
      : positions.length >= 2
        ? positions
        : [];

  // Default map centre: Lagos
  const center =
    c ||
    o ||
    [6.5244, 3.3792];

  return (
    <MapContainer
      center={center}
      zoom={4}
      scrollWheelZoom={true}
      style={{
        height: "100%",
        width: "100%",
        minHeight: "320px",
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Shipment route */}
      {polylinePositions.length >= 2 && (
        <Polyline
          positions={polylinePositions}
          color="#4F46E5"
          weight={3}
          dashArray="10 6"
          opacity={0.7}
        />
      )}

      {/* Origin */}
      {o && (
        <Marker
          position={o}
          icon={originIcon}
        >
          <Popup>
            <strong>Origin</strong>
            <br />
            {oName}
          </Popup>
        </Marker>
      )}

      {/* Current Location */}
      {c && (
        <Marker
          position={c}
          icon={currentIcon}
        >
          <Popup>
            <strong>Current Location</strong>
            <br />
            {cName}
            <br />
            Status: {shipment?.status}
          </Popup>
        </Marker>
      )}

      {/* Destination */}
      {d && (
        <Marker
          position={d}
          icon={destIcon}
        >
          <Popup>
            <strong>Destination</strong>
            <br />
            {dName}
          </Popup>
        </Marker>
      )}

      {/* Fallback when no coordinates exist */}
      {positions.length === 0 && (
        <Marker position={center}>
          <Popup>
            Shipment {shipment?.shipmentId}
            <br />
            Status: {shipment?.status}
            <br />
            <em>No coordinates</em>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}/>
      )}
      {oLat != null && oLng != null && (
        <Marker position={[oLat, oLng]} icon={originIcon}>
          <Popup>
            <strong>Origin</strong>
            <br />
            {oName}
          </Popup>
        </Marker>
      )}
      {cLat != null && cLng != null && (
        <Marker position={[cLat, cLng]} icon={currentIcon}>
          <Popup>
            <strong>Current Location</strong>
            <br />
            {cName}
            <br />
            Status: {shipment?.status}
          </Popup>
        </Marker>
      )}
      {dLat != null && dLng != null && (
        <Marker position={[dLat, dLng]} icon={destIcon}>
          <Popup>
            <strong>Destination</strong>
            <br />
            {dName}
          </Popup>
        </Marker>
      )}
      {positions.length === 0 && (
        <Marker position={center}>
          <Popup>
            Shipment {shipment?.shipmentId}
            <br />
            Status: {shipment?.status}
            <br />
            <em>No coordinates</em>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
