// Run: node scripts/seed.js
import mongoose from "mongoose";

const MONGODB_URL =
  process.env.MONGODB_URL ||
  "mongodb+srv://eugenefidelis573_db_user:UBvUqsq5FRReo5DG@cluster0.1qcywjl.mongodb.net/?appName=TrackFreigh";

const TrackingEventSchema = new mongoose.Schema({
  title: String,
  location: String,
  date: Date,
  description: String,
  completed: Boolean,
});

const DocumentSchema = new mongoose.Schema({
  name: String,
  type: String,
  url: String,
  uploadedAt: Date,
});

const ShipmentSchema = new mongoose.Schema(
  {
    shipmentId: { type: String, required: true, unique: true },
    name: String,
    email: String,
    from: String,
    to: String,
    departed: Date,
    expected: Date,
    status: { type: String, default: "Pending" },
    origin: { name: String, latitude: Number, longitude: Number },
    currentLocation: { name: String, latitude: Number, longitude: Number },
    destination: { name: String, latitude: Number, longitude: Number },
    trackingEvents: [TrackingEventSchema],
    delayReason: String,
    exceptionDetails: String,
    isDelayed: Boolean,
    quantity: Number,
    weight: Number,
    dimensions: { length: Number, width: Number, height: Number },
    packageType: String,
    serviceType: String,
    originHub: String,
    destinationHub: String,
    lastUpdated: Date,
    documents: [DocumentSchema],
    notes: String,
    shipper: { name: String, email: String, phone: String, address: String },
    receiver: { name: String, email: String, phone: String, address: String },
    shipperInfo: String,
    receiverInfo: String,
    paymentMethod: String,
    totalFreight: Number,
    pickupDateTime: Date,
    comments: String,
    shipmentType: String,
    carrierReference: String,
  },
  { collection: "shipments" },
);

const Shipment =
  mongoose.models.Shipment || mongoose.model("Shipment", ShipmentSchema);

async function seed() {
  await mongoose.connect(MONGODB_URL);
  console.log("Connected to MongoDB");

  // Delete existing if present
  await Shipment.deleteOne({ shipmentId: "OMC-2026-84721" });

  const doc = await Shipment.create({
    shipmentId: "OMC-2026-84721",
    name: "John Smith",
    email: "jane.doe@example.com",
    from: "Lagos, Nigeria",
    to: "London, United Kingdom",
    departed: new Date("2026-07-23T18:45:00"),
    expected: new Date("2026-07-29T00:00:00"),
    status: "Transit",

    origin: { name: "Lagos, Nigeria", latitude: 6.5244, longitude: 3.3792 },
    currentLocation: {
      name: "Dubai, UAE",
      latitude: 25.2048,
      longitude: 55.2708,
    },
    destination: {
      name: "London, United Kingdom",
      latitude: 51.5072,
      longitude: -0.1276,
    },

    shipper: {
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+234 801 234 5678",
      address: "Lagos, Nigeria",
    },
    receiver: {
      name: "Jane Doe",
      email: "jane.doe@example.com",
      phone: "+44 7700 900123",
      address: "London, United Kingdom",
    },
    shipperInfo:
      "John Smith\nLagos, Nigeria\njohn.smith@example.com\n+234 801 234 5678",
    receiverInfo:
      "Jane Doe\nLondon, United Kingdom\njane.doe@example.com\n+44 7700 900123",

    packageType: "Electronics",
    quantity: 2,
    weight: 8,
    dimensions: { length: 40, width: 30, height: 20 },
    shipmentType: "Air Freight",
    paymentMethod: "Prepaid",
    totalFreight: 1250,
    serviceType: "Express",
    originHub: "Lagos, Nigeria",
    destinationHub: "London, United Kingdom",
    carrierReference: "OMC-2026-84721",
    notes:
      "Handle package with care. Recipient signature required upon delivery.",
    comments:
      "Shipment has departed the Dubai logistics hub and is currently in transit to London.",
    lastUpdated: new Date("2026-07-25T14:30:00"),

    trackingEvents: [
      {
        title: "Shipment Created",
        location: "Lagos, Nigeria",
        date: new Date("2026-07-22T16:30:00"),
        description: "Shipment record created.",
        completed: true,
      },
      {
        title: "Picked Up",
        location: "Lagos, Nigeria",
        date: new Date("2026-07-23T10:15:00"),
        description: "Shipment successfully picked up from the shipper.",
        completed: true,
      },
      {
        title: "Departed Origin",
        location: "Lagos, Nigeria",
        date: new Date("2026-07-23T18:45:00"),
        description: "Shipment departed the origin facility.",
        completed: true,
      },
      {
        title: "In Transit",
        location: "Dubai, UAE",
        date: new Date("2026-07-25T14:30:00"),
        description:
          "Shipment has departed the Dubai logistics hub and is currently in transit.",
        completed: true,
      },
      {
        title: "Arrived at Destination",
        location: "London, United Kingdom",
        date: new Date("2026-07-29T00:00:00"),
        description: "Shipment is expected to arrive at the destination.",
        completed: false,
      },
      {
        title: "Delivered",
        location: "London, United Kingdom",
        date: new Date("2026-07-29T00:00:00"),
        description: "Shipment will be delivered to the receiver.",
        completed: false,
      },
    ],

    documents: [
      {
        name: "Commercial Invoice",
        type: "invoice",
        url: "/documents/OMC-2026-84721/commercial-invoice.pdf",
        uploadedAt: new Date(),
      },
      {
        name: "Bill of Lading",
        type: "bill_of_lading",
        url: "/documents/OMC-2026-84721/bill-of-lading.pdf",
        uploadedAt: new Date(),
      },
      {
        name: "Shipping Label",
        type: "shipping_label",
        url: "/documents/OMC-2026-84721/shipping-label.pdf",
        uploadedAt: new Date(),
      },
    ],
  });

  console.log("Seeded shipment:", doc.shipmentId);
  await mongoose.disconnect();
  console.log("Done!");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
