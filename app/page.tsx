import Link from "next/link";
import { siteContent } from "@/lib/content";

const { highlights, pricing, pricingNote, siteDescription, siteTagline } = siteContent;

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-800 to-green-600 text-white">
        <div className="max-w-6xl mx-auto px-4 py-20 text-center">
          <div className="text-6xl mb-4">⚜️</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {siteContent.siteName}
          </h1>
          <p className="text-xl md:text-2xl text-green-200 mb-3">
            {siteTagline}
          </p>
          <p className="text-lg text-green-100 max-w-2xl mx-auto mb-8">
            {siteDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="bg-yellow-500 text-green-900 font-bold px-8 py-3 rounded-xl hover:bg-yellow-400 transition-colors text-lg"
            >
              Book nå
            </Link>
            <Link
              href="/om-oss"
              className="bg-white/20 text-white font-semibold px-8 py-3 rounded-xl hover:bg-white/30 transition-colors text-lg border border-white/30"
            >
              Les mer om huset
            </Link>
          </div>
        </div>
      </section>

      {/* Key highlights */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-10">
          Hvorfor leie Speidernes Hus?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-10">
            Priser
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {pricing.map((plan) => (
              <div
                key={plan.name}
                className={`bg-white rounded-2xl p-6 border-2 ${plan.highlight ? "border-yellow-400 shadow-lg scale-105" : "border-green-200 shadow-sm"}`}
              >
                {plan.highlight && (
                  <div className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">
                    Populær
                  </div>
                )}
                <h3 className="font-bold text-gray-800 text-lg mb-1">{plan.name}</h3>
                <div className="text-3xl font-bold text-green-700 mb-1">
                  {plan.price} kr
                </div>
                <div className="text-gray-500 text-sm mb-4">{plan.unit}</div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="text-green-500">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/booking"
                  className="block text-center bg-green-700 text-white font-semibold py-2.5 rounded-lg hover:bg-green-600 transition-colors text-sm"
                >
                  Book nå
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 text-sm mt-6">
            {pricingNote}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-green-800 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Klar til å booke?</h2>
          <p className="text-green-200 mb-8 text-lg">
            Sjekk tilgjengelighet og send en bookingforespørsel direkte. Vi
            svarer innen 24 timer.
          </p>
          <Link
            href="/booking"
            className="bg-yellow-500 text-green-900 font-bold px-10 py-4 rounded-xl hover:bg-yellow-400 transition-colors text-lg inline-block"
          >
            Se kalender og book →
          </Link>
        </div>
      </section>
    </div>
  );
}
