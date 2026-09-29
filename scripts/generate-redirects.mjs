/**
 * Z src/data/redirects.ts vygeneruje konfigurace 301 pro jiné hostingy než Node:
 *   dist/client/_redirects (Netlify/Cloudflare Pages), dist/client/.htaccess (Apache),
 *   dist/nginx-redirects.conf (nginx include).
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';

const src = await readFile(new URL('../src/data/redirects.ts', import.meta.url), 'utf8');
const pairs = [...src.matchAll(/^\s*'([^']+)':\s*'([^']+)',/gm)].map((m) => [m[1], m[2]]);
const oids = pairs.filter(([k]) => /^\d+$/.test(k));
const paths = pairs.filter(([k]) => k.startsWith('/'));

await mkdir(new URL('../dist/client/', import.meta.url), { recursive: true });

const netlify = [
  ...paths.map(([f, t]) => `${f}  ${t}  301`),
  ...oids.map(([oid, t]) => `/index.php  oid=${oid}  ${t}  301`),
].join('\n');

const htaccess = [
  'RewriteEngine On',
  ...oids.flatMap(([oid, t]) => [`RewriteCond %{QUERY_STRING} (^|&)oid=${oid}(&|$)`, `RewriteRule ^index\\.php$ ${t}? [R=301,L]`]),
  ...paths.map(([f, t]) => `Redirect 301 ${f} ${t}`),
].join('\n');

const nginx = [
  ...paths.map(([f, t]) => `location = ${f} { return 301 ${t}; }`),
  'location = /index.php {',
  ...oids.map(([oid, t]) => `  if ($arg_oid = "${oid}") { return 301 ${t}; }`),
  '  return 301 /;',
  '}',
].join('\n');

await writeFile(new URL('../dist/client/_redirects', import.meta.url), netlify + '\n');
await writeFile(new URL('../dist/client/.htaccess', import.meta.url), htaccess + '\n');
await writeFile(new URL('../dist/nginx-redirects.conf', import.meta.url), nginx + '\n');
console.log(`Redirecty: ${paths.length} cest + ${oids.length} legacy oid → _redirects, .htaccess, nginx-redirects.conf`);
