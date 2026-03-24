"use client";

import { useState } from "react";
import { format } from "date-fns";
import { nb } from "date-fns/locale";

interface BookingFormProps {
  startDate: Date | null;
  endDate: Date | null;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  organization: string;
  purpose: string;
  guests: string;
  message: string;
}

const initialForm: FormData = {
  name: "",
  email: "",
  phone: "",
  organization: "",
  purpose: "",
  guests: "",
  message: "",
};

const PURPOSE_OPTIONS = [
  "Møte / kurs",
  "Bursdag / fest",
  "Speidermøte",
  "Overnatting",
  "Dugnad",
  "Annet",
];

export default function BookingForm({ startDate, endDate }: BookingFormProps) {
  const [form, setForm] = useState<FormData>(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!startDate || !endDate) {
      setError("Velg inn- og utsjekk-dato i kalenderen ovenfor.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          guests: Number(form.guests),
          start_date: format(startDate, "yyyy-MM-dd"),
          end_date: format(endDate, "yyyy-MM-dd"),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Noe gikk galt. Prøv igjen.");
      } else {
        setSuccess(true);
        setForm(initialForm);
      }
    } catch {
      setError("Kunne ikke sende bestilling. Sjekk nettverkstilkoblingen.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="text-xl font-bold text-green-800 mb-2">
          Forespørsel sendt!
        </h3>
        <p className="text-green-700">
          Takk for din bookingforespørsel! Vi behandler den og tar kontakt med
          deg snart for bekreftelse.
        </p>
        <button
          className="mt-6 bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
          onClick={() => setSuccess(false)}
        >
          Send ny forespørsel
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5"
    >
      <h3 className="text-lg font-bold text-gray-800">Bookingskjema</h3>

      {startDate && endDate && (
        <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-sm text-green-800">
          <strong>Valgt periode:</strong>{" "}
          {format(startDate, "d. MMMM yyyy", { locale: nb })} –{" "}
          {format(endDate, "d. MMMM yyyy", { locale: nb })}
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Navn *
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Ditt fulle navn"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            E-post *
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="din@epost.no"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Telefon *
          </label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="+47 123 45 678"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Organisasjon
          </label>
          <input
            type="text"
            name="organization"
            value={form.organization}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Valgfritt"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Formål *
          </label>
          <select
            name="purpose"
            value={form.purpose}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
          >
            <option value="">Velg formål</option>
            {PURPOSE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Antall gjester *
          </label>
          <input
            type="number"
            name="guests"
            value={form.guests}
            onChange={handleChange}
            required
            min={1}
            max={80}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Antall personer"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Melding / tilleggsinformasjon
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={3}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Evt. spesielle ønsker, behov, spørsmål…"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-700 text-white font-semibold py-3 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Sender…" : "Send bookingforespørsel"}
      </button>

      <p className="text-xs text-gray-500 text-center">
        Bookingen er ikke bekreftet før du mottar e-post fra oss.
      </p>
    </form>
  );
}
