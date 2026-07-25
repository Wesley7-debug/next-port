"use client";

import React, { useState, useEffect } from "react";
import { X, Plus, Trash2 } from "lucide-react";

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

export default function EditShipmentModal({ shipment, onClose, onUpdate }) {
  const [form, setForm] = useState({ ...shipment });
  const [newEvent, setNewEvent] = useState({
    title: "",
    location: "",
    date: "",
    description: "",
    completed: false,
  });
  const [saving, setSaving] = useState(false);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const updateNested = (parent, field, value) => {
    setForm((prev) => ({
      ...prev,
      [parent]: { ...(prev[parent] || {}), [field]: value },
    }));
  };

  const addTrackingEvent = () => {
    if (!newEvent.title) return;
    const event = {
      ...newEvent,
      date: newEvent.date
        ? new Date(newEvent.date).toISOString()
        : new Date().toISOString(),
    };
    setForm((prev) => ({
      ...prev,
      trackingEvents: [...(prev.trackingEvents || []), event],
    }));
    setNewEvent({
      title: "",
      location: "",
      date: "",
      description: "",
      completed: false,
    });
  };

  const removeTrackingEvent = (idx) => {
    setForm((prev) => ({
      ...prev,
      trackingEvents: (prev.trackingEvents || []).filter((_, i) => i !== idx),
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/shipments/${shipment.shipmentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to update");
      const data = await res.json();
      onUpdate(data.shipment);
      onClose();
    } catch (err) {
      alert("Error updating shipment: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-semibold text-gray-800">
            Edit Shipment: {shipment.shipmentId}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Status */}
          <Section title="Status & Schedule">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Status">
                <select
                  value={form.status || ""}
                  onChange={(e) => updateField("status", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Is Delayed">
                <select
                  value={form.isDelayed ? "true" : "false"}
                  onChange={(e) =>
                    updateField("isDelayed", e.target.value === "true")
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </Field>
              <Field label="Delay Reason">
                <input
                  type="text"
                  value={form.delayReason || ""}
                  onChange={(e) => updateField("delayReason", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  placeholder="e.g., Weather conditions"
                />
              </Field>
              <Field label="Exception Details">
                <input
                  type="text"
                  value={form.exceptionDetails || ""}
                  onChange={(e) =>
                    updateField("exceptionDetails", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  placeholder="Additional exception info"
                />
              </Field>
              <Field label="Expected Delivery">
                <input
                  type="datetime-local"
                  value={
                    form.expected
                      ? new Date(form.expected).toISOString().slice(0, 16)
                      : ""
                  }
                  onChange={(e) => updateField("expected", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
              </Field>
            </div>
          </Section>

          {/* Route */}
          <Section title="Route & Locations">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {["origin", "currentLocation", "destination"].map((loc) => (
                <div key={loc} className="border rounded-lg p-3 space-y-2">
                  <h4 className="font-semibold text-sm capitalize text-gray-700">
                    {loc === "currentLocation" ? "Current Location" : loc}
                  </h4>
                  <input
                    type="text"
                    placeholder="Location name"
                    value={form[loc]?.name || ""}
                    onChange={(e) => updateNested(loc, "name", e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />
                  <div className="flex gap-2">
                    <input
                      type="number"
                      step="any"
                      placeholder="Latitude"
                      value={form[loc]?.latitude ?? ""}
                      onChange={(e) =>
                        updateNested(
                          loc,
                          "latitude",
                          parseFloat(e.target.value) || null,
                        )
                      }
                      className="w-1/2 border border-gray-300 rounded-md px-3 py-2 text-sm"
                    />
                    <input
                      type="number"
                      step="any"
                      placeholder="Longitude"
                      value={form[loc]?.longitude ?? ""}
                      onChange={(e) =>
                        updateNested(
                          loc,
                          "longitude",
                          parseFloat(e.target.value) || null,
                        )
                      }
                      className="w-1/2 border border-gray-300 rounded-md px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Shipper & Receiver */}
          <Section title="Shipper & Receiver">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {["shipper", "receiver"].map((role) => (
                <div key={role} className="border rounded-lg p-3 space-y-2">
                  <h4 className="font-semibold text-sm capitalize text-gray-700">
                    {role}
                  </h4>
                  {["name", "email", "phone", "address"].map((f) => (
                    <input
                      key={f}
                      type={f === "email" ? "email" : "text"}
                      placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
                      value={form[role]?.[f] || ""}
                      onChange={(e) => updateNested(role, f, e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    />
                  ))}
                </div>
              ))}
            </div>
          </Section>

          {/* Tracking Events */}
          <Section title="Tracking History">
            <div className="space-y-2 mb-4">
              {(form.trackingEvents || []).map((event, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 bg-gray-50 rounded-lg p-2 text-sm"
                >
                  <span className="flex-1 font-medium">{event.title}</span>
                  <span className="text-gray-500 text-xs">
                    {event.location}
                  </span>
                  <button
                    onClick={() => removeTrackingEvent(idx)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input
                type="text"
                placeholder="Event title"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent((p) => ({ ...p, title: e.target.value }))
                }
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
              <input
                type="text"
                placeholder="Location"
                value={newEvent.location}
                onChange={(e) =>
                  setNewEvent((p) => ({ ...p, location: e.target.value }))
                }
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
              <input
                type="datetime-local"
                value={newEvent.date}
                onChange={(e) =>
                  setNewEvent((p) => ({ ...p, date: e.target.value }))
                }
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </div>
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                placeholder="Description"
                value={newEvent.description}
                onChange={(e) =>
                  setNewEvent((p) => ({ ...p, description: e.target.value }))
                }
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
              <button
                type="button"
                onClick={addTrackingEvent}
                className="flex items-center gap-1 bg-indigo-600 text-white px-3 py-2 rounded-md text-sm hover:bg-indigo-700"
              >
                <Plus size={16} /> Add
              </button>
            </div>
          </Section>

          {/* Package Info */}
          <Section title="Package Details">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Field label="Package Type">
                <input
                  type="text"
                  value={form.packageType || ""}
                  onChange={(e) => updateField("packageType", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
              </Field>
              <Field label="Quantity">
                <input
                  type="number"
                  value={form.quantity || 1}
                  onChange={(e) =>
                    updateField("quantity", parseInt(e.target.value))
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
              </Field>
              <Field label="Weight (kg)">
                <input
                  type="number"
                  value={form.weight || 0}
                  onChange={(e) =>
                    updateField("weight", parseFloat(e.target.value))
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
              </Field>
              <Field label="Service Type">
                <input
                  type="text"
                  value={form.serviceType || ""}
                  onChange={(e) => updateField("serviceType", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
              </Field>
              <Field label="Shipment Type">
                <input
                  type="text"
                  value={form.shipmentType || ""}
                  onChange={(e) => updateField("shipmentType", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
              </Field>
              <Field label="Payment Method">
                <input
                  type="text"
                  value={form.paymentMethod || ""}
                  onChange={(e) => updateField("paymentMethod", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
              </Field>
              <Field label="Total Freight">
                <input
                  type="number"
                  value={form.totalFreight || 0}
                  onChange={(e) =>
                    updateField("totalFreight", parseFloat(e.target.value))
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
              </Field>
              <Field label="Carrier Ref">
                <input
                  type="text"
                  value={form.carrierReference || ""}
                  onChange={(e) =>
                    updateField("carrierReference", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
              </Field>
            </div>
          </Section>

          {/* Notes & Comments */}
          <Section title="Notes & Comments">
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  value={form.notes || ""}
                  onChange={(e) => updateField("notes", e.target.value)}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900"
                  placeholder="Internal notes..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Comments
                </label>
                <textarea
                  value={form.comments || ""}
                  onChange={(e) => updateField("comments", e.target.value)}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900"
                  placeholder="Customer-facing comments..."
                />
              </div>
            </div>
          </Section>
        </div>

        <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2 border-b pb-1">
        {title}
      </h3>
      {children}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-xs text-gray-600 mb-1">{label}</label>
      {children}
    </div>
  );
}
