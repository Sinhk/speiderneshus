"use client";

import { useState, useEffect, useCallback } from "react";
import { format, parseISO } from "date-fns";
import { nb } from "date-fns/locale";

interface Booking {
  id: number;
  name: string;
  email: string;
  phone: string;
  organization: string | null;
  start_date: string;
  end_date: string;
  purpose: string;
  guests: number;
  message: string | null;
  status: "pending" | "approved" | "rejected";
  created_at: string;
}

type Filter = "all" | "pending" | "approved" | "rejected";

const STATUS_LABELS: Record<string, string> = {
  pending: "Venter",
  approved: "Godkjent",
  rejected: "Avvist",
};

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  const fetchBookings = useCallback(
    async (t: string) => {
      setLoading(true);
      try {
        const res = await fetch("/api/bookings?admin=true", {
          headers: { Authorization: `Bearer ${t}` },
        });
        if (res.ok) {
          const data = await res.json();
          setBookings(data);
        }
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    const saved = sessionStorage.getItem("admin_token");
    if (saved) {
      setToken(saved);
      fetchBookings(saved);
    }
  }, [fetchBookings]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        const data = await res.json();
        sessionStorage.setItem("admin_token", data.token);
        setToken(data.token);
        fetchBookings(data.token);
      } else {
        const data = await res.json();
        setLoginError(data.error ?? "Feil passord");
      }
    } catch {
      setLoginError("Nettverksfeil");
    }
  }

  async function handleStatusChange(id: number, status: "approved" | "rejected") {
    if (!token) return;
    setActionLoading(id);
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) => (b.id === id ? { ...b, status } : b))
        );
      }
    } finally {
      setActionLoading(null);
    }
  }

  async function handleDelete(id: number) {
    if (!token) return;
    if (!confirm("Er du sikker på at du vil slette denne bestillingen?")) return;
    setActionLoading(id);
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setBookings((prev) => prev.filter((b) => b.id !== id));
      }
    } finally {
      setActionLoading(null);
    }
  }

  function handleLogout() {
    sessionStorage.removeItem("admin_token");
    setToken(null);
    setBookings([]);
  }

  // Login screen
  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-sm">
          <div className="text-center mb-6">
            <div className="text-4xl mb-2">🔐</div>
            <h1 className="text-xl font-bold text-gray-800">Adminpanel</h1>
            <p className="text-gray-500 text-sm mt-1">Speidernes Hus – Molde</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Passord
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Skriv inn passord"
              />
            </div>
            {loginError && (
              <p className="text-red-600 text-sm">{loginError}</p>
            )}
            <button
              type="submit"
              className="w-full bg-green-700 text-white font-semibold py-2.5 rounded-lg hover:bg-green-600 transition-colors"
            >
              Logg inn
            </button>
          </form>
        </div>
      </div>
    );
  }

  const filtered =
    filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  const counts = {
    all: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    approved: bookings.filter((b) => b.status === "approved").length,
    rejected: bookings.filter((b) => b.status === "rejected").length,
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Adminpanel</h1>
          <p className="text-gray-500 text-sm">
            Administrer bookingforespørsler
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-gray-500 hover:text-gray-700 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Logg ut
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {(["all", "pending", "approved", "rejected"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-xl p-4 text-left border-2 transition-colors ${
              filter === f
                ? "border-green-500 bg-green-50"
                : "border-gray-100 bg-white hover:border-gray-200"
            }`}
          >
            <div className="text-2xl font-bold text-gray-800">{counts[f]}</div>
            <div className="text-sm text-gray-500 capitalize">
              {f === "all"
                ? "Alle"
                : f === "pending"
                ? "Venter"
                : f === "approved"
                ? "Godkjent"
                : "Avvist"}
            </div>
          </button>
        ))}
      </div>

      {/* Refresh */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => fetchBookings(token)}
          className="text-sm text-green-700 hover:underline"
        >
          🔄 Oppdater
        </button>
      </div>

      {/* Bookings list */}
      {loading ? (
        <div className="text-center text-gray-500 py-12">Laster…</div>
      ) : filtered.length === 0 ? (
        <div className="text-center text-gray-500 py-12 bg-white rounded-2xl border border-gray-100">
          Ingen bookinger funnet.
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((b) => (
            <div
              key={b.id}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-gray-800">{b.name}</h3>
                    <span
                      className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${STATUS_COLORS[b.status]}`}
                    >
                      {STATUS_LABELS[b.status]}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm text-gray-600">
                    <div>
                      📅{" "}
                      {format(parseISO(b.start_date), "d. MMM yyyy", {
                        locale: nb,
                      })}{" "}
                      –{" "}
                      {format(parseISO(b.end_date), "d. MMM yyyy", {
                        locale: nb,
                      })}
                    </div>
                    <div>👥 {b.guests} gjester</div>
                    <div>
                      ✉️{" "}
                      <a
                        href={`mailto:${b.email}`}
                        className="text-green-700 hover:underline"
                      >
                        {b.email}
                      </a>
                    </div>
                    <div>📞 {b.phone}</div>
                    <div>🎯 {b.purpose}</div>
                    {b.organization && <div>🏢 {b.organization}</div>}
                    <div className="sm:col-span-2 text-gray-400 text-xs">
                      Mottatt:{" "}
                      {format(
                        new Date(b.created_at),
                        "d. MMM yyyy HH:mm",
                        { locale: nb }
                      )}
                    </div>
                  </div>

                  {b.message && (
                    <div className="mt-3 bg-gray-50 rounded-lg p-3 text-sm text-gray-700">
                      💬 {b.message}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 flex-shrink-0">
                  {b.status !== "approved" && (
                    <button
                      onClick={() => handleStatusChange(b.id, "approved")}
                      disabled={actionLoading === b.id}
                      className="bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-green-500 transition-colors disabled:opacity-50"
                    >
                      ✓ Godkjenn
                    </button>
                  )}
                  {b.status !== "rejected" && (
                    <button
                      onClick={() => handleStatusChange(b.id, "rejected")}
                      disabled={actionLoading === b.id}
                      className="bg-red-100 text-red-700 text-sm font-medium px-4 py-2 rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50"
                    >
                      ✗ Avvis
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(b.id)}
                    disabled={actionLoading === b.id}
                    className="text-gray-400 hover:text-gray-600 text-sm px-2 py-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
                    title="Slett"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
