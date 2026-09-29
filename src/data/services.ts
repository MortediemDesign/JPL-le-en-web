/**
 * Služby. Texty vycházejí z ověřených informací současného webu (viz docs/copy-audit.md).
 * Technické parametry (`specs`) doplňujte pouze z podkladů výrobce/technika – prázdné pole se nezobrazí.
 */
import type { FaqItem } from './faq';
import { faq } from './faq';

export type ServiceId = 'pronajem' | 'montaz' | 'prodej' | 'navrh' | 'prumyslove';

export interface Service {
  id: ServiceId;
  slug: string;
  navLabel: string;
  title: string;
  seoTitle: string;
  description: string;
  h1: string;
  lead: string;
  icon: 'rent' | 'build' | 'sale' | 'plan' | 'industry';
  intro: string[];
  uses: string[];
  process: { title: string; text: string }[];
  includes?: string[];
  specs?: { label: string; value: string }[];
  referenceSlugs: string[];
  faq: FaqItem[];
  todo?: string;
}

const standardProcess = [
  {
    title: 'Poptávka a podklady',
    text: 'Pošlete adresu stavby, rozsah a termín. Pokud máte výkresy nebo fotografie, přiložte je k poptávce.',
  },
  {
    title: 'Prohlídka a zaměření',
    text: 'Odborný technik se s vámi spojí, převezme dokumentaci a akci zaměří přímo na místě podle terénu.',
  },
  {
    title: 'Cenová nabídka',
    text: 'V dohodnutém termínu dostanete nabídku s cenovými a funkčními podmínkami a předpokládaným termínem montáže. Zdarma a nezávazně.',
  },
  {
    title: 'Doprava a montáž',
    text: 'Materiál přivezeme vlastní dopravou, lešení smontují proškolení montážníci a technik vám jej protokolárně předá.',
  },
  {
    title: 'Demontáž a odvoz',
    text: 'Po skončení prací stačí nahlásit termín demontáže. Lešení rozebereme, odvezeme a technik jej protokolárně převezme.',
  },
];

export const services: Service[] = [
  {
    id: 'pronajem',
    slug: 'pronajem-leseni',
    navLabel: 'Pronájem lešení',
    title: 'Pronájem lešení',
    seoTitle: 'Pronájem lešení včetně montáže | J.P.L. LEŠENÍ',
    description:
      'Pronájem lešení PERI UP, HAKI a trubkového lešení včetně dopravy, montáže a demontáže. 4 střediska v ČR, prohlídka a cenová nabídka zdarma.',
    h1: 'Pronájem lešení včetně dopravy, montáže a demontáže',
    lead: 'Lešení pronajímáme jako kompletní službu: technik zaměří stavbu, připraví nabídku, naši montážníci lešení postaví a po skončení prací zase odvezou.',
    icon: 'rent',
    intro: [
      'Pronájem lešení je naší hlavní činností od roku 1997. Půjčovna zahrnuje systémová lešení PERI UP T70 a HAKI i klasické trubkové lešení, takže konstrukci volíme podle tvaru objektu, zatížení a přístupu ke stavbě.',
      'Lešení zajišťujeme ze středisek Praha, Plzeň, Karlovy Vary a Olomouc po celé České republice a přes dceřinou společnost také na Slovensku.',
    ],
    uses: [
      'Fasádní lešení pro zateplení, opravy a nátěry fasád',
      'Lešení pro novostavby bytových a administrativních budov',
      'Rekonstrukce historických a památkově chráněných objektů',
      'Prostorové lešení do interiérů – kostely, haly, sály',
      'Lešení pro průmyslové provozy a technologické celky',
    ],
    process: standardProcess,
    includes: [
      'Prohlídka stavby a cenová nabídka zdarma',
      'Technický návrh, u složitých konstrukcí projekt a statické posouzení',
      'Doprava lešení vlastními vozidly',
      'Montáž a demontáž proškolenými montážníky',
      'Protokolární předání a převzetí lešení technikem',
    ],
    referenceSlugs: ['cssz-praha', 'bytovy-dum-jeremiasova-praha', 'karlovarske-mestske-divadlo'],
    faq: [faq.freeQuote, faq.documents, faq.area, faq.dismantle, faq.whichSystem],
    todo: 'Doplnit obchodní podmínky pronájmu (minimální doba, způsob účtování) – na současném webu nejsou.',
  },
  {
    id: 'montaz',
    slug: 'montaz-a-demontaz-leseni',
    navLabel: 'Montáž a demontáž',
    title: 'Montáž a demontáž lešení',
    seoTitle: 'Montáž a demontáž lešení | J.P.L. LEŠENÍ',
    description:
      'Odborná montáž a demontáž lešení vlastními proškolenými montážníky. Protokolární předání, doprava materiálu, působnost po celé ČR a SR.',
    h1: 'Odborná montáž a demontáž lešení',
    lead: 'Lešení stavíme převážně vlastními zaměstnanci, kteří každoročně procházejí školením. Hotovou konstrukci technik protokolárně předá a po skončení prací zase převezme.',
    icon: 'build',
    intro: [
      'Montáž lešení zajišťujeme z větší části vlastními montážními týmy, doplněnými o spolupracující subdodavatele. Zavedený systém školení a kontrol kvality nám umožňuje držet stejný standard práce na všech střediscích.',
      'Bezpečnost lešenářů i uživatelů lešení je pro nás podmínkou: dodržujeme bezpečnostní, ergonomické i funkční požadavky a spolupracujeme s kontrolními orgány.',
    ],
    uses: [
      'Montáž lešení z naší půjčovny na klíč',
      'Postupná montáž a úpravy lešení podle průběhu stavby',
      'Montáž na konzolách, v omezeném prostoru nebo za provozu',
      'Demontáž a odvoz lešení po skončení prací',
    ],
    process: standardProcess,
    includes: [
      'Vlastní montážníci a odpovědný technik akce',
      'Pravidelná školení a kontroly kvality',
      'Doprava materiálu na stavbu',
      'Předávací a přejímací protokol',
    ],
    referenceSlugs: ['staromestska-radnice-praha', 'jezuitsky-kostel-klatovy', 'hlavni-nadrazi-plzen'],
    faq: [faq.ownCrews, faq.dismantle, faq.handover, faq.freeQuote],
    todo: 'Doplnit fotografie montážních týmů při práci (vlastní fotografie firmy).',
  },
  {
    id: 'prodej',
    slug: 'prodej-leseni',
    navLabel: 'Prodej lešení',
    title: 'Prodej lešení',
    seoTitle: 'Prodej lešení HAKI a trubkového lešení | J.P.L. LEŠENÍ',
    description:
      'Prodej lešení HAKI (včetně pojízdného HAKI UNI) a trubkového lešení. Cenovou nabídku připravíme individuálně podle vašeho požadavku.',
    h1: 'Prodej lešení HAKI a trubkového lešení',
    lead: 'Kromě pronájmu nabízíme také prodej lešení. Aktuální cenovou nabídku připravíme podle požadovaného systému, množství a místa dodání.',
    icon: 'sale',
    intro: [
      'Prodáváme lešení HAKI IV., pojízdné lešení HAKI UNI a trubkové lešení. Protože sortiment a skladové zásoby se mění, nezveřejňujeme ceník – nabídku připravíme vždy aktuálně.',
      'Zboží lze převzít na některém z našich skladů nebo jej dopravíme na místo určení.',
    ],
    uses: [
      'Stavební firmy, které chtějí vlastní lešení pro opakované zakázky',
      'Doplnění stávajícího lešení HAKI nebo trubkového lešení',
      'Pojízdné lešení HAKI UNI pro údržbu a práce v halách',
    ],
    process: [
      { title: 'Poptávka', text: 'Napište systém, přibližné množství nebo plochu a místo dodání.' },
      { title: 'Nabídka', text: 'Připravíme aktuální cenovou nabídku a termín dodání.' },
      { title: 'Objednávka', text: 'Po potvrzení objednávky se domluvíme na převzetí nebo dopravě.' },
      { title: 'Předání', text: 'Zboží předáme na skladě nebo na stavbě s předávacím protokolem.' },
    ],
    referenceSlugs: [],
    faq: [faq.salePrice, faq.saleDelivery],
    todo: 'Obchodní podmínky prodeje na současném webu jsou zastaralé (vedené na fyzickou osobu, odkaz na zrušený obchodní zákoník) – nepřeneseny. Doplnit aktuální VOP a kontakt obchodu.',
  },
  {
    id: 'navrh',
    slug: 'technicke-navrhy-leseni',
    navLabel: 'Technické návrhy',
    title: 'Technické návrhy lešení',
    seoTitle: 'Technický návrh, projekt a statika lešení | J.P.L. LEŠENÍ',
    description:
      'Technický návrh lešení, u složitých konstrukcí projekt a statické posouzení. Zaměření na místě a konzultace s technikem zdarma.',
    h1: 'Technický návrh, projekt a statické posouzení lešení',
    lead: 'Každé lešení začíná návrhem. U běžných fasád jej připraví náš technik po zaměření, u složitých konstrukcí zajistíme projekt a statické posouzení.',
    icon: 'plan',
    intro: [
      'Technik převezme dostupnou dokumentaci stavby, zaměří akci na místě a navrhne vhodný lešenářský systém, způsob kotvení a založení.',
      'Pro složité konstrukce – prostorová lešení, lešení na konzolách, lešení s neobvyklým zatížením – vypracujeme projekt a zajistíme statické posouzení.',
    ],
    uses: [
      'Návrh lešení pro výběrová řízení a rozpočty stavby',
      'Lešení pro nestandardní tvary objektů a omezený prostor',
      'Prostorová a podpěrná lešení v interiérech',
      'Lešení na konzolách nad provozem nebo chodníkem',
    ],
    process: [
      { title: 'Podklady', text: 'Výkresy, fotografie nebo alespoň popis objektu a požadovaných prací.' },
      { title: 'Zaměření', text: 'Technik akci zaměří na místě a konzultuje s vámi požadavky.' },
      { title: 'Návrh', text: 'Vlastní technický návrh lešení; u složitých konstrukcí projekt a statika.' },
      { title: 'Nabídka a realizace', text: 'Návrh je podkladem cenové nabídky a následné montáže.' },
    ],
    referenceSlugs: ['staromestska-radnice-praha', 'jezuitsky-kostel-klatovy'],
    faq: [faq.staticAssessment, faq.documents, faq.freeQuote],
    todo: 'Doplnit, zda projekt/statiku zpracovávají vlastní technici nebo externí statik, a v jakém formátu se dodává dokumentace.',
  },
  {
    id: 'prumyslove',
    slug: 'prumyslove-a-prostorove-leseni',
    navLabel: 'Průmyslové a prostorové lešení',
    title: 'Průmyslové a prostorové lešení',
    seoTitle: 'Prostorové, těžké a průmyslové lešení | J.P.L. LEŠENÍ',
    description:
      'Prostorové lešení do interiérů, těžké a průmyslové lešení pro provozy a technologie. Návrh, statika, montáž i demontáž.',
    h1: 'Prostorové, těžké a průmyslové lešení',
    lead: 'Kromě fasád stavíme prostorová lešení do interiérů a těžká a průmyslová lešení pro provozy, kde je potřeba přizpůsobit konstrukci technologii a provozu.',
    icon: 'industry',
    intro: [
      'Prostorové lešení vytváří pracovní plochu v celém objemu místnosti – typicky pro opravy kleneb, stropů a výmaleb v kostelích, sálech a halách.',
      'Těžké a průmyslové lešení navrhujeme pro vyšší zatížení a specifické podmínky provozů. Konstrukci volíme ze systémů PERI UP a HAKI nebo z trubkového lešení, které se dá přizpůsobit téměř libovolnému tvaru.',
    ],
    uses: [
      'Interiéry kostelů, sálů a hal',
      'Průmyslové provozy, technologické celky',
      'Lešení s vyšším zatížením',
      'Konstrukce kolem nepravidelných tvarů',
    ],
    process: standardProcess,
    referenceSlugs: ['jezuitsky-kostel-klatovy', 'poutni-klaster-nanebevzeti-panny-marie-chlum-svate-mari'],
    faq: [faq.staticAssessment, faq.whichSystem, faq.freeQuote],
    todo: 'Doplnit průmyslové reference (fotografie a popis) – současný web obsahuje převážně stavební a památkové zakázky.',
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
export const serviceById = (id: string) => services.find((s) => s.id === id);
