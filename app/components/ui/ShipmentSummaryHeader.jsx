"use client";

import React from "react";
import {
  Truck,
  ArrowBigRightDash,
  CheckCircle2,
  AlarmClock,
  Timer,
  XCircle,
  PauseCircle,
  RotateCcw,
  AlertTriangle,
  Clock,
  MapPin,
} from "lucide-react";

const STATUS_STYLES = {
  Pending: "bg-gray-100 text-gray-700 border-gray-300",
  "Picked Up": "bg-lime-100 text-lime-700 border-lime-300",
  Transit: "bg-blue-100 text-blue-700 border-blue-300",
  "Customs Clearance": "bg-cyan-100 text-cyan-700 border-cyan-300",
  Hold: "bg-amber-100 text-amber-700 border-amber-300",
  Delayed: "bg-orange-100 text-orange-700 border-orange-300",
  "Out for Delivery": "bg-indigo-100 text-indigo-700 border-indigo-300",
  Delivered: "bg-green-100 text-green-700 border-green-300",
  Cancelled: "bg-red-100 text-red-700 border-red-300",
  Returned: "bg-purple-100 text-purple-700 border-purple-300",
};

const STATUS_ICONS = {
  Pending: <Timer size={20} />,
  "Picked Up": <Truck size={20} />,
  Transit: <Truck size={20} />,
  "Customs Clearance": <Clock size={20} />,
  Hold: <PauseCircle size={20} />,
  Delayed: <AlarmClock size={20} />,
  "Out for Delivery": <ArrowBigRightDash size={20} />,
  Delivered: <CheckCircle2 size={20} />,
  Cancelled: <XCircle size={20} />,
  Returned: <RotateCcw size={20} />,
};

export default function ShipmentSummaryHeader({ shipment }) {
  const getTimeAgo = (date) => {
    if (!date) return "N/A";
    const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
    if (seconds < 60) return "Just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  };

  const getDaysRemaining = () => {
    if (!shipment.expected) return null;
    const now = Date.now();
    const expected = new Date(shipment.expected).getTime();
    const diffDays = Math.ceil((expected - now) / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getScheduleStatus = () => {
    const s = shipment.status;
    switch (s) {
      case "Pending":       return { label: "Awaiting Pickup", color: "text-gray-500", dot: "bg-gray-400", blink: false };
      case "Picked Up":    return { label: "Processing", color: "text-lime-600", dot: "bg-lime-500", blink: true };
      case "Transit":      return { label: "Active", color: "text-green-600", dot: "bg-green-500", blink: true };
      case "Customs Clearance": return { label: "In Clearance", color: "text-cyan-600", dot: "bg-cyan-500", blink: true };
      case "Hold":         return { label: "On Hold", color: "text-amber-600", dot: "bg-amber-500", blink: false };
      case "Delayed":      return { label: "Delayed", color: "text-orange-600", dot: "bg-orange-500", blink: true };
      case "Out for Delivery": return { label: "Out for Delivery", color: "text-indigo-600", dot: "bg-indigo-500", blink: true };
      case "Delivered":    return { label: "Delivered", color: "text-green-600", dot: "bg-green-500", blink: false };
      case "Cancelled":    return { label: "Cancelled", color: "text-red-600", dot: "bg-red-500", blink: false };
      case "Returned":     return { label: "Returned", color: "text-purple-600", dot: "bg-purple-500", blink: false };
      default:             return { label: "On Schedule", color: "text-green-600", dot: "bg-green-500", blink: true };
    }
  };

  const scheduleInfo = getScheduleStatus();
  const daysRemaining = getDaysRemaining();
  const currentLoc =
    (typeof shipment.currentLocation === "object"
      ? shipment.currentLocation?.name
      : shipment.currentLocation) || "N/A";
  const timeAgo = getTimeAgo(shipment.lastUpdated);
  const originLoc =
    (typeof shipment.origin === "object"
      ? shipment.origin?.name
      : shipment.origin) ||
    shipment.from ||
    "N/A";
  const destLoc =
    (typeof shipment.destination === "object"
      ? shipment.destination?.name
      : shipment.destination) ||
    shipment.to ||
    "N/A";

  const isException = ["Delayed", "Cancelled", "Hold", "Returned"].includes(
    shipment.status,
  );

  return (
    <div className="w-full max-w-4xl">
      {/* Exception Alert */}
      {isException && (
        <div
          className={`mb-4 p-4 rounded-xl border-2 flex items-start gap-3 ${shipment.status === "Delayed" || shipment.status === "Hold" ? "bg-amber-50 border-amber-300 text-amber-800" : "bg-red-50 border-red-300 text-red-800"}`}
        >
          <AlertTriangle size={24} className="shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-lg">
              {shipment.status === "Delayed" && "⚠️ Shipment Delayed"}
              {shipment.status === "Hold" && "⏸️ Shipment On Hold"}
              {shipment.status === "Cancelled" && "❌ Shipment Cancelled"}
              {shipment.status === "Returned" && "↩️ Shipment Returned"}
            </p>
            {shipment.delayReason && (
              <p className="mt-1 text-sm">
                <strong>Reason:</strong> {shipment.delayReason}
              </p>
            )}
            {shipment.exceptionDetails && (
              <p className="mt-1 text-sm">{shipment.exceptionDetails}</p>
            )}
            {shipment.status === "Delayed" && shipment.expected && (
              <p className="mt-1 text-sm">
                <strong>New Estimated Delivery:</strong>{" "}
                {new Date(shipment.expected).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Summary Card */}
      <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-sm text-gray-500 uppercase tracking-wide">
              Shipment #
            </h2>
            <h1 className="text-2xl font-bold text-gray-900">
              {shipment.shipmentId}
            </h1>
          </div>
          <span
            className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full border ${STATUS_STYLES[shipment.status] || "bg-gray-100 text-gray-700 border-gray-300"}`}
          >
            {STATUS_ICONS[shipment.status] || <Truck size={20} />}
            {shipment.status}
          </span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-1 text-gray-500 text-xs uppercase tracking-wide mb-1">
              <MapPin size={14} /> Current Location
            </div>
            <p className="font-semibold text-gray-900 text-sm">{currentLoc}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-1 text-gray-500 text-xs uppercase tracking-wide mb-1">
              <Clock size={14} /> Estimated Delivery
            </div>
            <p className="font-semibold text-gray-900 text-sm">
              {shipment.expected
                ? new Date(shipment.expected).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "N/A"}
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-1 text-gray-500 text-xs uppercase tracking-wide mb-1">
              <Clock size={14} /> Last Updated
            </div>
            <p className="font-semibold text-gray-900 text-sm">{timeAgo}</p>
            {shipment.lastUpdated &&
              Date.now() - new Date(shipment.lastUpdated).getTime() >
                86400000 && (
                <p className="text-xs text-orange-500 mt-0.5">
                  Location may be outdated
                </p>
              )}
          </div>

          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-1 text-gray-500 text-xs uppercase tracking-wide mb-1">
              <CheckCircle2 size={14} /> Delivery Status
            </div>
            <div className="flex items-center gap-2">
              <span className={`inline-block w-2.5 h-2.5 rounded-full ${scheduleInfo.dot} ${scheduleInfo.blink ? "animate-pulse" : ""}`}></span>
              <p className={`font-semibold text-sm ${scheduleInfo.color}`}>
                {scheduleInfo.label}
              </p>
            </div>
            {daysRemaining !== null &&
              daysRemaining > 0 &&
              shipment.status !== "Delivered" && (
                <p className="text-xs text-gray-500 mt-0.5">
                  {daysRemaining} day{daysRemaining > 1 ? "s" : ""} remaining
                </p>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
