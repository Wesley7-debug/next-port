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

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const originIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const currentIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const destIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function validCoord(lat, lng) {
  if (lat == null || lng == null) return null;
  const a = parseFloat(lat),
    b = parseFloat(lng);
  if (isNaN(a) || isNaN(b)) return null;
  if (a === 0 && b === 0) return null;
  return [a, b];
}

export default function ShipmentMapInner({ shipment }) {
  const o = validCoord(shipment?.origin?.latitude, shipment?.origin?.longitude);
  const c = validCoord(
    shipment?.currentLocation?.latitude,
    shipment?.currentLocation?.longitude,
  );
  const d = validCoord(
    shipment?.destination?.latitude,
    shipment?.destination?.longitude,
  );

  const oName = shipment?.origin?.name || shipment?.from || "Origin";
  const cName = shipment?.currentLocation?.name || "Current Location";
  const dName = shipment?.destination?.name || shipment?.to || "Destination";

  const pts = [o, c, d].filter(Boolean);
  const route = c && d ? [c, d] : pts.length >= 2 ? pts : [];
  const center = c || o || d || [20, 0];
  const zoom = pts.length > 0 ? 4 : 2;

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%", minHeight: "320px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {route.length >= 2 && (
        <Polyline
          positions={route}
          color="#4F46E5"
          weight={3}
          dashArray="10 6"
          opacity={0.7}
        />
      )}

      {o && (
        <Marker position={o} icon={originIcon}>
          <Popup>
            <strong>Origin</strong>
            <br />
            {oName}
          </Popup>
        </Marker>
      )}
      {c && (
        <Marker position={c} icon={currentIcon}>
          <Popup>
            <strong>Current</strong>
            <br />
            {cName}
            <br />
            Status: {shipment?.status}
          </Popup>
        </Marker>
      )}
      {d && (
        <Marker position={d} icon={destIcon}>
          <Popup>
            <strong>Destination</strong>
            <br />
            {dName}
          </Popup>
        </Marker>
      )}

      {pts.length === 0 && (
        <div className="absolute inset-0 z-[1000] flex items-center justify-center bg-white/80 pointer-events-none">
          <p className="text-gray-500 text-sm font-medium">
            No location coordinates set
          </p>
        </div>
      )}
    </MapContainer>
  );
}
