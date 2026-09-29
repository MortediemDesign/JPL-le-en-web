/** FAQ – odpovědi jsou postavené jen na informacích ze současného webu. */

export interface FaqItem {
  q: string;
  a: string;
}

export const faq = {
  freeQuote: {
    q: 'Kolik stojí prohlídka a cenová nabídka?',
    a: 'Nic. Technik stavbu zaměří, zkonzultuje s vámi požadavky a připraví cenovou nabídku zdarma – i v případě, že se pro naše lešení nakonec nerozhodnete.',
  },
  documents: {
    q: 'Jaké podklady potřebujete k poptávce?',
    a: 'Stačí úplná adresa stavby, popis prací a předpokládaný termín. Pokud máte výkresovou dokumentaci nebo fotografie objektu, přiložte je k poptávce – nabídku pak připravíme rychleji a přesněji.',
  },
  area: {
    q: 'Kde lešení pronajímáte?',
    a: 'Po celé České republice ze středisek Praha, Plzeň, Karlovy Vary a Olomouc. Na Slovensku působíme prostřednictvím J.P.L. LEŠENIE s.r.o. v Bratislavě.',
  },
  dismantle: {
    q: 'Jak probíhá demontáž?',
    a: 'Po skončení prací nám termín demontáže stačí oznámit e-mailem nebo telefonicky. Lešení rozebereme a odvezeme sami, technik jej protokolárně převezme.',
  },
  whichSystem: {
    q: 'Jaký typ lešení je pro mou stavbu vhodný?',
    a: 'Systém doporučí technik po zaměření. Systémové lešení PERI UP T70 a HAKI je rychlé na montáž a variabilní, trubkové lešení se přizpůsobí nepravidelným tvarům a atypickým konstrukcím.',
  },
  ownCrews: {
    q: 'Montujete lešení vlastními lidmi?',
    a: 'Ano, montáž zajišťujeme z větší části vlastními zaměstnanci, kteří každoročně procházejí školením. Část kapacit doplňují spolupracující subdodavatelé.',
  },
  handover: {
    q: 'Dostanu lešení předané protokolem?',
    a: 'Ano. Technik odpovědný za akci vám hotové lešení protokolárně předá a po skončení prací jej stejně protokolárně převezme.',
  },
  staticAssessment: {
    q: 'Kdy je potřeba projekt a statické posouzení lešení?',
    a: 'U složitých konstrukcí – například prostorových lešení, lešení na konzolách nebo lešení s vyšším zatížením. Projekt i statické posouzení zajistíme jako součást zakázky.',
  },
  salePrice: {
    q: 'Máte ceník prodávaného lešení?',
    a: 'Ceník nezveřejňujeme, protože se mění skladové zásoby i ceny materiálu. Pošlete poptávku se systémem a množstvím a připravíme aktuální nabídku.',
  },
  saleDelivery: {
    q: 'Dopravíte zakoupené lešení?',
    a: 'Ano, zboží můžete převzít na některém z našich skladů, nebo jej dopravíme na místo určení podle dohody v objednávce.',
  },
} satisfies Record<string, FaqItem>;

export const homeFaq: FaqItem[] = [
  faq.freeQuote,
  faq.documents,
  faq.area,
  faq.whichSystem,
  faq.ownCrews,
  faq.dismantle,
];
