// "use client";

// import React, { useState } from "react";
// import { X } from "lucide-react";
// export default function AddShipmentModal({ onClose }) {
//   const [shipmentId, setShipmentId] = useState("");
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [from, setFrom] = useState("");
//   const [to, setTo] = useState("");
//   const [departed, setDeparted] = useState("");
//   const [expected, setExpected] = useState("");
//   const [copied, setCopied] = useState(false);
//   // Generates a unique shipment ID
//   function generateShipmentId() {
//     // Format: SH-YYYYMMDD-XXXX (e.g., SH-20251111-AB12)
//     const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, ""); // YYYYMMDD
//     const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase(); // 4 random letters/numbers
//     return `SH-${datePart}-${randomPart}`;
//   }

//   const handleGenerateId = () => {
//     const id = generateShipmentId();
//     setShipmentId(id);
//     setCopied(false);
//   };

//   const handleCopy = () => {
//     if (shipmentId) {
//       navigator.clipboard.writeText(shipmentId);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (
//       !shipmentId ||
//       !name ||
//       !email ||
//       !from ||
//       !to ||
//       !departed ||
//       !expected
//     )
//       return;

//     const payload = {
//       shipmentId,
//       name,
//       email,
//       from,
//       to,
//       departed,
//       expected,
//     };

//     try {
//       const res = await fetch("/api/shipments", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (!res.ok) throw new Error("Failed to add shipment");

//       // Reset form
//       setShipmentId("");
//       setName("");
//       setEmail("");
//       setFrom("");
//       setTo("");
//       setDeparted("");
//       setExpected("");
//       onClose();
//     } catch (err) {
//       console.error(err);
//       alert("Error adding shipment");
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//       <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8 relative">
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
//         >
//           <X size={24} />
//         </button>

//         <h2 className="text-2xl font-semibold text-gray-800 mb-6">
//           Add New Shipment
//         </h2>

//         <form className="space-y-5" onSubmit={handleSubmit}>
//           {/* Name */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-1">Name</label>
//             <input
//               type="text"
//               placeholder="Enter full name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full border border-gray-300 rounded-md px-3 py-2 text-black text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               placeholder="Enter email address"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full border border-gray-300 rounded-md px-3 py-2 text-black text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//             />
//           </div>

//           {/* From Address */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-1">
//               From Address
//             </label>
//             <input
//               type="text"
//               placeholder="Starting address"
//               value={from}
//               onChange={(e) => setFrom(e.target.value)}
//               className="w-full border border-gray-300 rounded-md px-3 py-2 text-black text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* To Address */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-1">
//               To Address
//             </label>
//             <input
//               type="text"
//               placeholder="Destination address"
//               value={to}
//               onChange={(e) => setTo(e.target.value)}
//               className="w-full border border-gray-300 rounded-md px-3 py-2 text-black text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
//             />
//           </div>

//           {/* Departed Time */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-1">
//               Time Departed
//             </label>
//             <input
//               type="datetime-local"
//               value={departed}
//               onChange={(e) => setDeparted(e.target.value)}
//               className="w-full border border-gray-300 rounded-md px-3 py-2 text-black text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Expected Delivery */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-1">
//               Expected Delivery
//             </label>
//             <input
//               type="datetime-local"
//               value={expected}
//               onChange={(e) => setExpected(e.target.value)}
//               className="w-full border border-gray-300 rounded-md px-3 py-2 text-black text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//             />
//           </div>
//           {/* Shipment ID */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-1">
//               Shipment ID
//             </label>
//             <div className="flex gap-2">
//               <input
//                 type="text"
//                 placeholder="Click generate"
//                 value={shipmentId}
//                 readOnly
//                 className="w-full border border-gray-300 rounded-md px-3 py-2 text-black text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
//               />
//               <button
//                 type="button"
//                 onClick={handleGenerateId}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm transition"
//               >
//                 Generate
//               </button>
//               {shipmentId && (
//                 <button
//                   type="button"
//                   onClick={handleCopy}
//                   className={`px-3 py-2 rounded-md text-sm border ${
//                     copied
//                       ? "bg-green-500 text-white"
//                       : "border-gray-300 text-gray-700"
//                   } transition`}
//                 >
//                   {copied ? "Copied!" : "Copy"}
//                 </button>
//               )}
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition"
//           >
//             Add Shipment
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

export default function AddShipmentModal({ onClose }) {
  const [shipmentId, setShipmentId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departed, setDeparted] = useState("");
  const [expected, setExpected] = useState("");

  // NEW FIELDS
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

      // NEW FIELDS
      quantity,
      weight,
      dimensions: { length, width, height },
      packageType,
      serviceType,
      originHub,
      currentLocation,
      destinationHub,
      notes,

      status: "Transit", // default
    };

    try {
      const res = await fetch("/api/shipments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to add shipment");

      // Reset form
      setShipmentId("");
      setName("");
      setEmail("");
      setFrom("");
      setTo("");
      setDeparted("");
      setExpected("");

      // reset new fields
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

      onClose();
    } catch (err) {
      console.error(err);
      alert("Error adding shipment");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl max-h-screen overflow-scroll shadow-xl w-full max-w-md p-8 relative">
        {/* Close */}
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
          {/* -------------------------------- */}
          {/* ORIGINAL FIELDS */}
          {/* -------------------------------- */}

          <Input
            label="Name"
            value={name}
            setter={setName}
            placeholder="Enter full name"
          />
          <Input
            label="Email"
            value={email}
            setter={setEmail}
            type="email"
            placeholder="Enter email"
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
            value={departed}
            setter={setDeparted}
            type="datetime-local"
          />
          <Input
            label="Expected Delivery"
            value={expected}
            setter={setExpected}
            type="datetime-local"
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

          {/* -------------------------------- */}
          {/* NEW SCHEMA FIELDS */}
          {/* -------------------------------- */}

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

          {/* Dimensions */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Dimensions (cm)
            </label>
            <div className="grid grid-cols-3 gap-2">
              <Input
                type="number"
                value={length}
                setter={setLength}
                placeholder="L"
                short
              />
              <Input
                type="number"
                value={width}
                setter={setWidth}
                placeholder="W"
                short
              />
              <Input
                type="number"
                value={height}
                setter={setHeight}
                placeholder="H"
                short
              />
            </div>
          </div>

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
          {/* <Input
            label="Current Location"
            value={currentLocation}
            setter={setCurrentLocation}
          /> */}
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

// Small input component
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
