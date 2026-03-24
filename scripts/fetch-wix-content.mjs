#!/usr/bin/env node
/**
 * fetch-wix-content.mjs
 *
 * Scrapes the Wix site at https://speiderneshus.wixsite.com/speiderneshus
 * and prints a ready-to-paste update for lib/content.ts.
 *
 * Run from the project root:
 *   node scripts/fetch-wix-content.mjs
 *
 * Requirements: Node 18+ (built-in fetch) or Node 16 with node-fetch installed.
 * If you get a "fetch is not defined" error on Node 16 run:
 *   npm install node-fetch
 * and add:  import fetch from 'node-fetch';  at the top of this file.
 */

const WIX_BASE = "https://speiderneshus.wixsite.com/speiderneshus";

const PAGES = {
  home:    WIX_BASE,
  omOss:   `${WIX_BASE}/om-oss`,
  kontakt: `${WIX_BASE}/kontakt`,
};

const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
    "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Accept-Language": "no,nb;q=0.9,en;q=0.8",
};

/** Fetch a page and return its text, following redirects. */
async function fetchPage(url) {
  const res = await fetch(url, { headers: HEADERS, redirect: "follow" });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

/** Extract ALL matches for a tag, returning an array of cleaned strings. */
function getAllText(html, tag) {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "gi");
  const results = [];
  let m;
  while ((m = re.exec(html)) !== null) {
    const text = m[1]
      .replace(/<[^>]+>/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&nbsp;/g, " ")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/\s+/g, " ")
      .trim();
    if (text.length > 3) results.push(text);
  }
  return results;
}

/** Try to find a Norwegian phone number in arbitrary HTML. */
function findPhone(html) {
  // Prefer tel: href links first, then look for Norwegian mobile/landline patterns
  const fromHref = html.match(/href="tel:(\+?[\d\s\-()]{7,20})"/i);
  if (fromHref) return fromHref[1].replace(/['"]/g, "").trim();
  // Norwegian numbers: +47 followed by 8 digits (with optional spaces/dashes)
  const inline = html.match(/\+47[\s\-]?\d{2}[\s\-]?\d{2}[\s\-]?\d{2}[\s\-]?\d{2}/);
  return inline ? inline[0].trim() : null;
}

/** Try to find an email address in arbitrary HTML. */
function findEmail(html) {
  const m = html.match(/href="mailto:([^"@]+@[^"]+)"/i)
    || html.match(/\b([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})\b/);
  return m ? m[1].trim() : null;
}

/** Try to find a Norwegian street address in arbitrary HTML.
 *  Looks for patterns like "Gateveien 12" or "Gateveien 12, 6413 Molde".
 *  Note: this heuristic covers common formats but may miss PO boxes or
 *  multi-line addresses — always verify the extracted value.
 */
function findAddress(html) {
  // Look for something like "Gateveien 12, 6413 Molde"
  const m = html.match(/([A-ZÆØÅa-zæøå][a-zæøå\s]+\d+[A-Za-z]?(?:,\s*\d{4}\s+[A-ZÆØÅa-zæøå][a-zæøå\s]+)?)/);
  return m ? m[1].trim() : null;
}

async function main() {
  console.error("Fetching Wix pages…");

  let homeHtml = "", omOssHtml = "", kontaktHtml = "";

  try {
    homeHtml    = await fetchPage(PAGES.home);
    console.error("✓ home");
  } catch (e) { console.error(`✗ home: ${e.message}`); }

  try {
    omOssHtml   = await fetchPage(PAGES.omOss);
    console.error("✓ om-oss");
  } catch (e) { console.error(`✗ om-oss: ${e.message}`); }

  try {
    kontaktHtml = await fetchPage(PAGES.kontakt);
    console.error("✓ kontakt");
  } catch (e) { console.error(`✗ kontakt: ${e.message}`); }

  const allHtml = homeHtml + omOssHtml + kontaktHtml;

  // ── Extract contact details ───────────────────────────────────────────────
  const phone   = findPhone(allHtml)   || "+47 123 45 678";
  const email   = findEmail(allHtml)   || "kontakt@speiderneshus.no";
  const address = findAddress(allHtml) || "Eksempelveien 1";

  // ── Extract page headings and paragraphs ─────────────────────────────────
  const homeH1s  = getAllText(homeHtml,  "h1");
  const homePs   = getAllText(homeHtml,  "p");
  const omH2s    = getAllText(omOssHtml, "h2");
  const omPs     = getAllText(omOssHtml, "p");

  const siteName    = homeH1s[0]  || "Speidernes Hus";
  const siteDesc    = homePs[0]   || "Lei vårt hyggelige hus til ditt neste arrangement.";
  const historyP1   = omPs[0]     || "";
  const historyP2   = omPs[1]     || "";

  // ── Print results ─────────────────────────────────────────────────────────
  console.error("\n──────────────────────────────────────────────────────");
  console.error("Paste the values below into lib/content.ts");
  console.error("──────────────────────────────────────────────────────\n");

  const output = {
    siteName,
    siteDescription: siteDesc,
    contact: { phone, email, address },
    about: {
      historyParagraph1: historyP1,
      historyParagraph2: historyP2,
    },
    rawHeadings: {
      home:  homeH1s.slice(0, 5),
      omOss: omH2s.slice(0, 8),
    },
    rawParagraphs: {
      home:  homePs.slice(0, 10),
      omOss: omPs.slice(0, 10),
    },
  };

  console.log(JSON.stringify(output, null, 2));
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
