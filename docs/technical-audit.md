# Technický audit

Datum: 29. 9. 2026 · Rozsah: www.jplleseni.cz (živý web) + tento repozitář

## 1. Výchozí stav repozitáře

- Repozitář `JPL-le-en-web` byl **prázdný** (žádný commit, žádné soubory).
  Neexistuje tedy zdrojový kód současného webu, který by bylo možné upravit – současný
  web běží na hostovaném SaaS CMS **Antee IPO** a jeho kód není k dispozici.
- Audit proto vychází z veřejně dostupného HTML živého webu. Přímý přístup z vývojového
  prostředí na `www.jplleseni.cz` blokuje síťová politika prostředí; obsah byl stažen
  přes scrapovací službu (Firecrawl). Detail `/reference/prazsky-hrad` se opakovaně
  nepodařilo načíst (timeout) – data této reference jsou proto neúplná (TODO).

## 2. Současná technologie (živý web)

| Oblast | Zjištění |
|---|---|
| CMS | Antee IPO (hostovaný), `author: Antee s.r.o.` |
| Routing | Serverový CMS routing, „hezké“ URL + `index.php?oid=…` pro SK verzi |
| Frontend | jQuery 3.0.0 + jQuery Migrate 3.1 + jQuery UI + touch-punch + `libs.min.js` + `ipo.min.js` – vše blokující v `<head>` |
| CSS | `style.php` (generované), `libs.css`, Google Fonts Roboto + Roboto Condensed (blokující) |
| Obrázky | `image.php?oid=…&width=…` – dynamický resize, bez `srcset`, bez WebP/AVIF, bez `width/height` atributů, bez `loading="lazy"` |
| Analytika | Matomo (`matomo.antee.cz`, siteId 3598, bez cookies), cíle na klik `mailto:` |
| Anti-spam | Google reCAPTCHA v2 (načítána na **každé** stránce, i bez formuláře) + honeypot `www` |
| Mapy | Google Maps embed na stránkách středisek |
| Verifikace | `google-site-verification: gEjqgfjalex7BcnHKSs41O5mam_ISQUottc5oJizZc4` (přeneseno) |

### Výkonnostní rizika současného webu
- 6 synchronních skriptů v `<head>` + reCAPTCHA na každé stránce → pomalé FCP/LCP, horší INP.
- Hero obrázek je CSS pozadí z `style.php` → prohlížeč jej objeví pozdě (LCP).
- Duplicitní `<meta name="viewport">`.
- Obrázky bez rozměrů → CLS v galeriích referencí.

## 3. Formulář – současné zpracování

Formulář je na `/kontakty` a na každé stránce střediska.

```
<form action="/kontakty?do=form-submit" method="post" enctype="multipart/form-data">
  input0  Firma                      povinné
  input1  Kontaktní osoba
  input2  Telefon
  email   Email                      povinné
  input4  Poptávka pro středisko     select: 0 --, 1 Praha, 2 Plzeň, 3 Karlovy Vary, 4 Olomouc, 5 Slovensko
  input5  Úplná adresa místa akce    povinné
  input6  Detailní popis             povinné (textarea)
  input7  Příloha                    file (1 soubor, bez omezení typu v HTML)
  (checkbox souhlasu se zpracováním os. údajů – povinné)
  g-recaptcha-response
  www     honeypot – musí zůstat prázdné
```

Zjištění:
- Endpoint je součást CMS (Nette `?do=form-submit`, CSRF/stav vázaný na CMS) –
  **po odchodu z Antee IPO nebude existovat**. Kompatibilitu „zachovat backend“ nelze
  splnit bez ponechání CMS. Proto nový web má vlastní endpoint `POST /api/poptavka`.
- Na stránkách Plzeň a Karlovy Vary se zobrazuje select **bez Olomouce** (jiná verze formuláře)
  → nekonzistentní data pro obchod.
- Není pole „typ služby“ ani „termín“ → obchodník musí doptávat.
- Kam CMS posílá e-maily, není z HTML zjistitelné (TODO klient: cílové adresy pro každé středisko).

### Nové řešení (implementováno)
- `src/lib/inquiry.ts` – jedno schéma a validace sdílené klientem i serverem.
- `src/pages/api/poptavka.ts` – server-side validace, honeypot `www` (zachován název),
  časová past (min. 3 s od načtení), rate-limit na IP, volitelně Cloudflare Turnstile
  (konfigurace přes env), kontrola přílohy (velikost, přípona, **magic bytes**),
  e-mail přes SMTP (nodemailer) na adresu střediska, fallback `info@`.
- Progressive enhancement: funguje i bez JavaScriptu (klasický POST → 303 na `/poptavka/odeslano`).
- Mapování starých polí na nová je v `src/lib/inquiry.ts` (hlavička souboru).

## 4. Nový stack

| Oblast | Volba | Důvod |
|---|---|---|
| Framework | Astro 7 (statické stránky + 1 serverový endpoint) | Nulový JS by default, výborné pro SEO a Core Web Vitals |
| Server | `@astrojs/node` (standalone handler) + `server.mjs` | Skutečné 301 redirecty, bezpečnostní hlavičky, endpoint formuláře |
| Styl | Vlastní CSS s design tokeny (`src/styles/`) | Žádná závislost na UI knihovně, malé CSS |
| Typy | TypeScript strict | |
| Testy | Vitest (validace, endpoint), Playwright (responzivita 320–1440, formulář, konzole), axe-core (WCAG) | |
| Lint | ESLint + `astro check` | |
| Obsah | Typovaná data v `src/data/*.ts` | Fakta na jednom místě, TODO značky `verify: true` |

Adresářová struktura:
```
src/
  components/   UI komponenty (Header, Footer, InquiryForm, ReferenceCard…)
  data/         company.ts, branches.ts, services.ts, scaffoldTypes.ts, references.ts, faq.ts, redirects.ts
  layouts/      BaseLayout.astro (SEO head, JSON-LD), PageLayout.astro
  lib/          inquiry.ts (validace), mailer.ts, rateLimit.ts, fileType.ts, seo.ts
  pages/        routy
  styles/       tokens.css, global.css
server.mjs      produkční server (redirecty + hlavičky + Astro handler)
scripts/        migrate-images.mjs, generate-redirects.mjs, check-links.mjs
tests/          unit + e2e
```

## 5. Provozní požadavky (TODO před spuštěním)

- Node.js ≥ 20 na hostingu (nebo kontejner). Alternativa pro PHP hosting: sestavit statiku
  a endpoint nahradit – viz `docs/implementation-checklist.md`, sekce „Hosting“.
- Proměnné prostředí: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM`,
  `INQUIRY_TO_DEFAULT`, volitelně `TURNSTILE_SECRET` + `PUBLIC_TURNSTILE_SITEKEY`.
- HTTPS a přesměrování `jplleseni.cz` → `www.jplleseni.cz` a `http` → `https` na úrovni
  hostingu/reverse proxy (v `server.mjs` je pojistka přes `X-Forwarded-Proto`).
- Migrace fotografií (`npm run images:migrate`) – **před** přepnutím DNS.
