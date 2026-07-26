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

// Fix default marker icon
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
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const destIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function ShipmentMapInner({ shipment }) {
  const isValidCoord = (lat, lng) =>
    typeof lat === "number" &&
    typeof lng === "number" &&
    !isNaN(lat) &&
    !isNaN(lng) &&
    !(lat === 0 && lng === 0); // exclude 0,0 default

  // Handle both old (string) and new (object) formats
  const getLoc = (loc) => {
    if (!loc) return { name: "", lat: null, lng: null };
    if (typeof loc === "object")
      return { name: loc.name || "", lat: loc.latitude, lng: loc.longitude };
    return { name: loc, lat: null, lng: null }; // old string format
  };

  const origin = getLoc(shipment?.origin);
  const current = getLoc(shipment?.currentLocation);
  const dest = getLoc(shipment?.destination);

  const hasOrigin = isValidCoord(origin.lat, origin.lng);
  const hasCurrent = isValidCoord(current.lat, current.lng);
  const hasDest = isValidCoord(dest.lat, dest.lng);

  const positions = [];
  if (hasOrigin) positions.push([origin.lat, origin.lng]);
  if (hasCurrent) positions.push([current.lat, current.lng]);
  if (hasDest) positions.push([dest.lat, dest.lng]);

  const center = hasCurrent
    ? [current.lat, current.lng]
    : hasOrigin
      ? [origin.lat, origin.lng]
      : hasDest
        ? [dest.lat, dest.lng]
        : [20, 0];

  const hasAny = positions.length > 0;

  return (
    <MapContainer
      center={center}
      zoom={hasAny ? 4 : 2}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%", minHeight: "320px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {positions.length >= 2 && (
        <Polyline
          positions={positions}
          color="#4F46E5"
          weight={3}
          dashArray="10 6"
          opacity={0.7}
        />
      )}

      {hasOrigin && (
        <Marker position={[origin.lat, origin.lng]} icon={originIcon}>
          <Popup>
            <strong>Origin</strong>
            <br />
            {origin.name || shipment?.from}
          </Popup>
        </Marker>
      )}
      {hasCurrent && (
        <Marker position={[current.lat, current.lng]} icon={currentIcon}>
          <Popup>
            <strong>Current</strong>
            <br />
            {current.name}
            <br />
            Status: {shipment?.status}
          </Popup>
        </Marker>
      )}
      {hasDest && (
        <Marker position={[dest.lat, dest.lng]} icon={destIcon}>
          <Popup>
            <strong>Destination</strong>
            <br />
            {dest.name || shipment?.to}
          </Popup>
        </Marker>
      )}

      {!hasAny && (
        <div className="absolute inset-0 z-[1000] flex items-center justify-center bg-white/80 pointer-events-none">
          <p className="text-gray-500 text-sm font-medium">
            No location coordinates set
          </p>
        </div>
      )}
    </MapContainer>
  );
}
