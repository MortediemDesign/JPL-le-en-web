/**
 * Odeslání poptávky e-mailem (SMTP přes nodemailer).
 * Konfigurace přes proměnné prostředí – viz .env.example.
 * Bez SMTP_HOST se poptávka v dev/test režimu jen zaloguje (a vrátí úspěch).
 */
import nodemailer from 'nodemailer';
import { branchById } from '../data/branches';
import { company } from '../data/company';
import { BRANCH_OPTIONS, SERVICE_OPTIONS, labelOf, type InquiryInput } from './inquiry';

export interface Attachment {
  filename: string;
  content: Buffer;
  contentType: string;
}

const env = (k: string) => process.env[k];

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export function recipientFor(branch: string): string {
  return branchById(branch)?.inquiryEmail ?? env('INQUIRY_TO_DEFAULT') ?? company.email;
}

export function buildMessage(data: InquiryInput, attachment?: Attachment) {
  const rows: [string, string][] = [
    ['Firma', data.company],
    ['Kontaktní osoba', data.contactName],
    ['Telefon', data.phone],
    ['E-mail', data.email],
    ['Typ služby', labelOf(SERVICE_OPTIONS, data.service)],
    ['Středisko', labelOf(BRANCH_OPTIONS, data.branch)],
    ['Adresa realizace', data.siteAddress],
    ['Předpokládaný termín', data.term || '—'],
    ['Příloha', attachment ? attachment.filename : '—'],
  ];
  const text =
    rows.map(([k, v]) => `${k}: ${v}`).join('\n') + `\n\nPopis projektu:\n${data.message}\n\n— Odesláno z formuláře www.jplleseni.cz`;
  const html = `<table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">${rows
    .map(([k, v]) => `<tr><th align="left" style="background:#f2f4f7">${k}</th><td>${escapeHtml(v)}</td></tr>`)
    .join('')}</table><h3 style="font-family:Arial,sans-serif">Popis projektu</h3><p style="font-family:Arial,sans-serif;white-space:pre-wrap">${escapeHtml(
    data.message,
  )}</p>`;
  const subject = `Poptávka: ${labelOf(SERVICE_OPTIONS, data.service)} – ${data.company}`.replace(/[\r\n]+/g, ' ').slice(0, 160);
  return { subject, text, html };
}

export async function sendInquiry(data: InquiryInput, attachment?: Attachment): Promise<void> {
  const to = recipientFor(data.branch);
  const { subject, text, html } = buildMessage(data, attachment);

  if (!env('SMTP_HOST')) {
    if (env('NODE_ENV') === 'production' && env('INQUIRY_ALLOW_NO_SMTP') !== '1') {
      throw new Error('SMTP není nakonfigurováno (SMTP_HOST).');
    }
    console.info(`[poptavka] (bez SMTP) → ${to}: ${subject}`);
    return;
  }

  const transporter = nodemailer.createTransport({
    host: env('SMTP_HOST'),
    port: Number(env('SMTP_PORT') ?? 587),
    secure: env('SMTP_SECURE') === '1',
    auth: env('SMTP_USER') ? { user: env('SMTP_USER')!, pass: env('SMTP_PASS') ?? '' } : undefined,
  });

  const cc = env('INQUIRY_CC');
  await transporter.sendMail({
    from: env('MAIL_FROM') ?? `Web J.P.L. LEŠENÍ <${company.email}>`,
    to,
    cc: cc && cc !== to ? cc : undefined,
    replyTo: `${data.contactName.replace(/[<>"\r\n]/g, '')} <${data.email}>`,
    subject,
    text,
    html,
    attachments: attachment ? [attachment] : [],
  });
}
