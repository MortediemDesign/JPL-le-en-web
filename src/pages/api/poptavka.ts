import type { APIRoute } from 'astro';
import { handleInquiry } from '../../lib/handleInquiry';
import { ATTACHMENT } from '../../lib/inquiry';
import { sendInquiry } from '../../lib/mailer';

export const prerender = false;

const MAX_BODY = ATTACHMENT.maxBytes + 256 * 1024;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });

export const POST: APIRoute = async ({ request, clientAddress, redirect }) => {
  const wantsJson = (request.headers.get('accept') ?? '').includes('application/json');
  const fail = (status: number, message: string, code: string) =>
    wantsJson ? json({ ok: false, message }, status) : redirect(`/poptavka?chyba=${code}#formular`, 303);

  const length = Number(request.headers.get('content-length') ?? 0);
  if (length > MAX_BODY) return fail(413, `Poptávka je příliš velká. Příloha může mít nejvýše ${ATTACHMENT.maxLabel}.`, 'velikost');

  const type = request.headers.get('content-type') ?? '';
  if (!type.includes('multipart/form-data') && !type.includes('application/x-www-form-urlencoded')) {
    return fail(415, 'Neplatný formát požadavku.', 'format');
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return fail(400, 'Formulář se nepodařilo zpracovat.', 'format');
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || clientAddress || 'unknown';
  const result = await handleInquiry(form, ip, { send: sendInquiry, turnstileSecret: process.env.TURNSTILE_SECRET });

  switch (result.status) {
    case 'ok':
    case 'spam':
      return wantsJson ? json({ ok: true, redirect: '/poptavka/odeslano' }) : redirect('/poptavka/odeslano', 303);
    case 'invalid':
      return wantsJson
        ? json({ ok: false, errors: result.errors, message: 'Zkontrolujte prosím zvýrazněná pole.' }, 422)
        : redirect('/poptavka?chyba=validace#formular', 303);
    case 'rate-limited':
      return fail(429, 'Odeslali jste několik poptávek za krátkou dobu. Zkuste to prosím později nebo nám zavolejte.', 'limit');
    default:
      return fail(
        502,
        'Poptávku se nepodařilo odeslat kvůli technické chybě. Zavolejte nám prosím nebo napište na info@jplleseni.cz.',
        'server',
      );
  }
};

export const ALL: APIRoute = () => new Response('Method Not Allowed', { status: 405, headers: { Allow: 'POST' } });
