"use client";

import React from "react";
import { CheckCircle2, Circle, Clock, MapPin } from "lucide-react";

const DEFAULT_EVENTS = [
  { title: "Shipment Created", key: "created" },
  { title: "Picked Up", key: "picked_up" },
  { title: "Departed Origin", key: "departed_origin" },
  { title: "In Transit", key: "in_transit" },
  { title: "Arrived at Hub", key: "arrived_hub" },
  { title: "Customs Clearance", key: "customs" },
  { title: "Out for Delivery", key: "out_for_delivery" },
  { title: "Arrived at Destination", key: "arrived_destination" },
  { title: "Delivered", key: "delivered" },
];

export default function ShipmentTimeline({ events = [], status }) {
  // If no custom events, generate from default lifecycle based on status
  const timelineEvents =
    events.length > 0 ? events : generateDefaultTimeline(status);

  return (
    <div className="w-full max-w-4xl bg-white shadow-sm rounded-xl p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Tracking History
      </h3>
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-gray-200" />

        <div className="space-y-0">
          {timelineEvents.map((event, idx) => {
            const isCompleted = event.completed !== false;
            const isCurrent = idx === timelineEvents.length - 1 && isCompleted;

            return (
              <div
                key={idx}
                className="relative flex items-start gap-4 pb-6 last:pb-0"
              >
                {/* Dot */}
                <div
                  className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 shrink-0 ${
                    isCompleted
                      ? "bg-indigo-600 border-indigo-600 text-white"
                      : "bg-white border-gray-300 text-gray-300"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 size={18} />
                  ) : (
                    <Circle size={18} />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pt-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    <h4
                      className={`font-semibold text-sm ${isCompleted ? "text-gray-900" : "text-gray-400"}`}
                    >
                      {event.title}
                    </h4>
                    {isCurrent && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-indigo-100 text-indigo-700 rounded-full w-fit">
                        <Clock size={10} /> Current
                      </span>
                    )}
                  </div>

                  {event.location && (
                    <p className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                      <MapPin size={12} />
                      {event.location}
                    </p>
                  )}

                  {event.date && (
                    <p className="text-xs text-gray-400 mt-0.5">
                      {new Date(event.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                      {event.time && ` — ${event.time}`}
                      {!event.time &&
                        ` — ${new Date(event.date).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}`}
                    </p>
                  )}

                  {event.description && (
                    <p className="text-sm text-gray-600 mt-1">
                      {event.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function generateDefaultTimeline(status) {
  const statusOrder = [
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

  const statusLabels = {
    Pending: "Shipment Created",
    "Picked Up": "Picked Up",
    Transit: "In Transit",
    "Customs Clearance": "Customs Clearance",
    Hold: "On Hold",
    Delayed: "Delayed",
    "Out for Delivery": "Out for Delivery",
    Delivered: "Delivered",
    Cancelled: "Cancelled",
    Returned: "Returned",
  };

  const currentIdx = statusOrder.indexOf(status);
  if (currentIdx === -1) return [];

  const events = [];
  const relevantStatuses = statusOrder.slice(0, currentIdx + 1);

  relevantStatuses.forEach((s, i) => {
    events.push({
      title: statusLabels[s] || s,
      completed: i < currentIdx || i === currentIdx,
      date: new Date().toISOString(),
    });
  });

  return events;
}
