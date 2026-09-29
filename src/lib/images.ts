/**
 * Fotografie referencí. Po spuštění `npm run images:migrate` existují lokální WebP
 * v public/images/reference/<oid>-<w>.webp a použijí se. Do té doby se načítají
 * z CMS současného webu (image.php) – ten po přepnutí DNS přestane fungovat,
 * proto je migrace krok P0 před spuštěním (docs/implementation-checklist.md).
 */
import { existsSync } from 'node:fs';
import { join } from 'node:path';

export const WIDTHS = [480, 800, 1200] as const;
const LEGACY = 'https://www.jplleseni.cz/image.php?nid=15093';
const PUBLIC_DIR = join(process.cwd(), 'public');

const localPath = (oid: number, w: number) => `/images/reference/${oid}-${w}.webp`;

export function isMigrated(oid: number): boolean {
  return existsSync(join(PUBLIC_DIR, localPath(oid, WIDTHS[0])));
}

export function photoSrc(oid: number, w: number): string {
  return isMigrated(oid) ? localPath(oid, w) : `${LEGACY}&oid=${oid}&width=${w}`;
}

export function photoSrcset(oid: number): string {
  return WIDTHS.map((w) => `${photoSrc(oid, w)} ${w}w`).join(', ');
}

export const legacyOriginal = (oid: number) => `${LEGACY}&oid=${oid}`;
