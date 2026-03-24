import Link from "next/link";
import { siteContent } from "@/lib/content";

const { contact, siteName, footerDescription } = siteContent;

export default function Footer() {
  return (
    <footer className="bg-green-900 text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
            <span>⚜️</span> {siteName}
          </h3>
          <p className="text-green-300 text-sm leading-relaxed">
            {footerDescription}
          </p>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-3">Kontakt</h3>
          <ul className="text-green-300 text-sm space-y-2">
            <li>📍 {contact.address}, {contact.postalCode} {contact.city}</li>
            <li>
              📞{" "}
              <a
                href={`tel:${contact.phone.replace(/\s/g, "")}`}
                className="hover:text-white transition-colors"
              >
                {contact.phone}
              </a>
            </li>
            <li>
              ✉️{" "}
              <a
                href={`mailto:${contact.email}`}
                className="hover:text-white transition-colors"
              >
                {contact.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-3">Snarlenker</h3>
          <ul className="text-green-300 text-sm space-y-2">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Hjem
              </Link>
            </li>
            <li>
              <Link href="/om-oss" className="hover:text-white transition-colors">
                Om huset
              </Link>
            </li>
            <li>
              <Link href="/booking" className="hover:text-white transition-colors">
                Booking
              </Link>
            </li>
            <li>
              <Link href="/kontakt" className="hover:text-white transition-colors">
                Kontakt oss
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-green-800 py-4 text-center text-green-400 text-xs">
        © {new Date().getFullYear()} {siteName} {contact.city}. Alle rettigheter reservert.
      </div>
    </footer>
  );
}

