# UX audit

## 1. Hlavní problémy současného webu

| # | Problém | Dopad | Řešení v redesignu |
|---|---|---|---|
| U1 | Homepage nemá jasnou hodnotovou nabídku ani CTA – H1 „Montáž a pronájem kompletních systémů lešení“, pod ním adresy středisek | Návštěvník neví, co udělat dál | Hero s H1, podnadpisem, primárním a sekundárním CTA |
| U2 | Formulář je jen na `/kontakty` a stránkách středisek, v navigaci neexistuje | Nízká konverze | Tlačítko „Poptat lešení“ v hlavičce na všech stránkách, samostatná `/poptavka`, CTA blok na konci každé stránky |
| U3 | Položka menu „Lešení“ je `href="#"` (nolink) | Nepřístupné z klávesnice/mobilu, matoucí | Navigace: Služby · Typy lešení · Reference · O společnosti · Střediska · Kontakt |
| U4 | Prodej lešení (5 stránek) není v navigaci; 3 z nich jsou prázdné nebo „ve výstavbě“ | Slepé uličky, dojem neudržovaného webu | Jedna stránka `/prodej-leseni`, prázdné stránky přesměrovány |
| U5 | Detail reference = jen galerie bez popisu (6 z 10) | Slabý důkaz odbornosti | Karta reference: typ objektu, lokalita, rok, zadavatel, objem, popis, fotografie; chybějící údaje jako TODO (nezobrazují se) |
| U6 | Formulář: 8 polí bez typu služby a termínu, captcha „Nejsem robot“ | Doptávání, tření | Nová pole Typ služby, Termín; neviditelná antispamová ochrana |
| U7 | Pro celou ČR je na stránce Pronájem uvedeno tel. číslo střediska Karlovy Vary | Hovor jde na nesprávné středisko | Centrální kontakt v hlavičce + výběr střediska v poptávce |
| U8 | Sekce „Aktuality“ = inzeráty z let 2016–2024 a PF | Působí zastarale | Nahrazeno stránkou Kariéra, Aktuality zrušeny |
| U9 | Reference: text o autorském zákoně a zákazu kopírování | Nepřátelský tón | Odstraněno; ochrana fotografií patří do patičky/VOP |
| U10 | Mobil: menu přes „Menu“ toggler, kontakty až na konci stránky | Obtížné zavolání | Mobilní menu s telefonem a CTA, sticky lišta „Zavolat / Poptat“ |

## 2. Informační architektura

```
Úvod
├─ Služby (/sluzby)
│  ├─ Pronájem lešení (/pronajem-leseni)
│  ├─ Montáž a demontáž (/montaz-a-demontaz-leseni)
│  ├─ Prodej lešení (/prodej-leseni)
│  ├─ Technické návrhy (/technicke-navrhy-leseni)
│  └─ Průmyslové a prostorové lešení (/prumyslove-a-prostorove-leseni)
├─ Typy lešení (/typy-leseni)
│  ├─ PERI UP T70 (/peri-leseni)
│  ├─ HAKI (/haki-leseni)
│  └─ Trubkové lešení (/trubkove-leseni)
├─ Reference (/reference, /reference/:slug)
├─ O společnosti (/o-nas)
├─ Střediska (/strediska, /strediska/:slug)
├─ Kontakt (/kontakty)
└─ [CTA] Poptat lešení (/poptavka → /poptavka/odeslano)
Patička: Kariéra, GDPR, Prohlášení o přístupnosti, Dotační program, Mapa stránek
```

## 3. Konverzní cesta

1. Vstup (SEO: „pronájem lešení Plzeň“, „HAKI lešení“ …) → stránka služby/typu/střediska.
2. Důkaz: fakta (od 1997, 4 střediska v ČR + SK, vlastní montážní tým), relevantní reference.
3. Odstranění obav: proces spolupráce (5 kroků), FAQ, bezplatná prohlídka a nabídka (ověřeno z textu současného webu).
4. Akce: „Nezávazně poptat lešení“ (formulář s předvyplněnou službou/střediskem přes URL parametr) nebo telefon.
5. Potvrzení: `/poptavka/odeslano` s popisem dalšího postupu – měřitelný cíl.

Parametry pro předvyplnění: `/poptavka?sluzba=pronajem&stredisko=plzen`.

## 4. Design systém

- Barvy: tmavě modrá `#0B2545` (primární), `#13315C`, světlé neutrální pozadí `#F5F7FA`,
  akcent žlutá `#F5B700` (CTA, zvýraznění – s tmavým textem, kontrast 9.6:1).
- Typografie: systémový sans-serif stack (bez externích fontů → rychlejší LCP, žádný FOUT).
  Škála: 14 / 16 / 18 / 20 / 24 / 32 / 40 / 56 px, řádkování 1.6 pro text.
- Spacing: 4px grid (`--space-1…--space-10`), kontejner max 1200 px, gutter 16–32 px.
- Komponenty: tlačítko primární/sekundární/ghost, karta služby, karta reference,
  fakt (číslo + popis), krok procesu, FAQ (`<details>`), CTA pás, drobečková navigace.
- Ikony: inline SVG (liniové, 24 px), žádná ikonová knihovna.
- Fotografie: pouze skutečné fotografie realizací J.P.L. LEŠENÍ ze současného webu.
  Kde chybí (tým, sklad, technika), je připraven box s TODO – nepoužívají se fotobanky.

## 5. Responzivita

Testované šířky: 320, 375, 390, 768, 1024, 1280, 1440 px (Playwright, `tests/e2e/responsive.spec.ts`):
žádný horizontální overflow, viditelné CTA, funkční menu, použitelný formulář.

## 6. Přístupnost (cíl WCAG 2.2 AA)

- Sémantické landmarky (`header`, `nav`, `main`, `footer`), skip link „Přeskočit na obsah“.
- Menu: `<button aria-expanded aria-controls>`, zavření klávesou Esc, návrat fokusu, zamčení scrollu.
- Viditelný fokus (`:focus-visible` 3px žlutý outline + tmavý offset), cílové plochy ≥ 44×44 px (WCAG 2.5.8).
- Formulář: `<label for>`, `aria-describedby` pro nápovědu i chybu, `aria-invalid`,
  souhrn chyb s fokusem, `aria-live` pro stav odeslání, `autocomplete` atributy.
- Kontrasty ověřeny axe-core v e2e testech.
- `prefers-reduced-motion` respektováno.
