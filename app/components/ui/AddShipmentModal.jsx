"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

export default function AddShipmentModal({ onClose }) {
  // Original fields
  const [shipmentId, setShipmentId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departed, setDeparted] = useState("");
  const [expected, setExpected] = useState("");

  // New shipment details
  const [quantity, setQuantity] = useState(1);
  const [weight, setWeight] = useState(0);
  const [length, setLength] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [packageType, setPackageType] = useState("Box");
  const [serviceType, setServiceType] = useState("Standard");
  const [originHub, setOriginHub] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [destinationHub, setDestinationHub] = useState("");
  const [notes, setNotes] = useState("");

  // Full-page info fields
  const [shipperInfo, setShipperInfo] = useState("");
  const [receiverInfo, setReceiverInfo] = useState("");

  // Additional new fields
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [totalFreight, setTotalFreight] = useState(0);
  const [pickupDateTime, setPickupDateTime] = useState("");
  const [comments, setComments] = useState("");
  const [shipmentType, setShipmentType] = useState("Air Cargo");
  const [carrierReference, setCarrierReference] = useState("");

  const [copied, setCopied] = useState(false);

  function generateShipmentId() {
    const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `SH-${datePart}-${randomPart}`;
  }

  const handleGenerateId = () => {
    const id = generateShipmentId();
    setShipmentId(id);
    setCopied(false);
  };

  const handleCopy = () => {
    if (shipmentId) {
      navigator.clipboard.writeText(shipmentId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !shipmentId ||
      !name ||
      !email ||
      !from ||
      !to ||
      !departed ||
      !expected
    )
      return;

    const payload = {
      shipmentId,
      name,
      email,
      from,
      to,
      departed,
      expected,
      quantity,
      weight,
      dimensions: { length, width, height },
      packageType,
      serviceType,
      originHub,
      currentLocation,
      destinationHub,
      notes,
      shipperInfo,
      receiverInfo,
      paymentMethod,
      totalFreight,
      pickupDateTime,
      comments,
      shipmentType,
      carrierReference,
      status: "Transit",
    };

    try {
      const res = await fetch("/api/shipments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to add shipment");

      // Reset all fields
      setShipmentId("");
      setName("");
      setEmail("");
      setFrom("");
      setTo("");
      setDeparted("");
      setExpected("");
      setQuantity(1);
      setWeight(0);
      setLength(0);
      setWidth(0);
      setHeight(0);
      setPackageType("Box");
      setServiceType("Standard");
      setOriginHub("");
      setCurrentLocation("");
      setDestinationHub("");
      setNotes("");
      setShipperInfo("");
      setReceiverInfo("");
      setPaymentMethod("Credit Card");
      setTotalFreight(0);
      setPickupDateTime("");
      setComments("");
      setShipmentType("Air Cargo");
      setCarrierReference("");

      onClose();
    } catch (err) {
      console.error(err);
      alert("Error adding shipment");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl max-h-screen overflow-scroll shadow-xl w-full max-w-md p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Add New Shipment
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Original fields */}
          <Input
            label="Name"
            value={name}
            setter={setName}
            placeholder="Full name"
          />
          <Input
            label="Email"
            type="email"
            value={email}
            setter={setEmail}
            placeholder="Email"
          />
          <Input
            label="From Address"
            value={from}
            setter={setFrom}
            placeholder="Starting address"
          />
          <Input
            label="To Address"
            value={to}
            setter={setTo}
            placeholder="Destination address"
          />
          <Input
            label="Time Departed"
            type="datetime-local"
            value={departed}
            setter={setDeparted}
          />
          <Input
            label="Expected Delivery"
            type="datetime-local"
            value={expected}
            setter={setExpected}
          />

          {/* Shipment ID */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Shipment ID
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={shipmentId}
                readOnly
                placeholder="Click generate"
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 text-black text-sm"
              />
              <button
                type="button"
                onClick={handleGenerateId}
                className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm"
              >
                Generate
              </button>
              {shipmentId && (
                <button
                  type="button"
                  onClick={handleCopy}
                  className={`px-3 py-2 rounded-md text-sm border ${
                    copied
                      ? "bg-green-500 text-white"
                      : "border-gray-300 text-gray-700"
                  }`}
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              )}
            </div>
          </div>

          {/* New shipment details */}
          <Input
            label="Quantity"
            type="number"
            value={quantity}
            setter={setQuantity}
          />
          <Input
            label="Weight (kg)"
            type="number"
            value={weight}
            setter={setWeight}
          />

          <Input
            label="Package Type"
            value={packageType}
            setter={setPackageType}
            placeholder="Box, Envelope…"
          />
          <Input
            label="Service Type"
            value={serviceType}
            setter={setServiceType}
            placeholder="Standard / Express"
          />
          <Input label="Origin Hub" value={originHub} setter={setOriginHub} />
          <Input
            label="Current Location"
            value={currentLocation}
            setter={setCurrentLocation}
          />
          <Input
            label="Destination Hub"
            value={destinationHub}
            setter={setDestinationHub}
          />

          {/* Notes */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full h-20 border border-gray-300 rounded-md px-3 py-2 text-black text-sm"
              placeholder="Optional notes…"
            />
          </div>

          {/* Shipper Info */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Shipper Information
            </label>
            <textarea
              value={shipperInfo}
              onChange={(e) => setShipperInfo(e.target.value)}
              className="w-full h-32 border border-gray-300 rounded-md px-3 py-2 text-black text-sm"
              placeholder="Full shipper information…"
            />
          </div>

          {/* Receiver Info */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Receiver Information
            </label>
            <textarea
              value={receiverInfo}
              onChange={(e) => setReceiverInfo(e.target.value)}
              className="w-full h-32 border border-gray-300 rounded-md px-3 py-2 text-black text-sm"
              placeholder="Full receiver information…"
            />
          </div>

          {/* Additional new fields */}
          <Input
            label="Payment Method"
            value={paymentMethod}
            setter={setPaymentMethod}
            placeholder="Credit Card, Cash…"
          />
          <Input
            label="Total Freight ($)"
            type="number"
            value={totalFreight}
            setter={setTotalFreight}
          />
          <Input
            label="Pickup Date & Time"
            type="datetime-local"
            value={pickupDateTime}
            setter={setPickupDateTime}
          />

          <Input
            label="Shipment Type"
            value={shipmentType}
            setter={setShipmentType}
            placeholder="Air Cargo, Sea, Road…"
          />
          <Input
            label="Carrier Reference / Tracking ID"
            value={carrierReference}
            setter={setCarrierReference}
            placeholder="Tracking ID…"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md"
          >
            Add Shipment
          </button>
        </form>
      </div>
    </div>
  );
}

// Reusable Input component
function Input({
  label,
  value,
  setter,
  type = "text",
  placeholder = "",
  short = false,
}) {
  return (
    <div className={short ? "" : "w-full"}>
      {label && (
        <label className="block text-gray-700 font-medium mb-1">{label}</label>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => setter(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-black text-sm"
      />
    </div>
  );
}
