"use client";

import { useState, useEffect } from "react";
import BookingCalendar from "@/components/BookingCalendar";
import BookingForm from "@/components/BookingForm";

interface BookedPeriod {
  id: number;
  start_date: string;
  end_date: string;
}

export default function BookingPage() {
  const [bookedPeriods, setBookedPeriods] = useState<BookedPeriod[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStart, setSelectedStart] = useState<Date | null>(null);
  const [selectedEnd, setSelectedEnd] = useState<Date | null>(null);

  useEffect(() => {
    fetch("/api/bookings")
      .then((r) => r.json())
      .then((data) => {
        setBookedPeriods(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  function handleDateRangeSelect(start: Date, end: Date) {
    setSelectedStart(start);
    setSelectedEnd(end);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">Book Speidernes Hus</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Velg ønsket periode i kalenderen og fyll ut skjemaet. Vi behandler
          forespørselen og bekrefter via e-post innen 24 timer.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calendar */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            1. Velg datoer
          </h2>
          {loading ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center text-gray-500">
              Laster kalender…
            </div>
          ) : (
            <BookingCalendar
              bookedPeriods={bookedPeriods}
              onDateRangeSelect={handleDateRangeSelect}
            />
          )}

          {/* Info box */}
          <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-5 text-sm text-blue-800">
            <h3 className="font-semibold mb-2">ℹ️ Viktig informasjon</h3>
            <ul className="space-y-1 list-disc list-inside">
              <li>Røde datoer er allerede reservert.</li>
              <li>Klikk på startdato, deretter sluttdato for å velge periode.</li>
              <li>Bookingen er uforpliktende inntil vi bekrefter via e-post.</li>
              <li>Innsjekk fra kl. 14:00, utsjekk innen kl. 12:00.</li>
            </ul>
          </div>
        </div>

        {/* Form */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            2. Fyll ut skjema
          </h2>
          <BookingForm startDate={selectedStart} endDate={selectedEnd} />
        </div>
      </div>

      {/* Pricing reminder */}
      <section className="mt-12 bg-gray-50 rounded-2xl p-8">
        <h2 className="text-lg font-bold text-gray-800 mb-6">Priser</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { type: "Dagleie", price: "1 500 kr", note: "Per dag" },
            { type: "Helgeleie", price: "3 500 kr", note: "Fredag–søndag" },
            { type: "Ukeleie", price: "8 000 kr", note: "Per uke" },
          ].map((p) => (
            <div key={p.type} className="text-center">
              <div className="font-semibold text-gray-700">{p.type}</div>
              <div className="text-2xl font-bold text-green-700 mt-1">
                {p.price}
              </div>
              <div className="text-sm text-gray-500">{p.note}</div>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-500 text-center mt-4">
          Alle priser inkl. mva. Kontakt oss for spesielle priser.
        </p>
      </section>
    </div>
  );
}
