/**
 * Migrace fotografií a souborů ze současného CMS (image.php / file.php) do projektu.
 * Spustit z prostředí s přístupem na www.jplleseni.cz PŘED přepnutím DNS:
 *   npm run images:migrate
 * Výstup: public/images/reference/<oid>-<480|800|1200>.webp, public/files/*.
 * Vyžaduje balíček `sharp` (nainstaluje se s Astrem).
 */
import { mkdir, readFile, writeFile, access } from 'node:fs/promises';
import sharp from 'sharp';

const BASE = 'https://www.jplleseni.cz';
const WIDTHS = [480, 800, 1200];
const outImg = new URL('../public/images/reference/', import.meta.url);
const outFiles = new URL('../public/files/', import.meta.url);
await mkdir(outImg, { recursive: true });
await mkdir(outFiles, { recursive: true });

const src = await readFile(new URL('../src/data/references.ts', import.meta.url), 'utf8');
const oids = [...new Set([...src.matchAll(/oid:\s*(\d+)/g)].map((m) => m[1]))];

const exists = (u) => access(u).then(() => true, () => false);

let ok = 0;
for (const oid of oids) {
  if (await exists(new URL(`${oid}-${WIDTHS[0]}.webp`, outImg))) {
    ok++;
    continue;
  }
  try {
    const res = await fetch(`${BASE}/image.php?nid=15093&oid=${oid}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    for (const w of WIDTHS) {
      await sharp(buf).rotate().resize({ width: w, withoutEnlargement: true }).webp({ quality: 78 }).toFile(new URL(`${oid}-${w}.webp`, outImg).pathname);
    }
    ok++;
    console.log(`✓ ${oid}`);
  } catch (e) {
    console.error(`✗ ${oid}: ${e.message}`);
  }
}

const files = [
  ['6489838', 'gdpr-informace.pdf'],
  ['6144553', 'logo-dotace.jpg'],
];
for (const [oid, name] of files) {
  try {
    const res = await fetch(`${BASE}/file.php?nid=15093&oid=${oid}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await writeFile(new URL(name, outFiles), Buffer.from(await res.arrayBuffer()));
    console.log(`✓ ${name}`);
  } catch (e) {
    console.error(`✗ ${name}: ${e.message}`);
  }
}
console.log(`Hotovo: ${ok}/${oids.length} fotografií. Po migraci spusťte znovu npm run build.`);
