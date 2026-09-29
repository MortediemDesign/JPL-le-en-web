/**
 * Anti-spam: honeypot + časová past (vždy) a volitelně Cloudflare Turnstile
 * (pokud je nastaven TURNSTILE_SECRET). Turnstile je neviditelný a bez cookies pro reklamu,
 * na rozdíl od reCAPTCHA v2 „Nejsem robot“ ze současného webu.
 */
import { MIN_FILL_MS } from './inquiry';

export type SpamVerdict = { ok: true } | { ok: false; reason: 'honeypot' | 'too-fast' | 'captcha' };

export function checkTraps(form: { www?: string; startedAt?: string }, now = Date.now()): SpamVerdict {
  if (form.www && form.www.trim() !== '') return { ok: false, reason: 'honeypot' };
  const started = Number(form.startedAt);
  // Chybějící časové razítko (formulář bez JS) nepovažujeme za spam – jen rychlé odeslání.
  if (Number.isFinite(started) && started > 0 && now - started < MIN_FILL_MS) return { ok: false, reason: 'too-fast' };
  return { ok: true };
}

export async function verifyTurnstile(token: string | undefined, ip: string, secret: string | undefined): Promise<boolean> {
  if (!secret) return true;
  if (!token) return false;
  try {
    const body = new URLSearchParams({ secret, response: token, remoteip: ip });
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body,
      signal: AbortSignal.timeout(5000),
    });
    const json = (await res.json()) as { success?: boolean };
    return json.success === true;
  } catch {
    return false;
  }
}
