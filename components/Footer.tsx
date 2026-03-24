import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-green-900 text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
            <span>⚜️</span> Speidernes Hus
          </h3>
          <p className="text-green-300 text-sm leading-relaxed">
            Et hyggelig og godt utstyrt hus for leie til arrangementer, samlinger og kurs.
            Midt i Molde, med utsikt over fjorden.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-3">Kontakt</h3>
          <ul className="text-green-300 text-sm space-y-2">
            <li>📍 Eksempelveien 1, 6413 Molde</li>
            <li>
              📞{" "}
              <a href="tel:+4712345678" className="hover:text-white transition-colors">
                +47 123 45 678
              </a>
            </li>
            <li>
              ✉️{" "}
              <a
                href="mailto:kontakt@speiderneshus.no"
                className="hover:text-white transition-colors"
              >
                kontakt@speiderneshus.no
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
        © {new Date().getFullYear()} Speidernes Hus Molde. Alle rettigheter reservert.
      </div>
    </footer>
  );
}
