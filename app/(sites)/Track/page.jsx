import React from "react";

const TrackShipment = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 flex flex-col items-center pt-20">
      {/* Header */}
      <div className="w-full max-w-4xl bg-white shadow-sm rounded-lg p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Shipment ID: SHP-5567
            </h2>
            <p className="text-sm text-gray-500">
              Shipping date: Apr 14, 2023 • Order ID:{" "}
              <span className="text-indigo-600 font-medium">Order-12567</span>
            </p>
          </div>

          <div className="mt-3 sm:mt-0 flex items-center gap-2">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
              In Progress
            </span>
            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
              Delay
            </span>
          </div>
        </div>

        {/* Order Summary */}
        <div className="mt-6 border-t border-gray-200 pt-4">
          <div className="flex flex-col sm:flex-row justify-between text-sm text-gray-600">
            <div>
              <p className="font-semibold">From:</p>
              <p>2118 Hornridge Cir, Syracuse, 35624</p>
            </div>
            <div className="mt-2 sm:mt-0">
              <p className="font-semibold">To:</p>
              <p>3517 W. Gray St, Utica, 57867</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative mt-6">
            <div className="h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-indigo-600 rounded-full w-2/3"></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>Departed: 23 Aug 23 - 14:11 PM</span>
              <span>Expected: 14 Nov 23 - 18:32 PM</span>
            </div>
          </div>

          {/* Alert Box */}
          <div className="mt-4 bg-red-50 text-red-700 border border-red-200 rounded-lg p-3 text-sm">
            ⚠️ High volume: During peak seasons like holidays, there can be
            delays due to increased shipment volume.
          </div>
        </div>

        {/* Shipment Status */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Shipment Status
          </h3>
          <div className="space-y-4 text-sm text-gray-600">
            <div className="flex justify-between">
              <p>Order Placed</p>
              <p>10 Jun 2024 - 14:00 PM</p>
            </div>
            <div className="flex justify-between">
              <p>Preparing to Ship</p>
              <p>10 Jun 2024 - 14:30 PM</p>
            </div>
            <div className="flex justify-between">
              <p>Shipment received by seller (Silicon Valley, CA)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="w-full max-w-4xl mt-6 bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="relative">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/8/80/Map_of_USA_blank.svg"
            alt="Map"
            className="w-full h-80 object-cover opacity-90"
          />
          <div className="absolute left-1/3 top-1/3 bg-indigo-700 text-white px-3 py-2 rounded-lg text-xs shadow-lg">
            MSW Warehouse
            <br />
            741 Nicollette Freeway, Utah
            <br />
            15:32 • GMT +7
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackShipment;
