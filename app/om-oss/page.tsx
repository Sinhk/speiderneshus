import Link from "next/link";
import { siteContent } from "@/lib/content";

const { about, facilities, capacity, contact } = siteContent;

export default function OmOssPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="text-5xl mb-4">🏡</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-3">Om Speidernes Hus</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {about.intro}
        </p>
      </div>

      {/* About */}
      <section className="bg-white border border-gray-100 rounded-2xl p-8 mb-8 shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Vår historie</h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          {about.historyParagraph1}
        </p>
        <p className="text-gray-600 leading-relaxed">
          {about.historyParagraph2}
        </p>
      </section>

      {/* Facilities */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Fasiliteter</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {facilities.map((f) => (
            <div
              key={f.title}
              className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm"
            >
              <div className="text-2xl mb-2">{f.icon}</div>
              <h3 className="font-semibold text-gray-800 mb-1">{f.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Capacity */}
      <section className="bg-green-50 border border-green-100 rounded-2xl p-8 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Kapasitet</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: String(capacity.theatreSeats), label: "Daggjester (teater)" },
            { value: String(capacity.classroomSeats), label: "Daggjester (klasserom)" },
            { value: String(capacity.sleepingPlaces), label: "Overnattingsplasser" },
            { value: String(capacity.parkingSpots), label: "Parkeringsplasser" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-bold text-green-700">{s.value}</div>
              <div className="text-sm text-gray-600 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Location */}
      <section className="bg-white border border-gray-100 rounded-2xl p-8 mb-8 shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Beliggenhet</h2>
        <div className="flex items-start gap-3 mb-4">
          <span className="text-2xl">📍</span>
          <div>
            <p className="font-medium text-gray-800">
              {contact.address}, {contact.postalCode} {contact.city}
            </p>
            <p className="text-gray-600 text-sm mt-1">
              {about.locationDescription}
            </p>
          </div>
        </div>
        <div className="bg-gray-100 rounded-xl h-48 flex items-center justify-center text-gray-500 text-sm">
          🗺️ Kart vises her (integrer Google Maps / OpenStreetMap)
        </div>
      </section>

      {/* CTA */}
      <div className="text-center">
        <Link
          href="/booking"
          className="inline-block bg-green-700 text-white font-bold px-8 py-3 rounded-xl hover:bg-green-600 transition-colors text-lg"
        >
          Book huset nå
        </Link>
        <p className="text-gray-500 text-sm mt-3">
          Spørsmål?{" "}
          <Link href="/kontakt" className="text-green-700 hover:underline">
            Ta kontakt med oss
          </Link>
        </p>
      </div>
    </div>
  );
}
