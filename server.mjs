/**
 * Produkční server: bezpečnostní hlavičky, kanonický host/HTTPS a Astro handler
 * (statické soubory + /api/poptavka + 301 redirecty).
 *
 * Spuštění: `npm run build && npm start` (PORT, HOST, CANONICAL_HOST, FORCE_HTTPS).
 */
import http from 'node:http';

process.env.ASTRO_NODE_AUTOSTART = 'disabled';
const { handler } = await import('./dist/server/entry.mjs');

const PORT = Number(process.env.PORT ?? 4321);
const HOST = process.env.HOST ?? '0.0.0.0';
const CANONICAL_HOST = process.env.CANONICAL_HOST; // např. www.jplleseni.cz
const FORCE_HTTPS = process.env.FORCE_HTTPS === '1';

const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'SAMEORIGIN',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  'Content-Security-Policy': [
    "default-src 'self'",
    "img-src 'self' data: https://www.jplleseni.cz",
    "style-src 'self' 'unsafe-inline'",
    "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com",
    'frame-src https://challenges.cloudflare.com https://www.google.com https://maps.google.com',
    "connect-src 'self'",
    "form-action 'self'",
    "base-uri 'self'",
    "frame-ancestors 'self'",
  ].join('; '),
};

const server = http.createServer((req, res) => {
  const host = req.headers.host ?? '';
  const proto = req.headers['x-forwarded-proto'] ?? 'http';

  if ((CANONICAL_HOST && host !== CANONICAL_HOST) || (FORCE_HTTPS && proto !== 'https')) {
    res.writeHead(301, { Location: `https://${CANONICAL_HOST ?? host}${req.url ?? '/'}` });
    res.end();
    return;
  }

  for (const [k, v] of Object.entries(SECURITY_HEADERS)) res.setHeader(k, v);
  if (FORCE_HTTPS) res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

  // Dlouhé cache pro hashované assety
  if (req.url?.startsWith('/_astro/')) res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');

  handler(req, res);
});

server.listen(PORT, HOST, () => {
  console.log(`J.P.L. LEŠENÍ web běží na http://${HOST}:${PORT}`);
});
