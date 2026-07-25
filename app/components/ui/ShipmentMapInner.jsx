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
  const oLat = shipment?.origin?.latitude;
  const oLng = shipment?.origin?.longitude;
  const cLat = shipment?.currentLocation?.latitude;
  const cLng = shipment?.currentLocation?.longitude;
  const dLat = shipment?.destination?.latitude;
  const dLng = shipment?.destination?.longitude;

  const oName = shipment?.origin?.name || shipment?.from || "Origin";
  const cName = shipment?.currentLocation?.name || "Current Location";
  const dName = shipment?.destination?.name || shipment?.to || "Destination";

  const positions = [];
  if (oLat != null && oLng != null) positions.push([oLat, oLng]);
  if (cLat != null && cLng != null) positions.push([cLat, cLng]);
  if (dLat != null && dLng != null) positions.push([dLat, dLng]);

  const center =
    cLat != null && cLng != null
      ? [cLat, cLng]
      : oLat != null && oLng != null
        ? [oLat, oLng]
        : [6.5244, 3.3792];

  return (
    <MapContainer
      center={center}
      zoom={4}
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
