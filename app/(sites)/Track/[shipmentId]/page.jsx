/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import ShipmentMap from "@/app/components/ui/ShipmentMap";
import ShipmentSummaryHeader from "@/app/components/ui/ShipmentSummaryHeader";
import ShipmentProgressBar from "@/app/components/ui/ShipmentProgressBar";
import {
  Copy,
  Share2,
  Printer,
  Mail,
  Package,
  User,
  MapPin,
  Calendar,
  CreditCard,
  Hash,
  FileText,
  MessageSquare,
  AlertTriangle,
  Truck,
  Timer,
} from "lucide-react";

const TrackShipmentPage = () => {
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const params = useParams();
  const { shipmentId } = params;

  const fetchShipment = useCallback(async () => {
    try {
      const res = await fetch("/api/shipments/" + shipmentId);
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Shipment not found");
      }
      const data = await res.json();
      setShipment(data);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [shipmentId]);

  useEffect(() => {
    if (shipmentId) fetchShipment();
  }, [shipmentId, fetchShipment]);
  useEffect(() => {
    if (!shipmentId) return;
    const i = setInterval(fetchShipment, 30000);
    return () => clearInterval(i);
  }, [shipmentId, fetchShipment]);

  const handleCopy = () => {
    navigator.clipboard.writeText(shipmentId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share)
      await navigator.share({ title: "Track " + shipmentId, url });
    else {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  const handlePrint = () => window.print();

  if (loading)
    return (
      <div className="flex justify-center bg-white items-center min-h-[60vh] mt-20">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-indigo-600 border-dashed rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-black">Loading...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4 mt-20">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-500 mb-4">
            <AlertTriangle size={32} />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Shipment Not Found
          </h2>
          <p className="text-red-600 mb-4">{error}</p>
          <a href="/" className="text-indigo-600 hover:underline text-sm">
            Return to Home
          </a>
        </div>
      </div>
    );

  if (!shipment)
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-white mt-20">
        <p className="text-gray-500">Shipment not found</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 mt-15">
      <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8 space-y-6">
        {/* ACTIONS BAR */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 shadow-sm transition"
          >
            <Copy size={14} /> {copied ? "Copied!" : "Copy #"}
          </button>
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 shadow-sm transition"
          >
            <Share2 size={14} /> Share
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 shadow-sm transition"
          >
            <Printer size={14} /> Print
          </button>
          <a
            href="mailto:omnicargo.customercare@gmail.com"
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 shadow-sm transition"
          >
            <Mail size={14} /> Support
          </a>
        </div>

        {/* 1. SUMMARY HEADER */}
        <ShipmentSummaryHeader shipment={shipment} />

        {/* 2. SHIPPER & RECEIVER */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <PersonCard
            role="Shipper"
            color="indigo"
            data={shipment.shipper}
            fallbackName={shipment.name}
            fallbackInfo={shipment.shipperInfo}
          />
          <PersonCard
            role="Receiver"
            color="green"
            data={shipment.receiver}
            fallbackInfo={shipment.receiverInfo}
          />
        </div>

        {/* 3. SHIPMENT DETAILS */}
        <div className="bg-white shadow-sm rounded-xl p-5 sm:p-6 border border-gray-100">
          <h3 className="text-base font-semibold text-gray-900 mb-4">
            Shipment Details
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <D
              icon={<Package size={16} />}
              label="Package Type"
              v={shipment.packageType}
            />
            <D
              icon={<Hash size={16} />}
              label="Quantity"
              v={shipment.quantity}
            />
            <D
              icon={<Truck size={16} />}
              label="Weight"
              v={shipment.weight ? shipment.weight + " kg" : null}
            />
            <D
              icon={<FileText size={16} />}
              label="Dimensions"
              v={
                shipment.dimensions?.length
                  ? shipment.dimensions.length +
                    "×" +
                    shipment.dimensions.width +
                    "×" +
                    shipment.dimensions.height +
                    " cm"
                  : null
              }
            />
            <D
              icon={<Truck size={16} />}
              label="Shipment Type"
              v={shipment.shipmentType}
            />
            <D
              icon={<Timer size={16} />}
              label="Service"
              v={shipment.serviceType}
            />
            <D
              icon={<CreditCard size={16} />}
              label="Payment"
              v={shipment.paymentMethod}
            />
            <D
              icon={<CreditCard size={16} />}
              label="Freight"
              v={shipment.totalFreight ? "$" + shipment.totalFreight : null}
            />
            <D
              icon={<MapPin size={16} />}
              label="Origin"
              v={
                typeof shipment.origin === "object"
                  ? shipment.origin?.name
                  : shipment.origin || shipment.originHub
              }
            />
            <D
              icon={<MapPin size={16} />}
              label="Destination"
              v={
                typeof shipment.destination === "object"
                  ? shipment.destination?.name
                  : shipment.destination || shipment.destinationHub
              }
            />
            <D
              icon={<Hash size={16} />}
              label="Carrier Ref"
              v={shipment.carrierReference || shipment.shipmentId}
            />
            <D
              icon={<Calendar size={16} />}
              label="Departed"
              v={
                shipment.departed
                  ? new Date(shipment.departed).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : null
              }
            />
          </div>
          {(shipment.comments || shipment.notes) && (
            <div className="mt-4 pt-4 border-t space-y-2">
              {shipment.comments && (
                <D
                  icon={<MessageSquare size={16} />}
                  label="Comments"
                  v={shipment.comments}
                />
              )}
              {shipment.notes && (
                <D
                  icon={<FileText size={16} />}
                  label="Notes"
                  v={shipment.notes}
                />
              )}
            </div>
          )}
        </div>

        {/* 4. PROGRESS BAR */}
        <div className="bg-white shadow-sm rounded-xl p-5 sm:p-6 border border-gray-100">
          <h3 className="text-base font-semibold text-gray-900 mb-3">
            Shipment Progress
          </h3>
          <ShipmentProgressBar
            departed={shipment.departed}
            expected={shipment.expected}
            status={shipment.status}
            shipmentId={shipment.shipmentId}
          />
        </div>

        {/* 5. MAP */}
        <div className="bg-white shadow-sm rounded-xl border border-gray-100 overflow-hidden h-72 sm:h-96">
          <ShipmentMap shipment={shipment} />
        </div>

        {/* SUPPORT */}
        <div className="text-center py-4">
          <p className="text-sm text-gray-500">
            Need help?{" "}
            <a
              href="mailto:omnicargo.customercare@gmail.com"
              className="text-indigo-600 hover:underline font-medium"
            >
              omnicargo.customercare@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

function D({ icon, label, v }) {
  if (!v && v !== 0) return null;
  return (
    <div className="bg-gray-50 rounded-lg p-3">
      <div className="flex items-center gap-1.5 text-gray-500 text-xs uppercase tracking-wide mb-1">
        {icon} {label}
      </div>
      <p className="font-medium text-gray-900 text-sm break-words">
        {String(v)}
      </p>
    </div>
  );
}

function PersonCard({ role, color, data, fallbackName, fallbackInfo }) {
  const c = {
    indigo: "bg-indigo-100 text-indigo-600",
    green: "bg-green-100 text-green-600",
  };
  return (
    <div className="bg-white shadow-sm rounded-xl p-5 border border-gray-100">
      <div className="flex items-center gap-3 mb-3">
        <div
          className={
            "w-10 h-10 rounded-full flex items-center justify-center " +
            (c[color] || "bg-gray-100")
          }
        >
          <User size={18} />
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">
            {role}
          </p>
          <p className="font-semibold text-gray-900">
            {data?.name || fallbackName || "N/A"}
          </p>
        </div>
      </div>
      <div className="space-y-1 text-sm text-gray-600">
        {data?.email && <p className="truncate">{data.email}</p>}
        {data?.phone && <p>{data.phone}</p>}
        {data?.address && (
          <p className="text-xs text-gray-400">{data.address}</p>
        )}
        {!data?.name && fallbackInfo && (
          <p className="text-xs whitespace-pre-line">{fallbackInfo}</p>
        )}
        {!data?.name && !fallbackName && !fallbackInfo && (
          <p className="text-gray-400 italic text-xs">No details</p>
        )}
      </div>
    </div>
  );
}

export default TrackShipmentPage;
