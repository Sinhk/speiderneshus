"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-green-800 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <span className="text-2xl">⚜️</span>
          <div>
            <div className="font-bold text-xl leading-tight">Speidernes Hus</div>
            <div className="text-green-300 text-sm leading-tight">Molde</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-green-300 transition-colors">
            Hjem
          </Link>
          <Link href="/om-oss" className="hover:text-green-300 transition-colors">
            Om huset
          </Link>
          <Link href="/booking" className="hover:text-green-300 transition-colors">
            Booking
          </Link>
          <Link href="/kontakt" className="hover:text-green-300 transition-colors">
            Kontakt
          </Link>
          <Link
            href="/booking"
            className="bg-yellow-500 text-green-900 font-bold px-4 py-2 rounded-lg hover:bg-yellow-400 transition-colors"
          >
            Book nå
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-green-700 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Åpne meny"
        >
          <div className="w-6 h-0.5 bg-white mb-1.5"></div>
          <div className="w-6 h-0.5 bg-white mb-1.5"></div>
          <div className="w-6 h-0.5 bg-white"></div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-green-700 bg-green-800 px-4 py-4 flex flex-col gap-4">
          <Link
            href="/"
            className="hover:text-green-300 transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Hjem
          </Link>
          <Link
            href="/om-oss"
            className="hover:text-green-300 transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Om huset
          </Link>
          <Link
            href="/booking"
            className="hover:text-green-300 transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Booking
          </Link>
          <Link
            href="/kontakt"
            className="hover:text-green-300 transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Kontakt
          </Link>
          <Link
            href="/booking"
            className="bg-yellow-500 text-green-900 font-bold px-4 py-2 rounded-lg hover:bg-yellow-400 transition-colors text-center"
            onClick={() => setMenuOpen(false)}
          >
            Book nå
          </Link>
        </div>
      )}
    </header>
  );
}
