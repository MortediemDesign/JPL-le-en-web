/**
 * Reference – pouze projekty ze současného webu. Nevymýšlíme parametry ani zákazníky.
 * Chybějící údaje jsou `undefined` a v UI se nezobrazí. Popisy vycházejí výhradně
 * z textů a popisků fotografií na současném webu.
 *
 * Fotografie: `oid` = id obrázku v CMS Antee (image.php). Skript
 * `npm run images:migrate` je stáhne do public/images/reference/<oid>-<šířka>.webp;
 * po migraci web automaticky použije lokální soubory (viz src/lib/images.ts).
 */

export interface ReferencePhoto {
  oid: number;
  alt: string;
  /** Orientace podle rozměrů v CMS (kvůli rezervaci místa – CLS). */
  portrait?: boolean;
}

export interface Reference {
  slug: string;
  title: string;
  /** Kratší název pro <title>, pokud je `title` příliš dlouhý. */
  shortTitle?: string;
  location?: string;
  objectType: string;
  /** Typ/konstrukce lešení – jen pokud je doložen popisem na současném webu. */
  scaffolding?: string[];
  year?: string;
  client?: string;
  area?: string;
  summary: string;
  photos: ReferencePhoto[];
  featured?: boolean;
  /** TODO pro klienta – co chybí. */
  todo?: string;
}

export const references: Reference[] = [
  {
    slug: 'jezuitsky-kostel-klatovy',
    title: 'Jezuitský kostel Klatovy',
    location: 'Klatovy',
    objectType: 'Sakrální stavba',
    scaffolding: ['Trubkové lešení', 'Prostorové lešení v interiéru', 'Zakrytí plachtami'],
    year: '2018',
    client: 'GEMA ART GROUP a.s.',
    area: '19 800 m²',
    summary:
      'Lešení na kostele zahrnovalo fasády, věž i interiér. Uvnitř lodi jsme postavili prostorové lešení včetně bočních portálů, vnější lešení bylo zakryté plachtami.',
    featured: true,
    photos: [
      { oid: 6737136, alt: 'Čelní pohled na jezuitský kostel v Klatovech s lešením', portrait: true },
      { oid: 6737137, alt: 'Pohled z lešení na věž kostela', portrait: true },
      { oid: 6737138, alt: 'Prostorové lešení uvnitř kostela' },
      { oid: 6737139, alt: 'Výstavba lešení do bočních portálů kostela' },
      { oid: 6737140, alt: 'Nezakryté trubkové lešení na kostele', portrait: true },
      { oid: 6737141, alt: 'Boční stěna kostela se zaplachtovaným lešením', portrait: true },
      { oid: 6737142, alt: 'Boční zaplachtované lešení', portrait: true },
    ],
  },
  {
    slug: 'staromestska-radnice-praha',
    title: 'Staroměstská radnice Praha',
    location: 'Praha – Staroměstské náměstí',
    objectType: 'Historická budova',
    scaffolding: ['Lešení založené na konzolách', 'Zakrytí plachtou'],
    year: '2017–2018',
    client: 'Subterra a.s. + AVERS s.r.o.',
    area: '5 900 m²',
    summary:
      'Lešení na Staroměstské radnici přímo na Staroměstském náměstí. Konstrukce byla založena na konzolách a zakryta plachtou.',
    featured: true,
    photos: [
      { oid: 6735936, alt: 'Celkový pohled na lešení Staroměstské radnice' },
      { oid: 6735930, alt: 'Čelní pohled na radnici s lešením a plachtou', portrait: true },
      { oid: 6735938, alt: 'Detail lešení na radnici', portrait: true },
      { oid: 6735944, alt: 'Detail založení lešení na konzolách' },
      { oid: 6735949, alt: 'Pohled z lešení dolů na Staroměstské náměstí' },
    ],
  },
  {
    slug: 'cssz-praha',
    title: 'ČSSZ Praha',
    location: 'Praha',
    objectType: 'Administrativní budova',
    year: '2016',
    client: 'Podzimek a synové s.r.o.',
    area: '14 800 m²',
    summary: 'Lešení na budově České správy sociálního zabezpečení v Praze v rozsahu 14 800 m².',
    featured: true,
    photos: [
      { oid: 6737161, alt: 'Budova ČSSZ Praha s lešením' },
      { oid: 6737162, alt: 'Provedené lešení na budově ČSSZ', portrait: true },
    ],
  },
  {
    slug: 'bytovy-dum-jeremiasova-praha',
    title: 'Bytový dům Jeremiášova, Praha',
    location: 'Praha',
    objectType: 'Bytový dům',
    scaffolding: ['PERI UP T70'],
    year: '2018',
    client: 'Ridera Stavební a.s.',
    area: '12 900 m²',
    summary: 'Lešení PERI na bytovém domě v ulici Jeremiášova v rozsahu 12 900 m².',
    featured: true,
    photos: [
      { oid: 6737149, alt: 'Bytový dům Jeremiášova s lešením PERI' },
      { oid: 6737150, alt: 'Lešení na bytovém domě Jeremiášova' },
    ],
  },
  {
    slug: 'karlovarske-mestske-divadlo',
    title: 'Karlovarské městské divadlo',
    location: 'Karlovy Vary',
    objectType: 'Divadelní budova',
    year: '2018',
    client: 'BAU STAV a.s.',
    area: '3 400 m²',
    summary:
      'Lešení na budově Karlovarského městského divadla. Na dobu filmového festivalu bylo lešení vyzdobeno.',
    featured: true,
    photos: [
      { oid: 6737178, alt: 'Lešení na Karlovarském městském divadle vyzdobené na filmový festival' },
      { oid: 6737179, alt: 'Lešení na boční části divadla' },
      { oid: 6737180, alt: 'Demontáž lešení z divadla' },
    ],
  },
  {
    slug: 'hlavni-nadrazi-plzen',
    title: 'Hlavní nádraží Plzeň',
    location: 'Plzeň',
    objectType: 'Nádražní budova',
    summary: 'Po 11 letech jsme se vrátili na stejné místo – lešení na budově plzeňského hlavního nádraží.',
    featured: true,
    todo: 'Doplnit rok, zadavatele, objem a typ lešení.',
    photos: [
      { oid: 10161359, alt: 'Hlavní nádraží Plzeň s lešením' },
      { oid: 10161334, alt: 'Lešení na hlavním nádraží v Plzni', portrait: true },
      { oid: 10161356, alt: 'Lešení na fasádě nádražní budovy' },
      { oid: 10161364, alt: 'Pohled na lešení na nádraží' },
      { oid: 10161378, alt: 'Detail lešení na nádražní budově' },
      { oid: 10161387, alt: 'Lešení na hlavním nádraží Plzeň' },
      { oid: 10161392, alt: 'Lešení na hlavním nádraží Plzeň, detail' },
      { oid: 10161410, alt: 'Lešení na hlavním nádraží Plzeň, celkový pohled' },
    ],
  },
  {
    slug: 'prazsky-hrad',
    title: 'Pražský hrad',
    location: 'Praha',
    objectType: 'Historický areál',
    summary: 'Lešení v areálu Pražského hradu.',
    todo: 'Detail reference se při auditu nepodařilo načíst. Doplnit rok, zadavatele, objem, popis a další fotografie.',
    photos: [{ oid: 6735971, alt: 'Vstup do Pražského hradu s lešením' }],
  },
  {
    slug: 'sepekovsky-most',
    title: 'Sepekovský most',
    objectType: 'Mostní konstrukce',
    summary: 'Lešení pro práce na Sepekovském mostě.',
    todo: 'Doplnit lokalitu, rok, zadavatele, objem a typ lešení.',
    photos: [
      { oid: 10505785, alt: 'Lešení na Sepekovském mostě' },
      { oid: 10505786, alt: 'Lešení na mostní konstrukci' },
      { oid: 10505787, alt: 'Detail lešení na mostě' },
    ],
  },
  {
    slug: 'obchodni-dum-maj-praha',
    title: 'Obchodní dům MAJ Praha',
    location: 'Praha',
    objectType: 'Obchodní dům',
    summary: 'Lešení na budově obchodního domu MAJ v Praze.',
    todo: 'Doplnit rok, zadavatele, objem a typ lešení.',
    photos: [
      { oid: 10505783, alt: 'Obchodní dům MAJ v Praze s lešením' },
      { oid: 10505784, alt: 'Lešení na fasádě obchodního domu MAJ' },
    ],
  },
  {
    slug: 'poutni-klaster-nanebevzeti-panny-marie-chlum-svate-mari',
    title: 'Poutní klášter Nanebevzetí Panny Marie – Chlum Svaté Maří',
    shortTitle: 'Poutní klášter Chlum Svaté Maří',
    location: 'Chlum Svaté Maří',
    objectType: 'Sakrální stavba',
    summary: 'Lešení na poutním klášteře Nanebevzetí Panny Marie v Chlumu Svaté Maří.',
    todo: 'Doplnit rok, zadavatele, objem a typ lešení.',
    photos: [
      { oid: 10113890, alt: 'Poutní klášter v Chlumu Svaté Maří s lešením', portrait: true },
      { oid: 10113875, alt: 'Lešení na klášteře' },
      { oid: 10113876, alt: 'Lešení na klášterním kostele', portrait: true },
      { oid: 10113877, alt: 'Lešení na fasádě kláštera', portrait: true },
      { oid: 10113879, alt: 'Pohled na klášter s lešením' },
      { oid: 10113882, alt: 'Detail lešení na klášteře', portrait: true },
      { oid: 10113885, alt: 'Lešení na klášteře, další pohled', portrait: true },
      { oid: 10113894, alt: 'Celkový pohled na klášter s lešením' },
    ],
  },
];

export const referenceBySlug = (slug: string) => references.find((r) => r.slug === slug);
