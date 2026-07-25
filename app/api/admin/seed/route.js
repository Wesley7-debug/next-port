import { connectDB } from "@/libs/connectDB";
import Shipment from "@/app/models/shipment";
import { requireAdminAuth } from "@/libs/adminAuth";

export async function POST() {
  try {
    await requireAdminAuth();
    await connectDB();

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
          description: "Shipment has departed the Dubai logistics hub.",
          completed: true,
        },
        {
          title: "Arrived at Destination",
          location: "London, United Kingdom",
          date: new Date("2026-07-29T00:00:00"),
          description: "Shipment is expected to arrive.",
          completed: false,
        },
        {
          title: "Delivered",
          location: "London, United Kingdom",
          date: new Date("2026-07-29T00:00:00"),
          description: "Shipment will be delivered.",
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

    return new Response(
      JSON.stringify({ success: true, shipmentId: doc.shipmentId }),
      { status: 201 },
    );
  } catch (err) {
    if (err instanceof Response) throw err;
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
