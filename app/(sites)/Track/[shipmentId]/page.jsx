// // "use client";
// // import React, { useEffect, useState } from "react";
// // import { useParams } from "next/navigation";

// // const TrackShipmentPage = () => {
// //   const [shipment, setShipment] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");

// //   const params = useParams();
// //   const { shipmentId } = params; // grab shipmentId from URL

// //   useEffect(() => {
// //     const fetchShipment = async () => {
// //       try {
// //         const res = await fetch(`/api/shipments/${shipmentId}`);
// //         if (!res.ok) {
// //           const data = await res.json();
// //           throw new Error(data.error || "Shipment not found");
// //         }
// //         const data = await res.json();
// //         setShipment(data);
// //       } catch (err) {
// //         setError(err.message);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     if (shipmentId) fetchShipment();
// //   }, [shipmentId]);

// //   if (loading)
// //     return <p className="p-8 text-center">Loading shipment info...</p>;
// //   if (error) return <p className="p-8 text-center text-red-600">{error}</p>;
// //   if (!shipment) return <p className="p-8 text-center">Shipment not found</p>;

// //   return (
// //     <div className="min-h-screen bg-gray-50 p-4 flex flex-col items-center pt-20">
// //       {/* Header */}
// //       <div className="w-full max-w-4xl bg-white shadow-sm rounded-lg p-6">
// //         <div className="flex flex-col sm:flex-row sm:items-center justify-between">
// //           <div>
// //             <h2 className="text-xl font-semibold text-gray-800">
// //               Shipment ID: {shipment.shipmentId}
// //             </h2>
// //             <p className="text-sm text-gray-500">
// //               Shipping date: {shipment.departed} • Email:{" "}
// //               <span className="text-indigo-600 font-medium">
// //                 {shipment.email}
// //               </span>
// //             </p>
// //           </div>

// //           <div className="mt-3 sm:mt-0 flex items-center gap-2">
// //             <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
// //               {shipment.status || "In Progress"}
// //             </span>
// //           </div>
// //         </div>

// //         {/* From / To */}
// //         <div className="mt-6 border-t border-gray-200 pt-4">
// //           <div className="flex flex-col sm:flex-row justify-between text-sm text-gray-600">
// //             <div>
// //               <p className="font-semibold">From:</p>
// //               <p>{shipment.from}</p>
// //             </div>
// //             <div className="mt-2 sm:mt-0">
// //               <p className="font-semibold">To:</p>
// //               <p>{shipment.to}</p>
// //             </div>
// //           </div>

// //           {/* Progress Bar */}
// //           <div className="relative mt-6">
// //             <div className="h-2 bg-gray-200 rounded-full">
// //               <div className="h-2 bg-indigo-600 rounded-full w-2/3"></div>
// //             </div>
// //             <div className="flex justify-between text-xs text-gray-500 mt-2">
// //               <span>Departed: {shipment.departed}</span>
// //               <span>Expected: {shipment.expected}</span>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Map placeholder */}
// //       <div className="w-full max-w-4xl mt-6 bg-white shadow-sm rounded-lg overflow-hidden h-80 flex items-center justify-center text-gray-400">
// //         Map goes here
// //       </div>
// //     </div>
// //   );
// // };

// // export default TrackShipmentPage;
// "use client";
// import React, { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import ShipmentMap from "@/app/components/ui/ShipmentMap";
// import ShipmentProgressBar from "@/app/components/ui/ShipmentProgressBar";

// const TrackShipmentPage = () => {
//   const [shipment, setShipment] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const params = useParams();
//   const { shipmentId } = params;

//   useEffect(() => {
//     const fetchShipment = async () => {
//       try {
//         const res = await fetch(`/api/shipments/${shipmentId}`);
//         if (!res.ok) {
//           const data = await res.json();
//           throw new Error(data.error || "Shipment not found");
//         }
//         const data = await res.json();
//         setShipment(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (shipmentId) fetchShipment();
//   }, [shipmentId]);

//   if (loading)
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="w-12 h-12 border-4 border-indigo-600 border-dashed rounded-full animate-spin"></div>
//       </div>
//     );

//   if (error) return <p className="p-8 text-center text-red-600">{error}</p>;
//   if (!shipment) return <p className="p-8 text-center">Shipment not found</p>;

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 flex flex-col items-center pt-20">
//       {/* Header */}
//       <div className="w-full max-w-4xl bg-white shadow-sm rounded-lg p-6">
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between">
//           <div>
//             <h2 className="text-xl font-semibold text-gray-800">
//               Shipment ID: {shipment.shipmentId}
//             </h2>
//             <p className="text-sm text-gray-500">
//               Shipping date: {shipment.departed} • Email:{" "}
//               <span className="text-indigo-600 font-medium">
//                 {shipment.email}
//               </span>
//             </p>
//           </div>

//           <div className="mt-3 sm:mt-0 flex items-center gap-2">
//             <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
//               {shipment.status || "In Progress"}
//             </span>
//           </div>
//         </div>

//         {/* From / To */}
//         <div className="mt-6 border-t border-gray-200 pt-4">
//           <div className="flex flex-col sm:flex-row justify-between text-sm text-gray-600">
//             <div>
//               <p className="font-semibold">From:</p>
//               <p>{shipment.from}</p>
//             </div>
//             <div className="mt-2 sm:mt-0">
//               <p className="font-semibold">To:</p>
//               <p>{shipment.to}</p>
//             </div>
//           </div>

//           {/* Progress Bar */}
//           <div className="relative mt-6">
//             <ShipmentProgressBar
//               departed={shipment.departed}
//               expected={shipment.expected}
//               status={shipment.status}
//               shipmentId={shipment.shipmentId}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Map */}
//       <div className="w-full max-w-4xl mt-6 bg-white shadow-sm rounded-lg overflow-hidden">
//         {shipment ? <ShipmentMap shipment={shipment} /> : null}
//       </div>
//     </div>
//   );
// };

// export default TrackShipmentPage;
"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ShipmentMap from "@/app/components/ui/ShipmentMap";
import ShipmentProgressBar from "@/app/components/ui/ShipmentProgressBar";
import {
  Truck,
  ArrowBigRightDash,
  CheckCircle2,
  AlarmClock,
  Timer,
  XCircle,
  PauseCircle,
  RotateCcw,
} from "lucide-react";

const STATUS_STYLES = {
  Transit: "bg-blue-100 text-blue-700",
  "Out for Delivery": "bg-indigo-100 text-indigo-700",
  Delivered: "bg-green-100 text-green-700",
  Delayed: "bg-yellow-100 text-yellow-700",
  Pending: "bg-gray-100 text-gray-700",
  Cancelled: "bg-red-100 text-red-700",
  Hold: "bg-amber-100 text-amber-800",
  Returned: "bg-purple-100 text-purple-700",
};

const STATUS_ICONS = {
  Transit: <Truck size={16} />,
  "Out for Delivery": <ArrowBigRightDash size={16} />,
  Delivered: <CheckCircle2 size={16} />,
  Delayed: <AlarmClock size={16} />,
  Pending: <Timer size={16} />,
  Cancelled: <XCircle size={16} />,
  Hold: <PauseCircle size={16} />,
  Returned: <RotateCcw size={16} />,
};

const TrackShipmentPage = () => {
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const params = useParams();
  const { shipmentId } = params;

  useEffect(() => {
    const fetchShipment = async () => {
      try {
        const res = await fetch(`/api/shipments/${shipmentId}`);
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Shipment not found");
        }
        const data = await res.json();
        setShipment(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (shipmentId) fetchShipment();
  }, [shipmentId]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-indigo-600 border-dashed rounded-full animate-spin"></div>
      </div>
    );

  if (error)
    return (
      <p className="p-8 text-center text-red-600 font-medium text-lg">
        {error}
      </p>
    );

  if (!shipment)
    return (
      <p className="p-8 text-center text-gray-500 font-medium">
        Shipment not found
      </p>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex flex-col items-center pt-20 space-y-6">
      {/* TOP CARD */}
      <div className="w-full max-w-4xl bg-white shadow-sm rounded-xl p-6 border border-gray-100 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Tracking: {shipment.shipmentId}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Departed:{" "}
              <span className="text-gray-700 font-medium">
                {shipment.departed}
              </span>{" "}
              • Email:{" "}
              <span className="text-indigo-600 font-medium">
                {shipment.email}
              </span>
            </p>
          </div>

          <span
            className={`inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-full ${
              STATUS_STYLES[shipment.status]
            }`}
          >
            {STATUS_ICONS[shipment.status]}
            {shipment.status}
          </span>
        </div>

        {/* FROM / TO */}
        <div className="mt-4 border-t border-gray-200 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="font-semibold text-gray-800">From</p>
            <p className="text-gray-600">{shipment.from}</p>
            <p className="mt-2 font-semibold text-gray-800">Origin Hub</p>
            <p className="text-gray-600">{shipment.originHub || "-"}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-800">To</p>
            <p className="text-gray-600">{shipment.to}</p>
            <p className="mt-2 font-semibold text-gray-800">Destination Hub</p>
            <p className="text-gray-600">{shipment.destinationHub || "-"}</p>
          </div>
        </div>

        {/* PACKAGE INFO */}
        <div className="mt-4 border-t border-gray-200 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="font-semibold text-gray-800">Package Type</p>
            <p className="text-gray-600">{shipment.packageType}</p>

            <p className="mt-2 font-semibold text-gray-800">Quantity</p>
            <p className="text-gray-600">{shipment.quantity}</p>

            {/* <p className="mt-2 font-semibold text-gray-800">Weight (kg)</p>
            <p className="text-gray-600">{shipment.weight}</p> */}
          </div>
          <div>
            {/* <p className="font-semibold text-gray-800">Dimensions (L×W×H cm)</p>
            <p className="text-gray-600">
              {shipment.dimensions?.length} × {shipment.dimensions?.width} ×{" "}
              {shipment.dimensions?.height}
            </p> */}

            <p className="mt-2 font-semibold text-gray-800">Service Type</p>
            <p className="text-gray-600">{shipment.serviceType}</p>

            {/* <p className="mt-2 font-semibold text-gray-800">Current Location</p>
            <p className="text-gray-600">{shipment.currentLocation || "-"}</p> */}
          </div>
        </div>

        {/* NOTES */}
        {shipment.notes && (
          <div className="mt-4 border-t border-gray-200 pt-4">
            <p className="font-semibold text-gray-800">Notes</p>
            <p className="text-gray-600">{shipment.notes}</p>
          </div>
        )}

        {/* PROGRESS BAR */}
        <div className="mt-4">
          <ShipmentProgressBar
            departed={shipment.departed}
            expected={shipment.expected}
            status={shipment.status}
          />
        </div>
      </div>

      {/* MAP */}
      <div className="w-full max-w-4xl bg-white shadow-sm rounded-xl border border-gray-100 overflow-hidden h-80">
        {shipment && <ShipmentMap shipment={shipment} />}
      </div>
    </div>
  );
};

export default TrackShipmentPage;
