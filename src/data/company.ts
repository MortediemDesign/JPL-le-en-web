/**
 * Firemní údaje – jediný zdroj pravdy pro celý web.
 * Zdroj: současný web www.jplleseni.cz (stav 09/2026), viz docs/copy-audit.md.
 * Položky s `verify: true` musí klient před spuštěním potvrdit.
 */

export const SITE_URL = 'https://www.jplleseni.cz';

export const company = {
  brand: 'J.P.L. LEŠENÍ',
  legalName: 'J.P.L. LEŠENÍ s.r.o.',
  ico: '26345579',
  dic: 'CZ26345579',
  registry: 'Spisová značka C 14311 vedená u Krajského soudu v Plzni',
  seat: {
    street: 'Družební 1279',
    city: 'Ostrov',
    zip: '363 01',
    country: 'CZ',
  },
  email: 'info@jplleseni.cz',
  phone: '+420 602 440 035',
  foundingYear: 1997,
  facebook: 'https://www.facebook.com/JPLleseni/',
} as const;

export interface Fact {
  value: string;
  label: string;
  /** Údaj je na současném webu, ale je nutné potvrdit jeho aktuálnost. */
  verify?: boolean;
  note?: string;
}

/** Důkazní prvky pro hero a sekci důvěryhodnosti. */
export const facts: Fact[] = [
  { value: 'od 1997', label: 'na trhu s lešením' },
  { value: '4 + 1', label: 'střediska v ČR a na Slovensku' },
  {
    value: '90 000 m²',
    label: 'lešení v naší půjčovně',
    verify: true,
    // TODO(klient): homepage uvádí 90 000 m², stránka O nás a meta popisy 80 000 m². Potvrdit.
    note: 'Rozpor 80 000 × 90 000 m² na současném webu',
  },
  {
    value: 'cca 40',
    label: 'vlastních montážníků a techniků',
    verify: true,
    // TODO(klient): číslo pochází ze stránky O nás, ověřit aktuálnost.
  },
];

export const management = [
  {
    name: 'Pavel Ježek',
    role: 'Ředitel – ekonomika, obchod, technika',
    phone: '+420 602 440 035',
    email: 'pavel.jezek@jplleseni.cz',
  },
  {
    name: 'Petr Ježek',
    role: 'Ředitel – obchod, logistika',
    phone: '+420 603 257 750',
    email: 'petr.jezek@jplleseni.cz',
  },
  {
    name: 'Jaroslava Ježková',
    role: 'Jednatelka',
    email: 'jaroslava.jezkova@jplleseni.cz',
  },
] as const;

export const timeline = [
  {
    year: '1997',
    title: 'Založení společnosti',
    text: 'J.P.L. LEŠENÍ s.r.o. vzniká v Karlovarském kraji. Od začátku se věnuje výhradně montáži a pronájmu lešení.',
  },
  {
    year: '1999',
    title: 'Středisko Plzeň',
    text: 'Díky reinvesticím do vybavení otevíráme středisko v Plzni a pokrýváme západní a část jižních Čech.',
  },
  {
    year: '2002',
    title: 'Středisko Praha',
    text: 'Koncem roku otevíráme středisko v Praze pro zakázky v hlavním městě a středních Čechách.',
  },
  {
    year: '2010',
    title: 'Vstup na Slovensko',
    text: 'V polovině roku zakládáme J.P.L. LEŠENIE s.r.o. se sídlem v Bratislavě.',
  },
  {
    // TODO(klient): doplnit rok otevření střediska Olomouc.
    year: 'Olomouc',
    title: 'Středisko Olomouc',
    text: 'Nejnovější středisko rozšiřuje působnost na Moravu. Díky čtyřem střediskům v ČR zajišťujeme lešení po celé republice.',
  },
];

export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`;
