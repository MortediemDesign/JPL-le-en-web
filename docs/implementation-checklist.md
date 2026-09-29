# Implementační plán a checklist

Stav k 29. 9. 2026. ✅ hotovo · ⚠️ hotovo, čeká na podklady/ověření klienta · ⬜ zbývá.

## Blokery před spuštěním (musí vyřešit klient / provoz)

| # | Úkol | Kdo |
|---|---|---|
| B1 | Potvrdit objem půjčovny **80 000 × 90 000 m²** a počet zaměstnanců (~40) – `src/data/company.ts` (`verify: true`) | klient |
| B2 | Spustit `npm run images:migrate` z prostředí s přístupem na současný web (stáhne ~45 fotografií + GDPR PDF) **před přepnutím DNS** | vývoj |
| B3 | Nastavit SMTP (`.env.example`) a potvrdit cílové e-maily poptávek pro každé středisko (`inquiryEmail` v `src/data/branches.ts`) | klient + provoz |
| B4 | Hosting s Node.js ≥ 20 (`npm run build && npm start`) za reverse proxy s HTTPS; `CANONICAL_HOST=www.jplleseni.cz`, `FORCE_HTTPS=1` | provoz |
| B5 | Rozhodnout o slovenské verzi (dočasně 301 na CZ ekvivalenty, viz url-inventory) | klient |
| B6 | Dodat aktuální obchodní podmínky prodeje (staré odstraněny – živnostník + zrušený obchodní zákoník) | klient |
| B7 | Ověřit adresní rozpory (KV č.p., sklady Plzeň/KV, SK e-mail) – `verifyNotes` v `branches.ts` | klient |

## Fáze a stav

### P0
- ✅ Funkční poptávkový formulář: všechna požadovaná pole (firma, kontaktní osoba, telefon, e-mail, typ služby, středisko, adresa realizace, termín, popis, příloha)
- ✅ Client-side i server-side validace se sdíleným schématem (`src/lib/inquiry.ts`)
- ✅ Přístupné labely, nápovědy, `aria-invalid`, `aria-describedby`, souhrn chyb s fokusem, `aria-live`
- ✅ Loading stav (disabled + spinner + `aria-busy`), potvrzovací stránka `/poptavka/odeslano`
- ✅ Antispam: honeypot `www`, časová past 3 s, rate-limit 5 platných poptávek / 10 min / IP, kontrola Origin (Astro `checkOrigin`), volitelně Cloudflare Turnstile
- ✅ Bezpečné přílohy: 1 soubor ≤ 10 MB, whitelist přípon, ověření **magic bytes**, sanitizace názvu, nic se neukládá na disk (jen příloha e-mailu), HTML e-mailu escapováno, ochrana proti header injection v předmětu/reply-to
- ✅ Funguje bez JavaScriptu (POST → 303)
- ✅ Odstranění zastaralého obsahu (aktuality 2016–2024, prázdné stránky, VOP, fax, „stránky ve výstavbě“, ceník)
- ✅ Sjednocení firemních údajů v `src/data/company.ts` a `branches.ts` (jediný zdroj pro celý web)
- ⚠️ Homepage – hotová, čeká na B1 a B2
- ✅ Pronájem lešení (`/pronajem-leseni`, URL zachována)
- ✅ Mobilní použitelnost – testováno 320–1440 px, mobilní lišta Zavolat/Poptat

### P1
- ✅ Navigace dle zadání + CTA „Poptat lešení“, přístupné mobilní menu (Esc, focus trap, návrat fokusu)
- ✅ Reference – přehled s filtrem, detaily s galerií a lightboxem (`<dialog>`), jen ověřené údaje
- ⚠️ 5 referencí nemá rok/zadavatele/objem – `todo` v `references.ts`
- ✅ O společnosti – časová osa, hodnoty, vedení, firemní údaje
- ⚠️ Fotografie týmu a vybavení – připravený prostor (TODO box)
- ✅ Střediska – přehled + 5 detailů, mapy načítané až po kliknutí, LocalBusiness JSON-LD
- ✅ SEO – unikátní title/description, 1× H1, canonical, OG, Twitter, JSON-LD (Organization, LocalBusiness, Service, BreadcrumbList, FAQPage), sitemap, robots, 301 redirecty, 404

### P2
- ✅ FAQ na homepage a stránkách služeb/typů (jen ověřené odpovědi)
- ⬜ Případové studie – vyžadují podklady od techniků (zadání → řešení → výsledek)
- ⬜ Obsahová strategie – viz `docs/seo-audit.md` §6
- ✅ Technická optimalizace: 0 KB JS na většině stránek kromě malých skriptů (menu, formulář), systémové fonty, `srcset` + lazy loading, LCP obrázek `eager` + `fetchpriority=high` + preload, rezervace poměru stran (CLS)
- ⬜ Po migraci fotografií změřit Lighthouse/CWV na produkci
- ⬜ Technické listy PERI/HAKI (třídy zatížení) – `specs` v `scaffoldTypes.ts`
- ⬜ Originální logo ve vektoru (nyní SVG wordmark)
- ⬜ Analytika (Matomo bez cookies jako dosud / GA4) – cíl konverze = zobrazení `/poptavka/odeslano`

## Testování (výsledky posledního běhu)

| Kontrola | Příkaz | Výsledek |
|---|---|---|
| Build | `npm run build` | ✅ 36 stránek + SSR routy, redirect konfigurace |
| Lint + typy | `npm run lint` (ESLint + `astro check`) | ✅ 0 chyb, 0 varování |
| Unit testy | `npm test` | ✅ 19/19 |
| Odkazy | `npm run check:links` | ✅ všechny interní odkazy a kotvy |
| E2E | `npm run test:e2e` | ✅ 108/108 |

E2E pokrývá: 11 klíčových stránek × 7 šířek (HTTP 200, bez horizontálního overflow, viditelné H1 a CTA),
menu na mobilu i desktopu, formulář (validace, blur, souhrn chyb, úspěch, loading, příloha, předvyplnění z URL,
odeslání bez JS), axe WCAG 2.2 AA na 11 stránkách, SEO všech stránek ze sitemap, konzole prohlížeče bez chyb,
HTTP 404, 301 redirecty, skip link, LCP obrázek.

Pozn.: ve vývojovém prostředí je doména `www.jplleseni.cz` nedostupná, fotografie z CMS jsou v testech
blokované (zobrazí se náhradní pozadí). Po B2 se načítají lokálně.

## Hosting bez Node.js (alternativa)

Statické stránky z `dist/client` lze nasadit na jakýkoli hosting; redirecty jsou vygenerované
v `dist/client/.htaccess`, `dist/client/_redirects` a `dist/nginx-redirects.conf`.
Endpoint `/api/poptavka` a SSR stránka `/poptavka` ale Node vyžadují – bez něj by bylo nutné
endpoint přepsat (např. do PHP) se stejnou validací a stránku `/poptavka` prerenderovat.
