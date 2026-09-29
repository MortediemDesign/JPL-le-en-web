import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) =>
  import.meta.env.PUBLIC_PREVIEW === '1'
    ? new Response('User-agent: *\nDisallow: /\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
    : new Response(
    [
      'User-agent: *',
      'Allow: /',
      'Disallow: /api/',
      'Disallow: /poptavka/odeslano',
      '',
      `Sitemap: ${new URL('sitemap-index.xml', site)}`,
      '',
    ].join('\n'),
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
