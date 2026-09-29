/** Typy lešení. Zdroj: stránky /haki-leseni, /peri-leseni, /trubkove-leseni současného webu. */
import type { FaqItem } from './faq';
import { faq } from './faq';

export interface ScaffoldType {
  slug: string;
  name: string;
  short: string;
  seoTitle: string;
  description: string;
  h1: string;
  lead: string;
  features: { title: string; text: string }[];
  components?: string[];
  suitableFor: string[];
  referenceSlugs: string[];
  faq: FaqItem[];
  /** Ověřené technické údaje. Nevyplněné = nezobrazí se. */
  specs: { label: string; value: string }[];
  todo?: string;
}

export const scaffoldTypes: ScaffoldType[] = [
  {
    slug: 'peri-leseni',
    name: 'PERI UP T70',
    short: 'Lehké, variabilní systémové lešení s předem montovaným zábradlím.',
    seoTitle: 'Lešení PERI UP T70 – pronájem a montáž | J.P.L. LEŠENÍ',
    description:
      'Pronájem lešení PERI UP T70 včetně dopravy, montáže a demontáže. Lehké a variabilní lešení s předsazeným zábradlím pro bezpečnou montáž.',
    h1: 'Lešení PERI UP T70',
    lead: 'Systém PERI UP T70 jsme zvolili pro jeho lehkost, variabilitu a bezpečnost. Předem montované zábradlí chrání lešenáře proti pádu z výšky už během montáže.',
    features: [
      {
        title: 'Bezpečná montáž',
        text: 'Předem montované zábradlí zajišťuje ochranu lešenářů proti pádu z výšky a zrychluje práci bez vedlejších nákladů.',
      },
      {
        title: 'Variabilita za provozu',
        text: 'Integrovaná pojistka podlahy umožňuje vestavět nebo demontovat jednotlivé podlahy kdekoli. Lešení lze kdykoli doplnit, přizpůsobit nebo částečně rozebrat.',
      },
      {
        title: 'Jednoduchá montáž',
        text: 'Lešení PERI je schopen namontovat jeden montážník sám až do výšky 6,30 m.',
      },
      {
        title: 'Dlouhá životnost',
        text: 'Povrchová úprava pozinkováním zaručuje dlouhou životnost dílců.',
      },
    ],
    suitableFor: ['Novostavby a fasády', 'Stavby s měnícími se požadavky na lešení', 'Zakázky s důrazem na rychlost a bezpečnost montáže'],
    referenceSlugs: ['bytovy-dum-jeremiasova-praha'],
    faq: [faq.whichSystem, faq.freeQuote],
    specs: [{ label: 'Povrchová úprava', value: 'pozinkování' }],
    todo: 'Doplnit technický list (třídy zatížení, šířky polí) z dokumentace výrobce.',
  },
  {
    slug: 'haki-leseni',
    name: 'HAKI',
    short: 'Dílcové lešení z kvalitní oceli – pevně stojící i pojízdné.',
    seoTitle: 'Lešení HAKI – pronájem, prodej a montáž | J.P.L. LEŠENÍ',
    description:
      'Pronájem a prodej lešení HAKI IV. a pojízdného lešení HAKI UNI. Včetně dopravy, montáže a demontáže po celé ČR.',
    h1: 'Lešení HAKI',
    lead: 'HAKI IV. je dílcové lešení – skládačka z do sebe přesně zapadajících prvků. Díky široké řadě dílců jej lze použít jako pevně stojící i jako pojízdné.',
    features: [
      {
        title: 'Kvalitní ocel',
        text: 'Lešení je vyrobeno z kvalitní oceli podle norem ČSN a EU se zaručenou svařitelností, doplněné o dřevěné dílce.',
      },
      {
        title: 'Pevně stojící i pojízdné',
        text: 'Stejný systém slouží pro fasádní lešení i pro pojízdné věže (HAKI UNI) k údržbě a pracím v halách.',
      },
      {
        title: 'Přehledná stavebnice',
        text: 'Základní dílce se dělí do čtyř skupin, montáž je rychlá a opakovatelná.',
      },
    ],
    components: [
      'Vertikální prvky – sloupky',
      'Horizontální podélné prvky – podélníky, zábradlí',
      'Horizontální příčné prvky – příčníky, zábradlí',
      'Ostatní – patky, ztužení, kotvení',
    ],
    suitableFor: ['Fasádní lešení', 'Pojízdné lešení pro údržbu a interiéry', 'Prodej pro stavební firmy'],
    referenceSlugs: [],
    faq: [faq.whichSystem, faq.salePrice],
    specs: [{ label: 'Materiál', value: 'ocel dle norem ČSN a EU, dřevěné dílce' }],
    todo: 'Doplnit technický list HAKI a reference s tímto systémem.',
  },
  {
    slug: 'trubkove-leseni',
    name: 'Trubkové lešení',
    short: 'Ocelové trubky a spojky pro atypické a nepravidelné konstrukce.',
    seoTitle: 'Trubkové lešení – pronájem a montáž | J.P.L. LEŠENÍ',
    description:
      'Pronájem a montáž trubkového lešení z ocelových trubek DN 40. Pro atypické tvary, památky a prostorová lešení. Včetně dopravy po celé ČR.',
    h1: 'Trubkové lešení',
    lead: 'Trubkové lešení je sada lešenářských prvků – ocelových trubek DN 40, spojek a nánožek – ze kterých se konstrukce smontuje přímo na místě. Proto se přizpůsobí téměř libovolnému tvaru objektu.',
    features: [
      {
        title: 'Přizpůsobí se tvaru',
        text: 'Konstrukce se skládá na místě, takže obejde římsy, věže, klenby i nepravidelné půdorysy.',
      },
      {
        title: 'Kompletní vybavení',
        text: 'Ocelovou konstrukci doplňují dřevěné podlážky, žebříky a okopová prkna.',
      },
      {
        title: 'Stabilita',
        text: 'Stabilitu konstrukce zajišťují kotevní prvky navržené podle objektu.',
      },
    ],
    components: ['Ocelové trubky DN 40', 'Spojky a nánožky', 'Dřevěné podlážky, žebříky, okopová prkna', 'Kotevní prvky'],
    suitableFor: ['Památky a sakrální stavby', 'Prostorová lešení v interiérech', 'Atypické a nepravidelné konstrukce'],
    referenceSlugs: ['jezuitsky-kostel-klatovy'],
    faq: [faq.whichSystem, faq.staticAssessment],
    specs: [{ label: 'Trubky', value: 'ocelové, DN 40' }],
  },
];

export const scaffoldTypeBySlug = (slug: string) => scaffoldTypes.find((t) => t.slug === slug);
