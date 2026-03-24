# Speidernes Hus – Molde

Nettside for Speidernes Hus i Molde med integrert bookingsystem.

## Funksjoner

- 🏡 Informasjonsside om huset (fasiliteter, kapasitet, beliggenhet)
- 📅 Bookingkalender som viser ledige og opptatte datoer
- 📝 Bookingskjema for å sende leieforespørsler
- 🔐 Adminpanel for å behandle og godkjenne bookinger
- 📱 Responsivt design for mobil og desktop

## Teknologi

- [Next.js 16](https://nextjs.org/) – React-rammeverk
- [Tailwind CSS 4](https://tailwindcss.com/) – Styling
- [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) – Lokal SQLite-database
- [date-fns](https://date-fns.org/) – Datomanipulering

## Kom i gang

### Krav

- Node.js 18+
- npm

### Installasjon

```bash
npm install
```

### Konfigurasjon

Opprett en `.env.local`-fil basert på `.env.example`:

```bash
cp .env.example .env.local
```

Endre `ADMIN_PASSWORD` til et sikkert passord.

### Kjøre lokalt

```bash
npm run dev
```

Åpne [http://localhost:3000](http://localhost:3000) i nettleseren.

### Bygge for produksjon

```bash
npm run build
npm run start
```

## Sider

| Side | URL | Beskrivelse |
|------|-----|-------------|
| Hjem | `/` | Forside med info og priser |
| Om huset | `/om-oss` | Detaljert info om fasiliteter |
| Booking | `/booking` | Kalender og bookingskjema |
| Kontakt | `/kontakt` | Kontaktinformasjon og skjema |
| Admin | `/admin` | Administrer bookinger (passordbeskyttet) |

## Adminpanel

Gå til `/admin` og logg inn med passordet satt i `ADMIN_PASSWORD`-miljøvariabelen (standard: `admin123`).

I adminpanelet kan du:
- Se alle innkomne bookingforespørsler
- Godkjenne eller avvise forespørsler
- Slette bookinger

Godkjente bookinger vises automatisk som opptatte datoer i den offentlige kalenderen.

## Innholdskonfigurasjon

All tekst, kontaktinformasjon, priser og fasilitetsbeskrivelser er samlet i **`lib/content.ts`**. Oppdater verdiene der for å endre innholdet på hele nettstedet.

## Migrering fra Wix

For å hente innhold fra det eksisterende Wix-nettstedet og overføre det til `lib/content.ts`:

```bash
node scripts/fetch-wix-content.mjs
```

Scriptet skriver ut JSON med alle tekster, kontaktdetaljer og overskrifter hentet fra Wix-siden. Kopier de relevante verdiene inn i `lib/content.ts`.

> **Merk:** Scriptet krever internettilgang til `speiderneshus.wixsite.com`. Kjør det lokalt på maskinen din.



Appen kan utplasseres på [Vercel](https://vercel.com/), [Railway](https://railway.app/), eller en egen server. Husk å sette `ADMIN_PASSWORD`-miljøvariabelen i produksjonsmiljøet.
