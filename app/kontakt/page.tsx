"use client";

import { useState } from "react";
import { siteContent } from "@/lib/content";

const { contact } = siteContent;

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const initialForm: FormData = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

export default function KontaktPage() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // In production, send to email service / API
    setSubmitted(true);
    setForm(initialForm);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <div className="text-5xl mb-4">✉️</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-3">Kontakt oss</h1>
        <p className="text-gray-600">
          Har du spørsmål om leie, priser eller fasiliteter? Ta gjerne kontakt!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact info */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h2 className="font-bold text-gray-800 mb-4">Kontaktinformasjon</h2>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-xl">📍</span>
                <div>
                  <div className="font-medium text-gray-700">Adresse</div>
                  <div className="text-gray-600">
                    {contact.address}<br />{contact.postalCode} {contact.city}
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">📞</span>
                <div>
                  <div className="font-medium text-gray-700">Telefon</div>
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                    className="text-green-700 hover:underline"
                  >
                    {contact.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">✉️</span>
                <div>
                  <div className="font-medium text-gray-700">E-post</div>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-green-700 hover:underline"
                  >
                    {contact.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">🕐</span>
                <div>
                  <div className="font-medium text-gray-700">
                    Åpningstider (henvendelser)
                  </div>
                  <div className="text-gray-600">
                    {contact.openingHours}
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-green-50 border border-green-100 rounded-2xl p-6">
            <h3 className="font-semibold text-gray-800 mb-2">
              Ønsker du å booke?
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Bruk bookingsystemet vårt for å sende forespørsel direkte, sjekke
              ledig tid, og se priser.
            </p>
            <a
              href="/booking"
              className="inline-block bg-green-700 text-white font-semibold px-5 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm"
            >
              Gå til booking →
            </a>
          </div>
        </div>

        {/* Contact form */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <h2 className="font-bold text-gray-800 mb-5">Send oss en melding</h2>

          {submitted ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-3">✅</div>
              <p className="text-green-700 font-medium">
                Takk! Vi tar kontakt med deg snart.
              </p>
              <button
                className="mt-4 text-sm text-gray-500 hover:underline"
                onClick={() => setSubmitted(false)}
              >
                Send ny melding
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
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
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefon
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Melding *
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-700 text-white font-semibold py-2.5 rounded-lg hover:bg-green-600 transition-colors"
              >
                Send melding
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
