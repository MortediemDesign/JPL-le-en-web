# URL inventář – www.jplleseni.cz

Zdroj: `sitemap.xml`, `mapa-stranek` a navigace živého webu (stav 29. 9. 2026, CMS Antee IPO).
Legenda akce: **zachovat** = stejná URL v novém webu · **301** = trvalé přesměrování · **nová** = nová stránka.

Přesměrování jsou definována na jednom místě v `src/data/redirects.ts` a aplikuje je
Node server (`server.mjs`) skutečným HTTP 301. Pro jiné hostingy se ze stejného zdroje
generují `dist/_redirects`, `dist/.htaccess` a `dist/nginx-redirects.conf` (`npm run build`).

## 1. Současné URL (CZ)

| Současná URL | Obsah / stav | Akce | Nová URL |
|---|---|---|---|
| `/` | Úvod, kontakty středisek | zachovat | `/` |
| `/aktuality` | Převážně pracovní inzeráty 2016–2024, PF 2025 | 301 | `/kariera` |
| `/aktuality/novorocni-prani-2017` | PF 2017 | 301 | `/` |
| `/aktuality/nabidka-volnych-pracovnich-mist` | inzerát | 301 | `/kariera` |
| `/aktuality/nove-telefonni-cislo` | Nové tel. KV (2016) | 301 | `/strediska/karlovy-vary` |
| `/aktuality/volna-pracovni-mista-2018` | inzerát 2018 | 301 | `/kariera` |
| `/aktuality/pracovni-prilezitost` | inzerát 2020 | 301 | `/kariera` |
| `/aktuality/prijmeme-pracovni-prilezitosti` | inzerát 2021 | 301 | `/kariera` |
| `/aktuality/volna-pracovni-mista` | inzerát 2022 | 301 | `/kariera` |
| `/aktuality/odstavka-telefonni-linky` | Odstávka linky 06/2023 | 301 | `/kontakty` |
| `/aktuality/volne-pracovni-misto-ridic-b-k-parte-lesenaru` | inzerát 2024 | 301 | `/kariera` |
| `/aktuality/hledame-ridice-sk-b-pro-tranzitni-vozidlo-valnik` | inzerát 2024 | 301 | `/kariera` |
| `/aktuality/volne-misto-ridic-sk-c` | inzerát 2024 | 301 | `/kariera` |
| `/aktuality/pf-2025` | PF 2025 | 301 | `/` |
| `/leseni` | Rozcestník typů | 301 | `/typy-leseni` |
| `/pronajem-leseni` | Pronájem | zachovat | `/pronajem-leseni` |
| `/haki-leseni` | HAKI | zachovat | `/haki-leseni` |
| `/trubkove-leseni` | Trubkové | zachovat | `/trubkove-leseni` |
| `/peri-leseni` | PERI UP T70 | zachovat | `/peri-leseni` |
| `/prodej-leseni` | Rozcestník + zastaralé obchodní podmínky | zachovat (obsah přepsán) | `/prodej-leseni` |
| `/prodej-haki-leseni` | „Stránky ve výstavbě“ | 301 | `/prodej-leseni` |
| `/trubkove-leseni-prodej` | Jen odkaz na PDF ceník | 301 | `/prodej-leseni` |
| `/prislusenstvi-k-leseni` | Prázdná stránka | 301 | `/prodej-leseni` |
| `/bazar-leseni` | Prázdná stránka | 301 | `/prodej-leseni` |
| `/reference` | Přehled 10 referencí | zachovat | `/reference` |
| `/reference/sepekovsky-most` | 3 foto | zachovat | stejná |
| `/reference/obchodni-dum-maj-praha` | 2 foto | zachovat | stejná |
| `/reference/hlavni-nadrazi-plzen` | 8 foto, 1 věta | zachovat | stejná |
| `/reference/poutni-klaster-nanebevzeti-panny-marie-chlum-svate-mari` | 8 foto | zachovat | stejná |
| `/reference/karlovarske-mestske-divadlo` | 2018, BAU STAV, 3 400 m² | zachovat | stejná |
| `/reference/cssz-praha` | 2016, Podzimek a synové, 14 800 m² | zachovat | stejná |
| `/reference/bytovy-dum-jeremiasova-praha` | 2018, Ridera, 12 900 m² | zachovat | stejná |
| `/reference/jezuitsky-kostel-klatovy` | 2018, GEMA ART GROUP, 19 800 m² | zachovat | stejná |
| `/reference/prazsky-hrad` | Detail se nepodařilo načíst (timeout) | zachovat | stejná |
| `/reference/staromestska-radnice-praha` | 2017–2018, Subterra + AVERS, 5 900 m² | zachovat | stejná |
| `/o-nas` | Historie, fakta | zachovat | `/o-nas` |
| `/dotacni-program-up-a-eu` | Dotace ÚP 2014–2015 | zachovat (jen v patičce) | stejná |
| `/kontakty` | Sídlo, vedení, formulář | zachovat | `/kontakty` |
| `/praha` | Středisko + formulář | 301 | `/strediska/praha` |
| `/plzen` | Středisko + formulář | 301 | `/strediska/plzen` |
| `/karlovy-vary` | Středisko + formulář | 301 | `/strediska/karlovy-vary` |
| `/stredisko-olomouc` | Středisko + formulář | 301 | `/strediska/olomouc` |
| `/slovensko` | Středisko SK + formulář | 301 | `/strediska/slovensko` |
| `/gdpr` | Odkaz na PDF | zachovat | `/gdpr` |
| `/mapa-stranek` | HTML mapa | zachovat | `/mapa-stranek` |
| `/prohlaseni-o-pristupnosti` | Prohlášení | zachovat (přepsáno) | stejná |
| `/klub-jpl` | Pouze Atom feed v `<head>`, stránka neznámá | 301 | `/` |

## 2. Slovenská jazyková verze

Slovenskou verzi v rámci redesignu nepřenášíme (obsah jsme nezmapovali a nemáme ověřený SK copywriting).
**Rozhodnutí klienta (TODO):** buď SK web na doméně `jpllesenie.sk`, nebo `/sk/` v tomto projektu.
Do té doby jsou SK URL trvale přesměrovány na nejbližší český ekvivalent:

| SK URL | Nová URL |
|---|---|
| `/index.php?oid=5181522` (SK úvod) | `/strediska/slovensko` (řeší se v `server.mjs` podle query) |
| `/aktuality-sk` | `/strediska/slovensko` |
| `/lesenie` | `/typy-leseni` |
| `/prenajom-leseni` | `/pronajem-leseni` |
| `/haki-lesenie` | `/haki-leseni` |
| `/rurkove-lesenie` | `/trubkove-leseni` |
| `/peri-lesenie` | `/peri-leseni` |
| `/fotogaleria` | `/reference` |
| `/kontakty-sk` | `/strediska/slovensko` |
| `/o-spolocnosti` | `/o-nas` |
| `/gdpr-sk` | `/gdpr` |
| `/mapa-stranek-sk` | `/mapa-stranek` |

## 3. Nové stránky

| URL | Účel |
|---|---|
| `/sluzby` | Přehled služeb |
| `/montaz-a-demontaz-leseni` | Služba |
| `/technicke-navrhy-leseni` | Služba |
| `/prumyslove-a-prostorove-leseni` | Služba |
| `/typy-leseni` | Přehled systémů (nahrazuje `/leseni`) |
| `/strediska` + 5 detailů | Regionální působnost |
| `/poptavka` | Samostatná konverzní stránka s formulářem |
| `/poptavka/odeslano` | Potvrzení (noindex) – měřitelný cíl konverze |
| `/kariera` | Nahrazuje inzeráty v Aktualitách |
| `/404` | Chybová stránka |
| `POST /api/poptavka` | Serverové zpracování formuláře |

## 4. Soubory a externí zdroje, které je nutné migrovat

Po přepnutí domény na nový web přestane existovat CMS endpoint `image.php` / `file.php`.

| Zdroj | Použití | Akce |
|---|---|---|
| `image.php?nid=15093&oid=…` (≈45 fotografií referencí) | Reference | `npm run images:migrate` stáhne originály do `public/images/reference/` a převede na WebP; spustit **před přepnutím DNS** z prostředí s přístupem na web |
| `file.php?nid=15093&oid=6489838` (GDPR PDF) | `/gdpr` | stáhnout do `public/files/gdpr-informace.pdf` |
| `file.php?nid=15093&oid=6240665` (prezentace PPSX, 52 MB) | `/o-nas` | nepřenášet v této podobě – TODO: PDF verze < 10 MB |
| `file.php?nid=15093&oid=6144514` (ceník trubkového lešení, PDF) | dříve `/trubkove-leseni-prodej` | nepřenášet – neznámé stáří cen (TODO klient) |
| `file.php?nid=15093&oid=6144553` (logo dotace) | `/dotacni-program-up-a-eu` | stáhnout do `public/files/` |
| `image.php?nid=15093&oid=6219583` (logo) | Hlavička | nahrazeno SVG wordmarkem; TODO: dodat originální logo ve vektoru |
