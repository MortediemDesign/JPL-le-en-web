/** Střediska. Zdroj: stránky středisek a homepage současného webu. */

export interface Address {
  street: string;
  zip: string;
  city: string;
  country: 'CZ' | 'SK';
  note?: string;
}

export interface Branch {
  slug: string;
  /** Hodnota pole „středisko“ ve formuláři. */
  id: 'praha' | 'plzen' | 'karlovy-vary' | 'olomouc' | 'slovensko';
  name: string;
  /** Tvar pro nadpisy „Lešení …“ */
  locative: string;
  region: string;
  office: Address;
  yard?: Address;
  phone: string;
  mobile?: string;
  email: string;
  /** Kam chodí poptávky z webu. TODO(klient): potvrdit cílové adresy. */
  inquiryEmail: string;
  intro: string;
  areas: string[];
  mapQuery: string;
  company?: { name: string; ico: string; dic: string; email: string };
  verifyNotes?: string[];
}

export const branches: Branch[] = [
  {
    slug: 'praha',
    id: 'praha',
    name: 'Praha',
    locative: 'v Praze',
    region: 'Praha a Středočeský kraj',
    office: {
      street: 'Bavorská 856',
      zip: '155 41',
      city: 'Praha 5 – Stodůlky',
      country: 'CZ',
      note: 'Kancelářská budova MOTOTECHNA',
    },
    phone: '+420 224 458 026',
    mobile: '+420 602 440 035',
    email: 'praha@jplleseni.cz',
    inquiryEmail: 'praha@jplleseni.cz',
    intro:
      'Středisko Praha zajišťuje pronájem, montáž a demontáž lešení v hlavním městě a ve středních Čechách – od fasád bytových domů po památkově chráněné objekty v centru.',
    areas: ['Praha', 'Středočeský kraj'],
    mapQuery: 'Bavorská 856, 155 41 Praha 5',
  },
  {
    slug: 'plzen',
    id: 'plzen',
    name: 'Plzeň',
    locative: 'v Plzni',
    region: 'Plzeňský kraj a jižní Čechy',
    office: { street: 'Klatovská 636', zip: '321 00', city: 'Plzeň', country: 'CZ' },
    yard: {
      street: 'Řepná 20',
      zip: '321 00',
      city: 'Plzeň – Litice',
      country: 'CZ',
      note: 'Sklad lešení, Agrofarma Litice',
    },
    phone: '+420 377 420 836',
    mobile: '+420 602 440 035',
    email: 'plzen@jplleseni.cz',
    inquiryEmail: 'plzen@jplleseni.cz',
    intro:
      'Středisko Plzeň funguje od roku 1999. Obsluhuje Plzeňský kraj a část jižních Čech, vlastní sklad lešení má v Plzni – Liticích.',
    areas: ['Plzeňský kraj', 'jižní Čechy'],
    mapQuery: 'Klatovská 636, 321 00 Plzeň',
    verifyNotes: ['Sklad: stránka střediska uvádí Řepná 20, obchodní podmínky Klatovská 410, 320 64.'],
  },
  {
    slug: 'karlovy-vary',
    id: 'karlovy-vary',
    name: 'Karlovy Vary',
    locative: 'v Karlových Varech',
    region: 'Karlovarský kraj',
    office: {
      street: 'Jáchymovská 349/80',
      zip: '360 04',
      city: 'Karlovy Vary',
      country: 'CZ',
      note: 'Kancelářské budovy ESN',
    },
    yard: {
      street: 'Areál Agro/Travel (bývalý státní statek)',
      zip: '363 01',
      city: 'Ostrov – Vykmanov',
      country: 'CZ',
      note: 'Sklad lešení',
    },
    phone: '+420 353 997 081',
    mobile: '+420 602 440 035',
    email: 'kvary@jplleseni.cz',
    inquiryEmail: 'kvary@jplleseni.cz',
    intro:
      'Karlovarsko je region, kde firma v roce 1997 začínala. Středisko pokrývá Karlovarský kraj a okolí, sklad lešení je v Ostrově – Vykmanově.',
    areas: ['Karlovarský kraj', 'Ostrov', 'Sokolovsko', 'Chebsko'],
    mapQuery: 'Jáchymovská 349/80, 360 04 Karlovy Vary',
    verifyNotes: [
      'Číslo popisné: homepage uvádí 349/80, stránka střediska jen 80.',
      'Sklad: obchodní podmínky uvádí „Dolní Žďár 28“.',
    ],
  },
  {
    slug: 'olomouc',
    id: 'olomouc',
    name: 'Olomouc',
    locative: 'v Olomouci',
    region: 'Olomoucký kraj a Morava',
    office: {
      street: 'Blanická 19',
      zip: '772 35',
      city: 'Olomouc',
      country: 'CZ',
      note: 'Stavební dvůr Blatec',
    },
    phone: '+420 602 440 035',
    email: 'olomouc@jplleseni.cz',
    inquiryEmail: 'olomouc@jplleseni.cz',
    intro:
      'Nejnovější středisko společnosti. Z Olomouce zajišťujeme pronájem a montáž lešení pro zakázky na Moravě.',
    areas: ['Olomoucký kraj', 'Morava'],
    mapQuery: 'Blanická 19, 772 35 Olomouc',
  },
  {
    slug: 'slovensko',
    id: 'slovensko',
    name: 'Slovensko',
    locative: 'na Slovensku',
    region: 'Slovenská republika',
    office: { street: 'Seberíniho 1', zip: '821 03', city: 'Bratislava', country: 'SK' },
    phone: '+421 948 955 224',
    email: 'bratislava@jpllesenie.sk',
    inquiryEmail: 'info@jpllesenie.sk',
    intro:
      'Od roku 2010 působíme na Slovensku prostřednictvím dceřiné společnosti J.P.L. LEŠENIE s.r.o. se sídlem v Bratislavě.',
    areas: ['Bratislava', 'Slovenská republika'],
    mapQuery: 'Seberíniho 1, 821 03 Bratislava',
    company: {
      name: 'J.P.L. LEŠENIE s.r.o.',
      ico: '45 433 950',
      dic: '2022993005',
      email: 'info@jpllesenie.sk',
    },
    verifyNotes: ['E-mail: homepage uvádí info@jpllesenie.sk, stránka střediska bratislava@jpllesenie.sk.'],
  },
];

export const branchById = (id: string) => branches.find((b) => b.id === id);

export const formatAddress = (a: Address) => `${a.street}, ${a.zip} ${a.city}`;
