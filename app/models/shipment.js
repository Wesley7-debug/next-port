import mongoose from "mongoose";

const TrackingEventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, default: "" },
  date: { type: Date, default: Date.now },
  description: { type: String, default: "" },
  completed: { type: Boolean, default: false },
});

const DocumentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, default: "Other" },
  url: { type: String, default: "" },
  uploadedAt: { type: Date, default: Date.now },
});

const ShipmentSchema = new mongoose.Schema({
  shipmentId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },

  from: { type: String, required: true },
  to: { type: String, required: true },

  departed: { type: Date, required: true },
  expected: { type: Date, required: true },

  // Structured location with coordinates
  origin: {
    name: { type: String, default: "" },
    latitude: { type: Number, default: null },
    longitude: { type: Number, default: null },
  },
  currentLocation: {
    name: { type: String, default: "" },
    latitude: { type: Number, default: null },
    longitude: { type: Number, default: null },
  },
  destination: {
    name: { type: String, default: "" },
    latitude: { type: Number, default: null },
    longitude: { type: Number, default: null },
  },

  // Status with Enum
  status: {
    type: String,
    enum: [
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
    ],
    default: "Pending",
  },

  // Tracking Events (timeline)
  trackingEvents: { type: [TrackingEventSchema], default: [] },

  // Exception/Alert info
  delayReason: { type: String, default: "" },
  exceptionDetails: { type: String, default: "" },
  isDelayed: { type: Boolean, default: false },

  // Package info
  quantity: { type: Number, default: 1 },
  weight: { type: Number, default: 0 },
  dimensions: {
    length: { type: Number, default: 0 },
    width: { type: Number, default: 0 },
    height: { type: Number, default: 0 },
  },
  packageType: { type: String, default: "Box" },
  serviceType: { type: String, default: "Standard" },

  originHub: { type: String, default: "" },
  destinationHub: { type: String, default: "" },

  lastUpdated: { type: Date, default: Date.now },

  // Documents
  documents: { type: [DocumentSchema], default: [] },

  notes: { type: String, default: "" },

  // Structured shipper & receiver
  shipper: {
    name: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    address: { type: String, default: "" },
  },
  receiver: {
    name: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    address: { type: String, default: "" },
  },

  // Legacy full-text info (kept for backward compatibility)
  shipperInfo: { type: String, default: "" },
  receiverInfo: { type: String, default: "" },

  // Payment & shipment info
  paymentMethod: { type: String, default: "card" },
  totalFreight: { type: Number, default: 0 },
  pickupDateTime: { type: Date },
  comments: { type: String, default: "" },
  shipmentType: { type: String, default: "Standard" },
  carrierReference: { type: String, default: "" },
});

export default mongoose.models.Shipment ||
  mongoose.model("Shipment", ShipmentSchema);
