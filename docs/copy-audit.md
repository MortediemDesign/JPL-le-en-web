# Copywriting a obsahový audit

## 1. Ověřená fakta (zdroj: současný web)

| Fakt | Hodnota | Zdroj | Stav |
|---|---|---|---|
| Založení | 1997, Karlovarský kraj | `/o-nas` | ✅ použito |
| Středisko Plzeň | otevřeno 1999 | `/o-nas` | ✅ |
| Středisko Praha | konec roku 2002 | `/o-nas` | ✅ |
| Středisko Olomouc | „nejnověji“, rok neuveden | `/o-nas` | ⚠️ TODO rok |
| Slovensko | od poloviny roku 2010, Bratislava, J.P.L. LEŠENIE s.r.o. | `/o-nas`, `/slovensko` | ✅ |
| Vlastní zaměstnanci | „cca 40 pracovníků“ | `/o-nas` | ⚠️ ověřit aktuálnost (`verify: true`) |
| Objem půjčovny | **80 000 m²** (`/o-nas`, meta descriptions) × **90 000 m²** (homepage) | rozpor | ⚠️ **BLOKUJE SPUŠTĚNÍ** – v kódu 90 000 m² s `verify: true` |
| Systémy | PERI UP T70, HAKI IV (+ HAKI UNI pojízdné), trubkové DN 40 | typové stránky | ✅ |
| Stáří lešení | „0 až 10 let“ | `/o-nas` | ❌ nepoužito – nelze ověřit, časově citlivé |
| Bezplatná prohlídka a nabídka | „zdarma i v případě, že se nerozhodnete“ | `/pronajem-leseni` | ✅ |
| Projekt a statické posouzení | pro složité konstrukce | `/pronajem-leseni` | ✅ |
| Vlastní doprava, protokolární předání | ano | `/pronajem-leseni` | ✅ |
| Pravidelná školení montérů | „každoročně“ | `/pronajem-leseni` | ✅ |
| PERI: 1 montér do 6,30 m | ano | `/peri-leseni` | ✅ (tvrzení výrobce) |
| IČ / DIČ / spisová značka | 26345579 / CZ26345579 / C 14311 KS Plzeň | `/kontakty` | ✅ |

## 2. Rozpory a zastaralý obsah

| # | Nález | Akce |
|---|---|---|
| C1 | 80 000 vs 90 000 m² | Sjednoceno v `src/data/company.ts` – **klient potvrdí** |
| C2 | Karlovy Vary: „Jáchymovská 349/80“ (homepage) × „Jáchymovská 80“ (středisko) | Použito 349/80 (úplnější), `verify: true` |
| C3 | SK e-mail: `info@jpllesenie.sk` (homepage) × `bratislava@jpllesenie.sk` (středisko) | Uvedeny oba (obecný + středisko), ověřit |
| C4 | Sklad Plzeň: „Řepná 20, Litice“ × VOP „Klatovská 410, 320 64“ | Použito Řepná 20 (stránka střediska), ověřit |
| C5 | Sklad KV: „Areál Agro/Travel, Ostrov-Vykmanov“ × VOP „Dolní Žďár 28“ | Použit areál bez č.p., ověřit |
| C6 | Obchodní podmínky prodeje vedené na **„Pavel Ježek, IČO 65583868“** (živnostník), odkazují na **obchodní zákoník** (zrušen 1. 1. 2014) | **Odstraněno.** TODO: aktuální VOP od klienta |
| C7 | Prodej HAKI „stránky ve výstavbě“, prázdné Příslušenství a Bazar | Odstraněno, 301 |
| C8 | Ceník trubkového lešení (PDF, neznámé datum) | Nepřeneseno |
| C9 | Aktuality: inzeráty 2016–2024, PF 2017/2025, odstávka linky 2023 | Odstraněno → `/kariera` |
| C10 | Fax u středisek (Praha, Plzeň) | Neuvádíme (zastaralý kanál) |
| C11 | Pronájem: telefon KV jako jediný kontakt pro celou ČR | Nahrazeno centrálním kontaktem + střediska |
| C12 | Dotace ÚP 2014–2015 („Generační tandem“) | Ponecháno v patičce – TODO klient: je publicita ještě povinná? |
| C13 | Formulář Plzeň/KV bez Olomouce | Sjednoceno |
| C14 | Prezentace PPSX 52 MB | Nepřeneseno, TODO PDF |
| C15 | Reference se zákazem kopírování (tón) | Odstraněno |
| C16 | Sepekovský most, MAJ, Hlavní nádraží, Chlum, Pražský hrad – bez roku/zadavatele/objemu | Zobrazeny jen známé údaje, zbytek TODO |

## 3. Principy nového copywritingu

- Věcný tón pro stavbyvedoucí, přípraváře a technické ředitele – co, jak, v jakém rozsahu.
- Žádné superlativy bez důkazu („nejlepší“, „nejvýznamnější“). Např. současný meta popis
  referencí „Lešení na nejvýznamnějších stavbách“ nahrazen konkrétním výčtem.
- Každá stránka končí jasným dalším krokem (poptávka / telefon / související stránka).
- Značka se píše **J.P.L. LEŠENÍ** (v textu), obchodní firma **J.P.L. LEŠENÍ s.r.o.** (patička, právní údaje).
- Názvy systémů: **PERI UP T70**, **HAKI**, **trubkové lešení** (sjednoceno z „Peri/Haki“).

## 4. Hero copy (dle zadání)

- H1: „Pronájem a montáž lešení pro stavby všech velikostí“
- Podnadpis: „Kompletní lešenářská řešení od technického návrhu přes dopravu a odbornou montáž až po demontáž. Pro stavební firmy, průmyslové provozy i náročné rekonstrukce.“
- CTA: „Nezávazně poptat lešení“ · „Prohlédnout realizace“
- Důkazy: „Od roku 1997“, „4 střediska v ČR + Bratislava“, „≈ 90 000 m² lešení v půjčovně*“, „Vlastní montážní týmy“
  (*ověřit – viz C1)

## 5. Co v textech záměrně NENÍ

- Ceny, sazby, termíny dodání – nejsou ověřené.
- Počty realizovaných zakázek, „spokojení zákazníci“, hodnocení – nejsou podklady.
- Certifikace (ISO apod.) – na současném webu nejsou uvedeny. TODO klient: pokud existují, doplnit s číslem certifikátu.
- Nosnosti, třídy zatížení a normy (ČSN EN 12810/12811) konkrétních sestav – vyžaduje technické podklady, připraveny komponenty `specs` (prázdné = nezobrazí se).
