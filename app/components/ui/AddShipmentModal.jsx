"use client";

import React, { useState, useEffect } from "react";
import { X, Copy, Check } from "lucide-react";
import { getCoordinates } from "@/libs/countryCoords";

const PACKAGE_TYPES = [
  "Box",
  "Envelope",
  "Pallet",
  "Container",
  "Crate",
  "Drum",
  "Bag",
  "Other",
];
const SERVICE_TYPES = [
  "Standard",
  "Express",
  "Overnight",
  "Same Day",
  "Economy",
];
const SHIPMENT_TYPES = [
  "Air Cargo",
  "Sea Freight",
  "Road Freight",
  "Rail Freight",
  "Courier",
];
const PAYMENT_METHODS = [
  "Credit Card",
  "Bank Transfer",
  "Cash",
  "PayPal",
  "Invoice",
  "Prepaid",
];
const STATUS_OPTIONS = [
  "Pending",
  "Picked Up",
  "Transit",
  "Customs Clearance",
  "Hold",
  "Delayed",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
  "Returned",
];

const TABS = [
  { id: "shipper", label: "Shipper" },
  { id: "receiver", label: "Receiver" },
  { id: "shipment", label: "Shipment" },
  { id: "route", label: "Route" },
  { id: "extra", label: "Extra" },
];

export default function AddShipmentModal({ onClose, onAdd }) {
  const [form, setForm] = useState({
    shipmentId: "",
    name: "",
    email: "",
    from: "",
    to: "",
    departed: "",
    expected: "",
    status: "Pending",
    shipper: { name: "", email: "", phone: "", address: "" },
    receiver: { name: "", email: "", phone: "", address: "" },
    packageType: "Box",
    quantity: 1,
    weight: 0,
    dimensions: { length: 0, width: 0, height: 0 },
    serviceType: "Standard",
    shipmentType: "Air Cargo",
    origin: { name: "", latitude: null, longitude: null },
    destination: { name: "", latitude: null, longitude: null },
    currentLocation: { name: "", latitude: null, longitude: null },
    originHub: "",
    destinationHub: "",
    paymentMethod: "Prepaid",
    totalFreight: 0,
    carrierReference: "",
    notes: "",
    comments: "",
    shipperInfo: "",
    receiverInfo: "",
  });

  const [activeTab, setActiveTab] = useState("shipper");
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);

  // Auto-generate ID + dates on mount
  useEffect(() => {
    const d = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const r = Math.random().toString(36).substring(2, 6).toUpperCase();
    const id = "SH-" + d + "-" + r;
    setForm((prev) => ({
      ...prev,
      shipmentId: id,
      carrierReference: id,
      departed: new Date().toISOString().slice(0, 16),
      expected: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 16),
    }));
  }, []);

  const set = (f, v) => setForm((p) => ({ ...p, [f]: v }));
  const setN = (p, f, v) =>
    setForm((pr) => ({ ...pr, [p]: { ...pr[p], [f]: v } }));

  // Auto-detect coordinates from location name
  const handleLocationName = (parent, value) => {
    setN(parent, "name", value);
    const coords = getCoordinates(value);
    if (coords) {
      setN(parent, "latitude", coords.latitude);
      setN(parent, "longitude", coords.longitude);
    }
  };

  const copyId = () => {
    navigator.clipboard.writeText(form.shipmentId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !form.shipmentId ||
      !form.shipper.name ||
      !form.shipper.email ||
      !form.receiver.name ||
      !form.receiver.email
    ) {
      alert("Fill in at least Shipper Name/Email and Receiver Name/Email");
      return;
    }
    const payload = {
      ...form,
      name: form.shipper.name,
      email: form.shipper.email,
      from: form.shipper.address || form.origin.name || "N/A",
      to: form.receiver.address || form.destination.name || "N/A",
      departed: form.departed || new Date().toISOString(),
      expected:
        form.expected || new Date(Date.now() + 7 * 86400000).toISOString(),
    };
    setSaving(true);
    try {
      const res = await fetch("/api/shipments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      onAdd(data);
      onClose();
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
        <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">New Shipment</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        {/* Horizontal Tabs */}
        <div className="flex border-b bg-gray-50 px-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={
                "flex-1 py-2.5 text-xs font-medium transition border-b-2 " +
                (activeTab === t.id
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700")
              }
            >
              {t.label}
            </button>
          ))}
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-5 space-y-4"
        >
          {/* SHIPPER */}
          {activeTab === "shipper" && (
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">
                Shipper *
              </h3>
              <FInput
                label="Name *"
                value={form.shipper.name}
                onChange={(e) => setN("shipper", "name", e.target.value)}
                placeholder="John Smith"
              />
              <FInput
                label="Email *"
                value={form.shipper.email}
                onChange={(e) => setN("shipper", "email", e.target.value)}
                placeholder="shipper@email.com"
                type="email"
              />
              <FInput
                label="Phone"
                value={form.shipper.phone}
                onChange={(e) => setN("shipper", "phone", e.target.value)}
                placeholder="+1 234 567 8900"
              />
              <FInput
                label="Address"
                value={form.shipper.address}
                onChange={(e) => setN("shipper", "address", e.target.value)}
                placeholder="Lagos, Nigeria"
              />
            </div>
          )}

          {/* RECEIVER */}
          {activeTab === "receiver" && (
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">
                Receiver *
              </h3>
              <FInput
                label="Name *"
                value={form.receiver.name}
                onChange={(e) => setN("receiver", "name", e.target.value)}
                placeholder="Jane Doe"
              />
              <FInput
                label="Email *"
                value={form.receiver.email}
                onChange={(e) => setN("receiver", "email", e.target.value)}
                placeholder="receiver@email.com"
                type="email"
              />
              <FInput
                label="Phone"
                value={form.receiver.phone}
                onChange={(e) => setN("receiver", "phone", e.target.value)}
                placeholder="+44 123 456 7890"
              />
              <FInput
                label="Address"
                value={form.receiver.address}
                onChange={(e) => setN("receiver", "address", e.target.value)}
                placeholder="London, UK"
              />
            </div>
          )}

          {/* SHIPMENT */}
          {activeTab === "shipment" && (
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">
                Shipment Info
              </h3>
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Shipment ID (auto)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={form.shipmentId}
                    readOnly
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-900"
                  />
                  <button
                    type="button"
                    onClick={copyId}
                    className={
                      "px-3 py-2 rounded-lg text-sm border " +
                      (copied
                        ? "bg-green-500 text-white border-green-500"
                        : "border-gray-300 text-gray-700")
                    }
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <FSelect
                  label="Shipment Type"
                  value={form.shipmentType}
                  onChange={(e) => set("shipmentType", e.target.value)}
                  options={SHIPMENT_TYPES}
                />
                <FSelect
                  label="Service Type"
                  value={form.serviceType}
                  onChange={(e) => set("serviceType", e.target.value)}
                  options={SERVICE_TYPES}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <FSelect
                  label="Package Type"
                  value={form.packageType}
                  onChange={(e) => set("packageType", e.target.value)}
                  options={PACKAGE_TYPES}
                />
                <FInput
                  label="Quantity"
                  value={form.quantity}
                  onChange={(e) =>
                    set("quantity", parseInt(e.target.value) || 0)
                  }
                  type="number"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <FInput
                  label="Weight (kg)"
                  value={form.weight}
                  onChange={(e) =>
                    set("weight", parseFloat(e.target.value) || 0)
                  }
                  type="number"
                />
                <FSelect
                  label="Payment"
                  value={form.paymentMethod}
                  onChange={(e) => set("paymentMethod", e.target.value)}
                  options={PAYMENT_METHODS}
                />
              </div>
              <FInput
                label="Total Freight ($)"
                value={form.totalFreight}
                onChange={(e) =>
                  set("totalFreight", parseFloat(e.target.value) || 0)
                }
                type="number"
              />
              <FSelect
                label="Status"
                value={form.status}
                onChange={(e) => set("status", e.target.value)}
                options={STATUS_OPTIONS}
              />
            </div>
          )}

          {/* ROUTE */}
          {activeTab === "route" && (
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">
                Route & Coordinates
              </h3>
              {[
                { key: "origin", color: "gray", label: "Origin" },
                {
                  key: "currentLocation",
                  color: "blue",
                  label: "Current Location",
                },
                { key: "destination", color: "gray", label: "Destination" },
              ].map(({ key, color, label }) => (
                <div
                  key={key}
                  className={
                    "rounded-xl p-3 space-y-2 " +
                    (color === "blue"
                      ? "bg-blue-50 border border-blue-200"
                      : "bg-gray-50")
                  }
                >
                  <p className="text-xs font-medium text-gray-500">{label}</p>
                  <FInput
                    placeholder="City or Country"
                    value={form[key].name}
                    onChange={(e) => handleLocationName(key, e.target.value)}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      step="any"
                      placeholder="Latitude"
                      value={form[key].latitude ?? ""}
                      onChange={(e) =>
                        setN(
                          key,
                          "latitude",
                          parseFloat(e.target.value) || null,
                        )
                      }
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900"
                    />
                    <input
                      type="number"
                      step="any"
                      placeholder="Longitude"
                      value={form[key].longitude ?? ""}
                      onChange={(e) =>
                        setN(
                          key,
                          "longitude",
                          parseFloat(e.target.value) || null,
                        )
                      }
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* EXTRA */}
          {activeTab === "extra" && (
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">
                Additional
              </h3>
              <FInput
                label="Carrier Reference"
                value={form.carrierReference}
                onChange={(e) => set("carrierReference", e.target.value)}
              />
              <div className="grid grid-cols-2 gap-3">
                <FInput
                  label="Departure"
                  value={form.departed}
                  onChange={(e) => set("departed", e.target.value)}
                  type="datetime-local"
                />
                <FInput
                  label="Expected Delivery"
                  value={form.expected}
                  onChange={(e) => set("expected", e.target.value)}
                  type="datetime-local"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Notes
                </label>
                <textarea
                  value={form.notes}
                  onChange={(e) => set("notes", e.target.value)}
                  rows={2}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900"
                  placeholder="Internal notes..."
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Comments
                </label>
                <textarea
                  value={form.comments}
                  onChange={(e) => set("comments", e.target.value)}
                  rows={2}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900"
                  placeholder="Customer-facing comments..."
                />
              </div>
            </div>
          )}
        </form>

        <div className="border-t bg-gray-50 px-6 py-4 flex items-center justify-between">
          <span className="text-xs text-gray-400">
            * Shipper + Receiver required
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-white"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={saving}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FInput({ label, value, onChange, type = "text", placeholder = "" }) {
  return (
    <div>
      {label && (
        <label className="block text-xs text-gray-600 mb-1">{label}</label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none"
      />
    </div>
  );
}

function FSelect({ label, value, onChange, options }) {
  return (
    <div>
      {label && (
        <label className="block text-xs text-gray-600 mb-1">{label}</label>
      )}
      <select
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
