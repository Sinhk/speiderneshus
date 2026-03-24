/**
 * Centralized site content for Speidernes Hus, Molde.
 *
 * All user-visible text, contact details, prices, and facility descriptions
 * live here so the entire site can be updated in one place.
 *
 * To populate this file with real data from the Wix site, run:
 *   node scripts/fetch-wix-content.mjs
 * and paste the printed output over the values below.
 */

export const siteContent = {
  // ─── General ─────────────────────────────────────────────────────────────
  siteName: "Speidernes Hus",
  siteTagline: "Molde, Møre og Romsdal",
  siteDescription:
    "Lei vårt hyggelige hus til ditt neste arrangement — møter, kurs, bursdager, overnatting og mye mer.",
  footerDescription:
    "Et hyggelig og godt utstyrt hus for leie til arrangementer, samlinger og kurs. Midt i Molde, med utsikt over fjorden.",

  // ─── Contact ─────────────────────────────────────────────────────────────
  // TODO: Replace the placeholder values below with the real contact details
  // from the Wix site. Run `node scripts/fetch-wix-content.mjs` to extract them.
  contact: {
    address: "Eksempelveien 1",
    postalCode: "6413",
    city: "Molde",
    phone: "+47 123 45 678",
    email: "kontakt@speiderneshus.no",
    /** Opening hours for enquiries (not the house itself) */
    openingHours: "Mandag–fredag: 09:00–17:00",
  },

  // ─── About / history ─────────────────────────────────────────────────────
  about: {
    intro:
      "Et allsidig og moderne hus i hjertet av Molde — perfekt for alt fra speidermøter til bedriftskurs og familieselskaper.",
    historyParagraph1:
      "Speidernes Hus i Molde har vært base for speideraktiviteter i regionen i over 50 år. Huset ble etablert av lokale speidertropper og har gjennom årene blitt modernisert og utvidet for å møte behovene til et bredt spekter av brukere.",
    historyParagraph2:
      "I dag er huset et populært utleieobjekt for lag, foreninger, bedrifter og privatpersoner — alt mens det fortsatt er hjem for speiderne i Molde. Inntektene fra utleie går direkte tilbake til speideraktivitetene i nærområdet.",
    locationDescription:
      "Sentralt plassert i Molde, med kort vei til rutebilstasjonen og Molde sentrum. Buss nr. 1 og 3 stopper rett utenfor.",
  },

  // ─── Capacity ────────────────────────────────────────────────────────────
  capacity: {
    theatreSeats: 80,
    classroomSeats: 50,
    sleepingPlaces: 30,
    parkingSpots: 20,
  },

  // ─── Facilities ──────────────────────────────────────────────────────────
  facilities: [
    {
      icon: "🏛️",
      title: "Møtesal",
      desc: "Stor sal med plass til 80 personer (teater) eller 50 (klasserom). Projektor, lerret og lydanlegg inkludert.",
    },
    {
      icon: "🍳",
      title: "Storkjøkken",
      desc: "Fullt utstyrt kjøkken med komfyr, stekeovn, oppvaskmaskin, og kapasitet for stormatlag.",
    },
    {
      icon: "🛏️",
      title: "Overnatting",
      desc: "Soverom og sovedorm for opp til 30 personer. Sengeklær og håndklær utleies.",
    },
    {
      icon: "🚿",
      title: "Dusj og bad",
      desc: "Separate garderober med dusjer og toaletter for menn og kvinner.",
    },
    {
      icon: "🌿",
      title: "Uteområde",
      desc: "Stor tomt med sittegrupper, grill og plass for lek og aktiviteter utendørs.",
    },
    {
      icon: "🚗",
      title: "Parkering",
      desc: "Gratis parkering for opp til 20 biler rett utenfor huset.",
    },
    {
      icon: "♿",
      title: "Universell utforming",
      desc: "Tilrettelagt for bevegelseshemmede med rullestolrampe, bred dør og tilpasset toalett.",
    },
    {
      icon: "📶",
      title: "Wi-Fi",
      desc: "Høyhastighets trådløst internett i alle rom, gratis for leietakere.",
    },
  ],

  // ─── Highlights (home page cards) ────────────────────────────────────────
  highlights: [
    {
      icon: "🏡",
      title: "Hyggelige lokaler",
      desc: "Stor møtesal, fullt utstyrt kjøkken, og overnatting for opp til 30 personer.",
    },
    {
      icon: "📍",
      title: "Sentral beliggenhet",
      desc: "Midt i Molde sentrum, med gode parkeringsmuligheter og enkel tilgang med kollektivtransport.",
    },
    {
      icon: "💰",
      title: "Rimelige priser",
      desc: "Konkurransedyktige leiepriser for lag, foreninger, bedrifter og privatpersoner.",
    },
    {
      icon: "🍳",
      title: "Fullt utstyrt kjøkken",
      desc: "Profesjonelt kjøkken med komfyr, ovn, kjøleskap, og alt utstyr for matservering.",
    },
    {
      icon: "🛏️",
      title: "Overnatting",
      desc: "Soverom og sovesaler for opp til 30 personer med sengeklær inkludert.",
    },
    {
      icon: "♿",
      title: "Tilgjengelig for alle",
      desc: "Universell utforming med rullestolrampe og tilpassede toaletter.",
    },
  ],

  // ─── Pricing ─────────────────────────────────────────────────────────────
  pricing: [
    {
      name: "Dagleie",
      price: "1 500",
      unit: "per dag",
      features: ["Møtesal", "Kjøkken", "Toaletter"],
      highlight: false,
    },
    {
      name: "Helgeleie",
      price: "3 500",
      unit: "fredag–søndag",
      features: ["Møtesal", "Kjøkken", "Toaletter", "Overnatting inkl."],
      highlight: true,
    },
    {
      name: "Ukeleie",
      price: "8 000",
      unit: "per uke",
      features: [
        "Møtesal",
        "Kjøkken",
        "Toaletter",
        "Overnatting inkl.",
        "Rabatt",
      ],
      highlight: false,
    },
  ],
  pricingNote:
    "Alle priser er inkl. mva. Ta kontakt for tilpassede priser til organisasjoner og lengre leieperioder.",
} as const;
