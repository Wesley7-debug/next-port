"use client";

import React, { useState, useEffect } from "react";
import {
  Package,
  Plus,
  Truck,
  Timer,
  CheckCircle2,
  AlarmClock,
  XCircle,
  PauseCircle,
  RotateCcw,
  ArrowBigRightDash,
  LogOut,
  Edit,
  MapPin,
  Search,
  RefreshCw,
  Trash2,
  Eye,
} from "lucide-react";
import AddShipmentModal from "../components/ui/AddShipmentModal";
import EditShipmentModal from "../components/ui/EditShipmentModal";

const STATUS_STYLES = {
  Pending: "bg-gray-100 text-gray-700",
  "Picked Up": "bg-lime-100 text-lime-700",
  Transit: "bg-blue-100 text-blue-700",
  "Customs Clearance": "bg-cyan-100 text-cyan-700",
  Hold: "bg-amber-100 text-amber-700",
  Delayed: "bg-orange-100 text-orange-700",
  "Out for Delivery": "bg-indigo-100 text-indigo-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
  Returned: "bg-purple-100 text-purple-700",
};

const STATUS_ICONS = {
  Pending: <Timer size={18} />,
  "Picked Up": <Truck size={18} />,
  Transit: <Truck size={18} />,
  "Customs Clearance": <Timer size={18} />,
  Hold: <PauseCircle size={18} />,
  Delayed: <AlarmClock size={18} />,
  "Out for Delivery": <ArrowBigRightDash size={18} />,
  Delivered: <CheckCircle2 size={18} />,
  Cancelled: <XCircle size={18} />,
  Returned: <RotateCcw size={18} />,
};

const STATUS_OPTIONS = [
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

export default function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [shipments, setShipments] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editShipment, setEditShipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    checkAuth();
  }, []);
  useEffect(() => {
    if (authenticated) fetchShipments();
  }, [authenticated]);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/admin/check");
      const data = await res.json();
      setAuthenticated(data.authenticated);
    } catch {
      setAuthenticated(false);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoggingIn(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      setAuthenticated(true);
    } catch (err) {
      setLoginError(err.message);
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthenticated(false);
    setShipments([]);
  };

  const fetchShipments = async () => {
    try {
      const res = await fetch("/api/shipments");
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          setAuthenticated(false);
          return;
        }
        throw new Error("Failed");
      }
      const data = await res.json();
      setShipments(data);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const updateShipmentStatus = async (id, newStatus) => {
    setShipments((prev) =>
      prev.map((s) => (s.shipmentId === id ? { ...s, status: newStatus } : s)),
    );
    try {
      await fetch("/api/shipments/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch {
      fetchShipments();
    }
  };

  const addShipment = (s) => setShipments((prev) => [s, ...prev]);

  const deleteShipment = async (id) => {
    if (!confirm("Delete shipment " + id + "? This cannot be undone.")) return;
    try {
      const res = await fetch("/api/shipments/" + id, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed");
      setShipments((prev) => prev.filter((s) => s.shipmentId !== id));
    } catch {
      alert("Error deleting shipment");
    }
  };

  const handleShipmentUpdated = (updated) => {
    setShipments((prev) =>
      prev.map((s) => (s.shipmentId === updated.shipmentId ? updated : s)),
    );
  };

  const filtered = shipments.filter((s) => {
    const q = searchQuery.toLowerCase();
    return (
      (!q ||
        (s.shipmentId || "").toLowerCase().includes(q) ||
        (s.name || "").toLowerCase().includes(q) ||
        (s.email || "").toLowerCase().includes(q)) &&
      (!statusFilter || s.status === statusFilter)
    );
  });

  const stats = {
    total: shipments.length,
    transit: shipments.filter((s) => s.status === "Transit").length,
    delivered: shipments.filter((s) => s.status === "Delivered").length,
    delayed: shipments.filter((s) => s.status === "Delayed" || s.isDelayed)
      .length,
  };

  if (authLoading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-10 h-10 border-4 border-indigo-600 border-dashed rounded-full animate-spin"></div>
      </div>
    );

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 mb-4">
              <Package size={32} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              OmniCargo Admin
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Sign in to manage shipments
            </p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Admin Email
              </label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
                placeholder="admin@omnicargo.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            {loginError && (
              <p className="text-red-600 text-sm bg-red-50 rounded-lg p-3">
                {loginError}
              </p>
            )}
            <button
              type="submit"
              disabled={loggingIn}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
            >
              {loggingIn ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="sticky top-0 z-40 bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Package className="text-indigo-600" size={28} />
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-xs text-gray-500">{stats.total} shipments</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                fetchShipments();
                setLoading(true);
                setTimeout(() => setLoading(false), 500);
              }}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition"
            >
              <RefreshCw size={20} />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Total", value: stats.total, color: "text-gray-900" },
            {
              label: "In Transit",
              value: stats.transit,
              color: "text-blue-600",
            },
            {
              label: "Delivered",
              value: stats.delivered,
              color: "text-green-600",
            },
            {
              label: "Delayed",
              value: stats.delayed,
              color: "text-orange-600",
            },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className={"text-2xl font-bold " + s.color}>{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search by ID, name, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Statuses</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap"
          >
            <Plus size={18} /> Add Shipment
          </button>
        </div>
      </div>

      <main className="flex-1 p-4 sm:p-6">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-indigo-600 border-dashed rounded-full animate-spin"></div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <Package size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">No shipments found</p>
            {searchQuery || statusFilter ? (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("");
                }}
                className="text-indigo-600 text-sm mt-2 hover:underline"
              >
                Clear filters
              </button>
            ) : (
              <button
                onClick={() => setShowAddModal(true)}
                className="text-indigo-600 text-sm mt-2 hover:underline"
              >
                Add your first shipment
              </button>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((s) => (
              <div
                key={s.shipmentId}
                className="bg-white shadow-sm hover:shadow-md transition rounded-xl border border-gray-100 overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-xs text-gray-500 font-mono">
                        {s.shipmentId}
                      </p>
                      <h3 className="font-semibold text-gray-900 mt-0.5">
                        {s.destination?.name || s.to || "N/A"}
                      </h3>
                    </div>
                    <span
                      className={
                        "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium " +
                        (STATUS_STYLES[s.status] || "bg-gray-100 text-gray-700")
                      }
                    >
                      {STATUS_ICONS[s.status] || <Truck size={14} />}
                      {s.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1 mb-3">
                    <p>Name: {s.name}</p>
                    <p>Email: {s.email}</p>
                    <p>
                      {s.from} → {s.to}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {STATUS_OPTIONS.map((st) => (
                      <button
                        key={st}
                        onClick={() => updateShipmentStatus(s.shipmentId, st)}
                        className={
                          "p-1.5 rounded-md transition border text-xs " +
                          (s.status === st
                            ? "bg-indigo-600 text-white border-indigo-600 shadow"
                            : "bg-gray-100 text-gray-500 border-gray-200 opacity-50 hover:opacity-100")
                        }
                        title={st}
                      >
                        {STATUS_ICONS[st] || <Truck size={14} />}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="border-t bg-gray-50 px-4 py-2 flex gap-2">
                  <button
                    onClick={() => {
                      setEditShipment(s);
                      setShowEditModal(true);
                    }}
                    className="flex-1 flex items-center justify-center gap-1 text-xs font-medium text-indigo-600 hover:bg-indigo-50 py-1.5 rounded-md transition"
                  >
                    <Edit size={14} /> Edit
                  </button>
                  <a
                    href={"/Track/" + s.shipmentId}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1 text-xs font-medium text-gray-600 hover:bg-gray-100 py-1.5 rounded-md transition"
                  >
                    <Eye size={14} /> View Tracking
                  </a>
                  <button
                    onClick={() => deleteShipment(s.shipmentId)}
                    className="flex items-center justify-center gap-1 text-xs font-medium text-red-500 hover:bg-red-50 py-1.5 px-2 rounded-md transition"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <button
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg md:hidden z-30"
      >
        <Plus size={24} />
      </button>

      {showAddModal && (
        <AddShipmentModal
          onClose={() => setShowAddModal(false)}
          onAdd={addShipment}
        />
      )}
      {showEditModal && editShipment && (
        <EditShipmentModal
          shipment={editShipment}
          onClose={() => {
            setShowEditModal(false);
            setEditShipment(null);
          }}
          onUpdate={handleShipmentUpdated}
        />
      )}
    </div>
  );
}
