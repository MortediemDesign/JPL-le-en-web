/**
 * Kontrola interních odkazů v sestaveném webu (dist/client) + obsluhovaných SSR/redirect rout.
 * Hlásí odkazy na neexistující stránky a kotvy. Externí odkazy se nekontrolují.
 */
import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

const ROOT = new URL('../dist/client/', import.meta.url).pathname;
const DYNAMIC = new Set(['/poptavka', '/api/poptavka']);

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

const files = await walk(ROOT);
const pages = new Map();
for (const f of files.filter((f) => f.endsWith('.html'))) {
  const route = '/' + relative(ROOT, f).replace(/\.html$/, '').replace(/(^|\/)index$/, '');
  pages.set(route.replace(/\/$/, '') || '/', await readFile(f, 'utf8'));
}
const assets = new Set(files.map((f) => '/' + relative(ROOT, f)));

const idsOf = (html) => new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
const errors = [];
let count = 0;

for (const [route, html] of pages) {
  for (const m of html.matchAll(/\shref="([^"]+)"/g)) {
    const href = m[1].replace(/&amp;/g, '&');
    if (/^(https?:|mailto:|tel:|data:)/.test(href)) continue;
    count++;
    const [pathAndQuery, hash] = href.split('#');
    const path = (pathAndQuery.split('?')[0] || route).replace(/\/$/, '') || '/';
    const exists = pages.has(path) || assets.has(path) || DYNAMIC.has(path);
    if (!exists) {
      errors.push(`${route}: odkaz na neexistující ${href}`);
      continue;
    }
    if (hash && pages.has(path) && !idsOf(pages.get(path)).has(hash)) errors.push(`${route}: chybí kotva ${href}`);
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  console.error(`\n✗ ${errors.length} chybných odkazů z ${count}`);
  process.exit(1);
}
console.log(`✓ ${count} interních odkazů na ${pages.size} stránkách je v pořádku`);
