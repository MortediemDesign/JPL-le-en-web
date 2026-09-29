import { beforeEach, describe, expect, it, vi } from 'vitest';
import { checkTraps } from '../../src/lib/antispam';
import { safeFilename, sniffMatchesExtension } from '../../src/lib/fileType';
import { handleInquiry } from '../../src/lib/handleInquiry';
import { normalize, validate, validateAttachmentMeta } from '../../src/lib/inquiry';
import { buildMessage, recipientFor } from '../../src/lib/mailer';
import { resetRateLimit } from '../../src/lib/rateLimit';

const valid = {
  company: 'Stavby Plzeň s.r.o.',
  contactName: 'Jan Novák',
  phone: '+420 602 440 035',
  email: 'Jan@Firma.cz',
  service: 'pronajem',
  branch: 'plzen',
  siteAddress: 'Klatovská 1, Plzeň',
  term: 'květen 2027',
  message: 'Fasádní lešení na bytový dům 20 × 12 m.',
  consent: 'on',
};

const toForm = (data: Record<string, string>, file?: File) => {
  const fd = new FormData();
  for (const [k, v] of Object.entries(data)) fd.append(k, v);
  if (file) fd.append('attachment', file);
  return fd;
};

const pdf = (name = 'vykres.pdf') => new File([new TextEncoder().encode('%PDF-1.7\n...')], name, { type: 'application/pdf' });

describe('validace', () => {
  it('projde s platnými údaji a normalizuje e-mail', () => {
    const data = normalize(valid);
    expect(data.email).toBe('jan@firma.cz');
    expect(validate(data)).toEqual({});
  });

  it('hlásí všechna povinná pole', () => {
    const errors = validate(normalize({}));
    expect(Object.keys(errors).sort()).toEqual(
      ['company', 'consent', 'contactName', 'email', 'message', 'phone', 'service', 'siteAddress'].sort(),
    );
  });

  it('termín a středisko jsou nepovinné, výchozí středisko = nevim', () => {
    const data = normalize({ ...valid, term: '', branch: '' });
    expect(data.branch).toBe('nevim');
    expect(validate(data)).toEqual({});
  });

  it.each(['abc', '12345', 'jan@', '+420 60'])('odmítne neplatný kontakt %s', (v) => {
    const e = validate(normalize({ ...valid, email: v, phone: v }));
    expect(e.email).toBeDefined();
    expect(e.phone).toBeDefined();
  });

  it('odmítne neznámou službu a středisko', () => {
    const e = validate(normalize({ ...valid, service: 'x', branch: 'brno' }));
    expect(e.service).toBeDefined();
    expect(e.branch).toBeDefined();
  });

  it('omezí délku a odstraní řídicí znaky', () => {
    expect(validate(normalize({ ...valid, company: 'x'.repeat(151) })).company).toMatch(/Maximálně/);
    expect(normalize({ ...valid, company: 'A\u0000B' }).company).toBe('AB');
  });
});

describe('příloha', () => {
  it('kontroluje velikost a příponu', () => {
    expect(validateAttachmentMeta({ name: 'a.pdf', size: 11 * 1024 * 1024 })).toMatch(/velká/);
    expect(validateAttachmentMeta({ name: 'a.exe', size: 10 })).toMatch(/Nepodporovaný/);
    expect(validateAttachmentMeta({ name: 'a.PDF', size: 10 })).toBeUndefined();
    expect(validateAttachmentMeta(null)).toBeUndefined();
  });

  it('ověřuje magic bytes', () => {
    expect(sniffMatchesExtension('a.pdf', new TextEncoder().encode('%PDF-1.4'))).toBe(true);
    expect(sniffMatchesExtension('a.pdf', new TextEncoder().encode('<html>'))).toBe(false);
    expect(sniffMatchesExtension('a.png', new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))).toBe(true);
    expect(sniffMatchesExtension('a.jpg', new Uint8Array([0xff, 0xd8, 0xff, 0xe0]))).toBe(true);
    expect(sniffMatchesExtension('a.dxf', new TextEncoder().encode('0\nSECTION\n<script>'))).toBe(false);
  });

  it('vytvoří bezpečný název souboru', () => {
    expect(safeFilename('../../Výkres fasády (1).pdf')).toBe('Vykres-fasady-1.pdf');
    expect(safeFilename('.pdf')).toBe('priloha.pdf');
  });
});

describe('antispam', () => {
  it('honeypot a příliš rychlé odeslání', () => {
    expect(checkTraps({ www: 'http://spam' }).ok).toBe(false);
    expect(checkTraps({ startedAt: '1000' }, 2000).ok).toBe(false);
    expect(checkTraps({ startedAt: '1000' }, 10_000).ok).toBe(true);
    expect(checkTraps({}).ok).toBe(true);
  });
});

describe('handleInquiry', () => {
  beforeEach(() => resetRateLimit());
  const deps = () => ({ send: vi.fn().mockResolvedValue(undefined), now: 100_000 });

  it('odešle platnou poptávku s přílohou', async () => {
    const d = deps();
    const res = await handleInquiry(toForm({ ...valid, startedAt: '1' }, pdf('Výkres.pdf')), '1.1.1.1', d);
    expect(res).toEqual({ status: 'ok' });
    const [, att] = d.send.mock.calls[0];
    expect(att.filename).toBe('Vykres.pdf');
    expect(att.contentType).toBe('application/pdf');
  });

  it('podvržená příloha je odmítnuta', async () => {
    const fake = new File(['<html>'], 'x.pdf');
    const res = await handleInquiry(toForm(valid, fake), '1.1.1.2', deps());
    expect(res.status).toBe('invalid');
  });

  it('spam se tváří jako úspěch, ale neodešle se', async () => {
    const d = deps();
    const res = await handleInquiry(toForm({ ...valid, www: 'x' }), '1.1.1.3', d);
    expect(res.status).toBe('spam');
    expect(d.send).not.toHaveBeenCalled();
  });

  it('rate limit po 5 platných poptávkách, neplatné se nepočítají', async () => {
    const d = deps();
    for (let i = 0; i < 3; i++) await handleInquiry(toForm({ company: '' }), '9.9.9.9', d);
    for (let i = 0; i < 5; i++) expect((await handleInquiry(toForm(valid), '9.9.9.9', d)).status).toBe('ok');
    expect((await handleInquiry(toForm(valid), '9.9.9.9', d)).status).toBe('rate-limited');
  });

  it('chyba SMTP vrátí error', async () => {
    const res = await handleInquiry(toForm(valid), '1.1.1.4', { send: vi.fn().mockRejectedValue(new Error('x')) });
    expect(res.status).toBe('error');
  });
});

describe('e-mail', () => {
  it('směruje na středisko a escapuje HTML', () => {
    expect(recipientFor('olomouc')).toBe('olomouc@jplleseni.cz');
    expect(recipientFor('nevim')).toBe('info@jplleseni.cz');
    const msg = buildMessage(normalize({ ...valid, message: '<script>x</script>', company: 'A\nB' }));
    expect(msg.html).not.toContain('<script>');
    expect(msg.subject).not.toMatch(/\n/);
  });
});
