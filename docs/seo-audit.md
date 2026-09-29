# SEO audit

## 1. Současný stav metadat

| URL | Title | Meta description | H1 | Problém |
|---|---|---|---|---|
| `/` | Pronájem a prodej lešení \| J.P.L. Lešení | …80.000 m² lešení k pronájmu. | Montáž a pronájem kompletních systémů lešení | Description uvádí 80 000 m², obsah 90 000 m² |
| `/pronajem-leseni` | Pronájem lešení \| J.P.L. Lešení | …80.000 m². | Pronájem lešení | OK, tenký obsah |
| `/haki-leseni` | Pronájem HAKI lešení \| … | vlastní | Haki lešení | OK |
| `/trubkove-leseni` | Pronájem trubkového lešení \| … | vlastní | Trubkové lešení | Velmi tenký obsah (2 věty) |
| `/peri-leseni` | Pronájem PERI lešení \| … | vlastní (chybí tečka) | Peri lešení | OK |
| `/leseni` | Lešení \| … | vlastní | Lešení | Rozcestník bez obsahu |
| `/prodej-leseni` | Prodej lešení \| … | **duplicitní** (výchozí) | Prodej lešení | Zastaralé VOP |
| `/prodej-haki-leseni` | Prodej HAKI lešení | duplicitní | Haki lešení | **Duplicitní H1** s `/haki-leseni`, „ve výstavbě“ |
| `/trubkove-leseni-prodej` | Prodej trubkového lešení | duplicitní | Trubkové lešení | **Duplicitní H1**, jen PDF |
| `/prislusenstvi-k-leseni`, `/bazar-leseni` | … | duplicitní | … | **Prázdné stránky (thin content)** |
| `/reference/*` | Název \| J.P.L. LEŠENÍ s.r.o. | u 5 referencí generický text | Název (často VERZÁLKAMI) | `og:image` přes `http://` |
| `/o-nas` | O nás \| … | vlastní | O nás | H2 je dlouhá věta |
| `/stredisko-olomouc` | **Středisko Olomouc** (bez brandu) | duplicitní výchozí | Středisko Olomouc | |
| `/dotacni-program-up-a-eu`, `/mapa-stranek` | … | duplicitní | | |

Souhrn:
- Výchozí meta description („…80.000 m²“) sdílí nejméně 8 stránek → **duplicitní description**.
- Nekonzistentní brand v title: „J.P.L. Lešení“ / „J.P.L. LEŠENÍ“ / „J.P.L. LEŠENÍ s.r.o.“.
- **Chybí** canonical, Open Graph (kromě `og:image` u referencí), Twitter karty, `hreflang` pro CZ/SK.
- **Chybí** strukturovaná data (žádné JSON-LD).
- Nadpisy: `h4`/`h5` použité pro skrytá menu před `h1`, `h5` pro kontakty na homepage.
- Alt texty: loga OK, fotografie v referencích Sepekovský most, MAJ, Hlavní nádraží, Chlum mají **prázdný alt**.
- Menu „Lešení“ `href="#"` – odkaz bez cíle.

## 2. Technické SEO

| Oblast | Stav | Řešení |
|---|---|---|
| robots.txt | OK, `Crawl-delay: 5` (Google ignoruje), CMS pravidla | Nový `robots.txt`: allow all, disallow `/api/`, `/poptavka/odeslano`, sitemap |
| sitemap.xml | Obsahuje prázdné stránky, SK stránky i `index.php?oid=` | Generovaná `@astrojs/sitemap`, jen indexovatelné stránky, bez noindex |
| 404 | CMS 404 (neověřeno) | Vlastní `/404` s navigací a CTA, HTTP 404 |
| Přesměrování | Nezjištěno | 301 mapa z `src/data/redirects.ts` (viz url-inventory) |
| HTTPS | Web běží na HTTPS; `og:image` odkazují na `http://` | Absolutní `https://` URL, HSTS hlavička v `server.mjs` |
| Duplicitní URL | SK verze na stejné doméně bez hreflang; `?tagsRenderer-tag=` filtry referencí | Canonical na každé stránce, trailing slash sjednocen (bez lomítka), filtry zrušeny |
| www/non-www | Neověřeno | TODO hosting: 301 `jplleseni.cz` → `www.jplleseni.cz` |
| Structured data | Žádná | Organization, LocalBusiness (×5 středisek), Service, BreadcrumbList, FAQPage |

## 3. Nová metadata (implementováno)

Každá indexovatelná stránka má v `src/data` nebo frontmatteru: unikátní `title` (≤ 60 znaků),
`description` (120–160 znaků), přesně jeden `h1`, canonical, `og:title/description/url/image/locale`,
`twitter:card`. Kontrolováno testem `tests/e2e/seo.spec.ts` (unikátnost title/description, 1× h1, canonical).

Brand v title sjednocen: `… | J.P.L. LEŠENÍ`.

## 4. Strukturovaná data

- **Organization** (sitewide): název, IČ, DIČ, adresa sídla, logo, e-mail, telefon, `foundingDate: 1997`, `areaServed: CZ, SK`, `sameAs: Facebook`.
- **LocalBusiness** (`HomeAndConstructionBusiness`) pro každé středisko: adresa, telefon, e-mail, `parentOrganization`.
  Geo souřadnice nejsou uvedeny (neověřené) – TODO.
- **Service** na stránkách služeb (`provider`, `areaServed`, `serviceType`).
- **BreadcrumbList** na všech podstránkách.
- **FAQPage** tam, kde je FAQ.
- **Žádné** `AggregateRating`/`Review` – firma nemá ověřené recenze.

## 5. Klíčová slova a mapování (návrh)

| Stránka | Primární dotaz | Sekundární |
|---|---|---|
| `/` | lešení pronájem montáž | lešenářská firma, pronájem lešení ČR |
| `/pronajem-leseni` | pronájem lešení | půjčovna lešení, lešení k pronájmu |
| `/montaz-a-demontaz-leseni` | montáž lešení | demontáž lešení, stavba lešení |
| `/prodej-leseni` | prodej lešení | HAKI lešení prodej, trubkové lešení prodej |
| `/technicke-navrhy-leseni` | projekt lešení | statické posouzení lešení |
| `/prumyslove-a-prostorove-leseni` | prostorové lešení | průmyslové lešení, lešení do interiéru kostela |
| `/haki-leseni` | HAKI lešení | pojízdné lešení HAKI |
| `/peri-leseni` | PERI UP lešení | PERI UP T70 |
| `/trubkove-leseni` | trubkové lešení | lešení trubka spojka |
| `/strediska/praha` | lešení Praha | pronájem lešení Praha |
| `/strediska/plzen` | lešení Plzeň | |
| `/strediska/karlovy-vary` | lešení Karlovy Vary | lešení Ostrov |
| `/strediska/olomouc` | lešení Olomouc | |
| `/strediska/slovensko` | lešenie Bratislava | |

## 6. Obsahová strategie (P2)

- Doplnit případové studie ke každé referenci (zadání → řešení → výsledek) – vyžaduje podklady od techniků.
- Průvodce: „Jak připravit podklady pro poptávku lešení“, „Kdy je potřeba statické posouzení lešení“ – psát jen s ověřením technikem.
- Google Business Profile pro každé středisko (NAP shodné s webem).
