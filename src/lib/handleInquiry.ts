/** Zpracování poptávky – čistá funkce nad FormData, testovatelná bez HTTP serveru. */
import { checkTraps, verifyTurnstile } from './antispam';
import { MIME, safeFilename, sniffMatchesExtension } from './fileType';
import { fileExtension, normalize, validate, validateAttachmentMeta, type Errors } from './inquiry';
import type { Attachment } from './mailer';
import { rateLimit } from './rateLimit';

export type InquiryResult =
  | { status: 'ok' }
  | { status: 'invalid'; errors: Errors }
  | { status: 'spam' }
  | { status: 'rate-limited' }
  | { status: 'error' };

export interface Deps {
  send: (data: ReturnType<typeof normalize>, attachment?: Attachment) => Promise<void>;
  turnstileSecret?: string;
  now?: number;
}

const str = (v: FormDataEntryValue | null) => (typeof v === 'string' ? v : '');

export async function handleInquiry(form: FormData, ip: string, deps: Deps): Promise<InquiryResult> {
  const traps = checkTraps({ www: str(form.get('www')), startedAt: str(form.get('startedAt')) }, deps.now);
  // Bot dostane „úspěch“, aby nezkoušel dál – poptávka se ale neodešle.
  if (!traps.ok) return { status: 'spam' };

  if (!(await verifyTurnstile(str(form.get('cf-turnstile-response')) || undefined, ip, deps.turnstileSecret))) {
    return { status: 'invalid', errors: { consent: 'Ověření proti spamu se nezdařilo. Zkuste to prosím znovu.' } };
  }

  const data = normalize(Object.fromEntries([...form.entries()].filter(([, v]) => typeof v === 'string')));
  const errors = validate(data);

  let attachment: Attachment | undefined;
  const file = form.get('attachment');
  if (file && typeof file !== 'string' && file.size > 0) {
    const metaError = validateAttachmentMeta(file);
    if (metaError) {
      errors.attachment = metaError;
    } else {
      const bytes = new Uint8Array(await file.arrayBuffer());
      if (!sniffMatchesExtension(file.name, bytes)) {
        errors.attachment = 'Obsah souboru neodpovídá jeho typu. Nahrajte prosím jiný soubor.';
      } else {
        attachment = {
          filename: safeFilename(file.name),
          content: Buffer.from(bytes),
          contentType: MIME[fileExtension(file.name)] ?? 'application/octet-stream',
        };
      }
    }
  }

  if (Object.keys(errors).length > 0) return { status: 'invalid', errors };

  // Limit počítá jen platné poptávky – překlepy uživatele se do limitu nezapočítají.
  if (!rateLimit(ip, 5, 10 * 60 * 1000, deps.now)) return { status: 'rate-limited' };

  try {
    await deps.send(data, attachment);
    return { status: 'ok' };
  } catch (err) {
    console.error('[poptavka] odeslání selhalo', err);
    return { status: 'error' };
  }
}
