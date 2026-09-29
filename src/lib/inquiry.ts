/**
 * Schéma a validace poptávkového formuláře – sdíleno klientem (InquiryForm) i serverem (/api/poptavka).
 *
 * Mapování na pole současného formuláře Antee IPO:
 *   input0 → company, input1 → contactName, input2 → phone, email → email,
 *   input4 → branch, input5 → siteAddress, input6 → message, input7 → attachment, www → www (honeypot).
 *   Nová pole: service, term, consent.
 */

export const SERVICE_OPTIONS = [
  { value: 'pronajem', label: 'Pronájem lešení' },
  { value: 'montaz', label: 'Montáž a demontáž' },
  { value: 'prodej', label: 'Prodej lešení' },
  { value: 'navrh', label: 'Technický návrh / projekt' },
  { value: 'prumyslove', label: 'Průmyslové / prostorové lešení' },
  { value: 'jine', label: 'Jiné / nevím' },
] as const;

export const BRANCH_OPTIONS = [
  { value: 'nevim', label: 'Nevím – určete sami podle místa stavby' },
  { value: 'praha', label: 'Praha' },
  { value: 'plzen', label: 'Plzeň' },
  { value: 'karlovy-vary', label: 'Karlovy Vary' },
  { value: 'olomouc', label: 'Olomouc' },
  { value: 'slovensko', label: 'Slovensko' },
] as const;

export const ATTACHMENT = {
  maxBytes: 10 * 1024 * 1024,
  maxLabel: '10 MB',
  extensions: ['pdf', 'jpg', 'jpeg', 'png', 'webp', 'heic', 'dwg', 'dxf', 'zip'],
  accept: '.pdf,.jpg,.jpeg,.png,.webp,.heic,.dwg,.dxf,.zip',
} as const;

/** Minimální doba vyplnění (ms) – ochrana proti botům. */
export const MIN_FILL_MS = 3000;

export interface InquiryInput {
  company: string;
  contactName: string;
  phone: string;
  email: string;
  service: string;
  branch: string;
  siteAddress: string;
  term: string;
  message: string;
  consent: boolean;
}

export type FieldName = keyof InquiryInput | 'attachment';
export type Errors = Partial<Record<FieldName, string>>;

export const FIELD_LABELS: Record<FieldName, string> = {
  company: 'Firma',
  contactName: 'Kontaktní osoba',
  phone: 'Telefon',
  email: 'E-mail',
  service: 'Typ služby',
  branch: 'Středisko',
  siteAddress: 'Adresa realizace',
  term: 'Předpokládaný termín',
  message: 'Popis projektu',
  consent: 'Souhlas se zpracováním údajů',
  attachment: 'Příloha',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Mezinárodní i české formáty: +420 602 440 035, 602440035, +421 948 955 224
const PHONE_RE = /^\+?[0-9\s()-]{9,20}$/;

const LIMITS: Partial<Record<keyof InquiryInput, number>> = {
  company: 150,
  contactName: 120,
  phone: 30,
  email: 150,
  siteAddress: 250,
  term: 100,
  message: 5000,
};

const clean = (v: unknown) =>
  typeof v === 'string' ? v.replace(/\r\n/g, '\n').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim() : '';

export function normalize(raw: Record<string, unknown>): InquiryInput {
  return {
    company: clean(raw.company),
    contactName: clean(raw.contactName),
    phone: clean(raw.phone),
    email: clean(raw.email).toLowerCase(),
    service: clean(raw.service),
    branch: clean(raw.branch) || 'nevim',
    siteAddress: clean(raw.siteAddress),
    term: clean(raw.term),
    message: clean(raw.message),
    consent: raw.consent === true || raw.consent === 'on' || raw.consent === 'true' || raw.consent === '1',
  };
}

export function validate(data: InquiryInput): Errors {
  const e: Errors = {};
  if (!data.company) e.company = 'Vyplňte název firmy (u soukromé osoby jméno).';
  if (!data.contactName) e.contactName = 'Vyplňte kontaktní osobu.';
  if (!data.phone) e.phone = 'Vyplňte telefon, ať vás technik může kontaktovat.';
  else if (!PHONE_RE.test(data.phone) || data.phone.replace(/\D/g, '').length < 9)
    e.phone = 'Zadejte telefon ve tvaru +420 602 440 035.';
  if (!data.email) e.email = 'Vyplňte e-mail.';
  else if (!EMAIL_RE.test(data.email)) e.email = 'Zadejte e-mail ve tvaru jmeno@firma.cz.';
  if (!SERVICE_OPTIONS.some((o) => o.value === data.service)) e.service = 'Vyberte typ služby.';
  if (!BRANCH_OPTIONS.some((o) => o.value === data.branch)) e.branch = 'Vyberte středisko ze seznamu.';
  if (!data.siteAddress) e.siteAddress = 'Vyplňte adresu stavby (obec a ulice).';
  if (!data.message) e.message = 'Popište stručně projekt – objekt, rozsah, výšku.';
  else if (data.message.length < 10) e.message = 'Popis je příliš krátký – napište alespoň pár slov o projektu.';
  if (!data.consent) e.consent = 'Pro odeslání poptávky potřebujeme váš souhlas.';

  for (const [key, max] of Object.entries(LIMITS) as [keyof InquiryInput, number][]) {
    const v = data[key];
    if (typeof v === 'string' && v.length > max && !e[key]) e[key] = `Maximálně ${max} znaků.`;
  }
  return e;
}

export function fileExtension(name: string) {
  const i = name.lastIndexOf('.');
  return i === -1 ? '' : name.slice(i + 1).toLowerCase();
}

/** Kontrola metadat přílohy (klient i server). Obsah ověřuje server v fileType.ts. */
export function validateAttachmentMeta(file: { name: string; size: number } | null | undefined): string | undefined {
  if (!file || file.size === 0) return undefined;
  if (file.size > ATTACHMENT.maxBytes) return `Příloha je příliš velká. Maximum je ${ATTACHMENT.maxLabel}.`;
  if (!(ATTACHMENT.extensions as readonly string[]).includes(fileExtension(file.name)))
    return 'Nepodporovaný typ souboru. Povoleno: PDF, JPG, PNG, WEBP, HEIC, DWG, DXF, ZIP.';
  return undefined;
}

export const labelOf = (options: readonly { value: string; label: string }[], value: string) =>
  options.find((o) => o.value === value)?.label ?? value;
