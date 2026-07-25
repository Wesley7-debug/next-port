"use client";

import dynamic from "next/dynamic";

const ShipmentMap = dynamic(() => import("./ShipmentMapInner"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-gray-100">
      <div className="w-8 h-8 border-4 border-indigo-600 border-dashed rounded-full animate-spin"></div>
    </div>
  ),
});

export default ShipmentMap;
