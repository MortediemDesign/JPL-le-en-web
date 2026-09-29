export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export const mainNav: NavItem[] = [
  {
    label: 'Služby',
    href: '/sluzby',
    children: [
      { label: 'Pronájem lešení', href: '/pronajem-leseni' },
      { label: 'Montáž a demontáž', href: '/montaz-a-demontaz-leseni' },
      { label: 'Prodej lešení', href: '/prodej-leseni' },
      { label: 'Technické návrhy', href: '/technicke-navrhy-leseni' },
      { label: 'Průmyslové a prostorové lešení', href: '/prumyslove-a-prostorove-leseni' },
    ],
  },
  {
    label: 'Typy lešení',
    href: '/typy-leseni',
    children: [
      { label: 'PERI UP T70', href: '/peri-leseni' },
      { label: 'HAKI', href: '/haki-leseni' },
      { label: 'Trubkové lešení', href: '/trubkove-leseni' },
    ],
  },
  { label: 'Reference', href: '/reference' },
  { label: 'O společnosti', href: '/o-nas' },
  {
    label: 'Střediska',
    href: '/strediska',
    children: [
      { label: 'Praha', href: '/strediska/praha' },
      { label: 'Plzeň', href: '/strediska/plzen' },
      { label: 'Karlovy Vary', href: '/strediska/karlovy-vary' },
      { label: 'Olomouc', href: '/strediska/olomouc' },
      { label: 'Slovensko', href: '/strediska/slovensko' },
    ],
  },
  { label: 'Kontakt', href: '/kontakty' },
];
