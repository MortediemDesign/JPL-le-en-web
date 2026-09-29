/**
 * 301 přesměrování ze současného webu (Antee IPO). Viz docs/url-inventory.md.
 * Používá: astro.config.mjs (redirects → skutečné 301 přes node adapter)
 * a scripts/generate-redirects.mjs (_redirects, .htaccess, nginx pro jiné hostingy).
 *
 * Pozn.: `/index.php?oid=5181522` (SK úvod) řeší route src/pages/index.php.ts podle query.
 */
export const redirects: Record<string, string> = {
  // Aktuality → Kariéra / relevantní stránky
  '/aktuality': '/kariera',
  '/aktuality/novorocni-prani-2017': '/',
  '/aktuality/pf-2025': '/',
  '/aktuality/nabidka-volnych-pracovnich-mist': '/kariera',
  '/aktuality/volna-pracovni-mista-2018': '/kariera',
  '/aktuality/pracovni-prilezitost': '/kariera',
  '/aktuality/prijmeme-pracovni-prilezitosti': '/kariera',
  '/aktuality/volna-pracovni-mista': '/kariera',
  '/aktuality/volne-pracovni-misto-ridic-b-k-parte-lesenaru': '/kariera',
  '/aktuality/hledame-ridice-sk-b-pro-tranzitni-vozidlo-valnik': '/kariera',
  '/aktuality/volne-misto-ridic-sk-c': '/kariera',
  '/aktuality/nove-telefonni-cislo': '/strediska/karlovy-vary',
  '/aktuality/odstavka-telefonni-linky': '/kontakty',

  // Lešení / prodej
  '/leseni': '/typy-leseni',
  '/prodej-haki-leseni': '/prodej-leseni',
  '/trubkove-leseni-prodej': '/prodej-leseni',
  '/prislusenstvi-k-leseni': '/prodej-leseni',
  '/bazar-leseni': '/prodej-leseni',

  // Střediska
  '/praha': '/strediska/praha',
  '/plzen': '/strediska/plzen',
  '/karlovy-vary': '/strediska/karlovy-vary',
  '/stredisko-olomouc': '/strediska/olomouc',
  '/slovensko': '/strediska/slovensko',

  '/klub-jpl': '/',

  // Slovenská verze (TODO klient: rozhodnout o SK webu)
  '/aktuality-sk': '/strediska/slovensko',
  '/lesenie': '/typy-leseni',
  '/prenajom-leseni': '/pronajem-leseni',
  '/haki-lesenie': '/haki-leseni',
  '/rurkove-lesenie': '/trubkove-leseni',
  '/peri-lesenie': '/peri-leseni',
  '/fotogaleria': '/reference',
  '/kontakty-sk': '/strediska/slovensko',
  '/o-spolocnosti': '/o-nas',
  '/gdpr-sk': '/gdpr',
  '/mapa-stranek-sk': '/mapa-stranek',

  // Běžné varianty
  '/kontakt': '/kontakty',
  '/o-spolecnosti': '/o-nas',
};

/** Legacy query-based URL: /index.php?oid=… */
export const legacyOidRedirects: Record<string, string> = {
  '5181522': '/strediska/slovensko',
  '5181519': '/',
};
