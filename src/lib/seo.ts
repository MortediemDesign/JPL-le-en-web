/** Strukturovaná data (schema.org). Žádné hodnocení/recenze – nejsou ověřené. */
import { branches, type Branch } from '../data/branches';
import { SITE_URL, company } from '../data/company';
import type { FaqItem } from '../data/faq';

export const ORG_ID = `${SITE_URL}/#organization`;

export const absoluteUrl = (path: string) => new URL(path, SITE_URL).toString().replace(/\/$/, '') || SITE_URL;

export function organizationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: company.legalName,
    alternateName: company.brand,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    email: company.email,
    telephone: company.phone,
    foundingDate: String(company.foundingYear),
    taxID: company.dic,
    identifier: { '@type': 'PropertyValue', propertyID: 'IČO', value: company.ico },
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.seat.street,
      addressLocality: company.seat.city,
      postalCode: company.seat.zip,
      addressCountry: company.seat.country,
    },
    areaServed: [
      { '@type': 'Country', name: 'Česká republika' },
      { '@type': 'Country', name: 'Slovensko' },
    ],
    sameAs: [company.facebook],
    department: branches.map((b) => ({ '@id': branchId(b) })),
  };
}

export const branchId = (b: Branch) => `${SITE_URL}/strediska/${b.slug}#business`;

export function localBusinessLd(b: Branch) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': branchId(b),
    name: `${b.company?.name ?? company.brand} – středisko ${b.name}`,
    url: `${SITE_URL}/strediska/${b.slug}`,
    telephone: b.phone,
    email: b.email,
    image: `${SITE_URL}/og-default.jpg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: b.office.street,
      addressLocality: b.office.city,
      postalCode: b.office.zip,
      addressCountry: b.office.country,
    },
    areaServed: b.areas.map((name) => ({ '@type': 'AdministrativeArea', name })),
    parentOrganization: { '@id': ORG_ID },
  };
}

export function serviceLd(opts: { name: string; description: string; path: string; serviceType: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    serviceType: opts.serviceType,
    url: absoluteUrl(opts.path),
    provider: { '@id': ORG_ID },
    areaServed: [
      { '@type': 'Country', name: 'Česká republika' },
      { '@type': 'Country', name: 'Slovensko' },
    ],
  };
}

export interface Crumb {
  label: string;
  href: string;
}

export function breadcrumbLd(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      item: absoluteUrl(c.href),
    })),
  };
}

export function faqLd(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
