# J.P.L. LEŠENÍ – web

Nový web www.jplleseni.cz (Astro 7 + Node). Audit, URL mapa a stav implementace jsou v `docs/`.

## Vývoj

```bash
npm install
npm run dev            # http://localhost:4321
npm run build          # produkční build + konfigurace redirectů
npm start              # produkční server (server.mjs)
```

## Kontroly

```bash
npm run lint           # ESLint + astro check
npm test               # unit testy (Vitest)
npm run check:links    # interní odkazy v dist/
npm run test:e2e       # Playwright: responzivita, formulář, WCAG (axe), SEO, konzole
```

## Obsah

Všechny firemní údaje a texty jsou v `src/data/`:

| Soubor | Obsah |
|---|---|
| `company.ts` | firemní údaje, fakta, vedení, historie |
| `branches.ts` | střediska, kontakty, cílové e-maily poptávek |
| `services.ts`, `scaffoldTypes.ts`, `faq.ts` | služby, typy lešení, FAQ |
| `references.ts` | reference (jen ověřené údaje, chybějící = `todo`) |
| `redirects.ts` | 301 přesměrování ze starého webu |

Položky označené `verify: true` / `TODO(klient)` je nutné před spuštěním potvrdit – viz `docs/implementation-checklist.md`.

## Provoz

Konfigurace přes proměnné prostředí – viz `.env.example` (SMTP, Turnstile, kanonický host).
Před přepnutím DNS spusťte `npm run images:migrate` (stáhne fotografie ze současného CMS).
