/** Legacy URL CMS Antee: /index.php?oid=… → 301 na novou stránku (SK úvod apod.). */
import type { APIRoute } from 'astro';
import { legacyOidRedirects } from '../data/redirects';

export const prerender = false;

export const GET: APIRoute = ({ url }) => {
  const target = legacyOidRedirects[url.searchParams.get('oid') ?? ''] ?? '/';
  return new Response(null, { status: 301, headers: { Location: target } });
};
