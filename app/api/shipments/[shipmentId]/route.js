import { connectDB } from "@/libs/connectDB";
import Shipment from "@/app/models/shipment";
import { requireAdminAuth } from "@/libs/adminAuth";

// GET: public tracking - fetch a single shipment by ID
export async function GET(req, { params }) {
  try {
    await connectDB();

    const { shipmentId } = await params;
    if (!shipmentId) {
      return new Response(
        JSON.stringify({ error: "Shipment ID is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const shipment = await Shipment.findOne({ shipmentId }).lean();

    if (!shipment) {
      return new Response(JSON.stringify({ error: "Shipment not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(shipment), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// PUT: update a shipment (admin only)
export async function PUT(req, { params }) {
  try {
    await requireAdminAuth();
    await connectDB();

    const { shipmentId } = await params;

    if (!shipmentId) {
      return new Response(
        JSON.stringify({ error: "Shipment ID is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const body = await req.json();

    const allowedStatuses = [
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

    if (body.status && !allowedStatuses.includes(body.status)) {
      return new Response(JSON.stringify({ error: "Invalid status value" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const updateData = {
      ...body,
      lastUpdated: new Date(),
    };

    const updatedShipment = await Shipment.findOneAndUpdate(
      { shipmentId },
      updateData,
      { new: true },
    );

    if (!updatedShipment) {
      return new Response(JSON.stringify({ error: "Shipment not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({
        message: "Shipment updated successfully",
        shipment: updatedShipment,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (err) {
    if (err instanceof Response) throw err;
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// DELETE: remove a shipment (admin only)
export async function DELETE(req, { params }) {
  try {
    await requireAdminAuth();
    await connectDB();

    const { shipmentId } = await params;
    if (!shipmentId) {
      return new Response(
        JSON.stringify({ error: "Shipment ID is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const deleted = await Shipment.findOneAndDelete({ shipmentId });
    if (!deleted) {
      return new Response(JSON.stringify({ error: "Shipment not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ message: "Shipment deleted" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    if (err instanceof Response) throw err;
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
