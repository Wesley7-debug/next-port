import { connectDB } from "@/libs/connectDB";
import Shipment from "@/app/models/shipment";
import { requireAdminAuth } from "@/libs/adminAuth";

// POST: create a new shipment (admin only)
export async function POST(req) {
  try {
    await requireAdminAuth();
    await connectDB();

    const body = await req.json();
    const {
      shipmentId, name, email, from, to, departed, expected,
      shipperInfo, receiverInfo, quantity, weight, dimensions,
      packageType, serviceType, originHub, destinationHub, notes,
      paymentMethod, totalFreight, pickupDateTime, comments,
      shipmentType, carrierReference, status,
      origin, currentLocation, destination,
      trackingEvents, delayReason, exceptionDetails, isDelayed,
      shipper, receiver, documents,
    } = body;

    if (!shipmentId || !name || !email || !from || !to || !departed || !expected) {
      return new Response(
        JSON.stringify({ error: "All required fields must be provided" }),
        { status: 400 }
      );
    }

    const shipmentData = {
      shipmentId, name, email, from, to, departed, expected,
      status: status || "Pending",
      shipperInfo: shipperInfo || "",
      receiverInfo: receiverInfo || "",
      quantity: quantity || 1,
      weight: weight || 0,
      dimensions: dimensions || { length: 0, width: 0, height: 0 },
      packageType: packageType || "Box",
      serviceType: serviceType || "Standard",
      originHub: originHub || "",
      destinationHub: destinationHub || "",
      notes: notes || "",
      paymentMethod: paymentMethod || "",
      totalFreight: totalFreight || 1,
      pickupDateTime: pickupDateTime || null,
      comments: comments || "",
      shipmentType: shipmentType || "Standard",
      carrierReference: carrierReference || "",
      origin: origin || { name: "", latitude: null, longitude: null },
      currentLocation: currentLocation || { name: "", latitude: null, longitude: null },
      destination: destination || { name: "", latitude: null, longitude: null },
      trackingEvents: trackingEvents || [],
      delayReason: delayReason || "",
      exceptionDetails: exceptionDetails || "",
      isDelayed: isDelayed || false,
      shipper: shipper || { name: "", email: "", phone: "", address: "" },
      receiver: receiver || { name: "", email: "", phone: "", address: "" },
      documents: documents || [],
      lastUpdated: new Date(),
    };

    const newShipment = await Shipment.create(shipmentData);
    return new Response(JSON.stringify(newShipment), { status: 201 });
  } catch (err) {
    if (err instanceof Response) throw err;
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to add shipment" }), { status: 500 });
  }
}

// GET: fetch all shipments (admin only)
export async function GET() {
  try {
    await requireAdminAuth();
    await connectDB();
    const shipments = await Shipment.find({}).sort({ lastUpdated: -1 });
    return new Response(JSON.stringify(shipments), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (err) {
    if (err instanceof Response) throw err;
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to fetch shipments" }), { status: 500 });
  }
}
