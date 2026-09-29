/**
 * GitHub Pages (projektová stránka) běží v podadresáři, např. /JPL-le-en-web/.
 * Web používá kořenové odkazy („/reference“), proto po buildu náhledu přepíšeme
 * všechny kořenově-relativní URL v HTML na BASE_PATH. Absolutní URL (https://…) zůstávají.
 *
 * Použití: BASE_PATH=/JPL-le-en-web node scripts/pages-rebase.mjs [dist]
 */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const base = (process.env.BASE_PATH ?? '').replace(/\/$/, '');
const root = process.argv[2] ?? 'dist';
if (!base) {
  console.log('BASE_PATH není nastaven – nic se nepřepisuje.');
  process.exit(0);
}

const fix = (url) => (url.startsWith('/') && !url.startsWith('//') && !url.startsWith(base + '/') ? base + url : url);

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (p.endsWith('.html')) yield p;
  }
}

let n = 0;
for await (const file of walk(root)) {
  let html = await readFile(file, 'utf8');
  html = html
    // jednoduché atributy s jednou URL
    .replace(/\s(href|src|action|data-full|poster)="([^"]*)"/g, (_, a, v) => ` ${a}="${fix(v)}"`)
    // srcset / imagesrcset: seznam „url šířka“
    .replace(/\s(srcset|imagesrcset)="([^"]*)"/g, (_, a, v) =>
      ` ${a}="${v
        .split(',')
        .map((part) => part.trim().replace(/^(\S+)/, (u) => fix(u)))
        .join(', ')}"`,
    )
    // HTML přesměrování (meta refresh) generované pro staré URL
    .replace(/(content="\d+;\s*url=)(\/[^"]*)"/gi, (_, pre, u) => `${pre}${fix(u)}"`);
  await writeFile(file, html);
  n++;
}
console.log(`Přepsáno ${n} HTML souborů na základ ${base}`);
