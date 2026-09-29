/**
 * Ověření skutečného typu přílohy podle magic bytes – přípona sama o sobě nestačí.
 * Nepovolujeme spustitelné soubory ani HTML/SVG (riziko XSS při otevření v poště).
 */
import { fileExtension } from './inquiry';

type Check = (b: Uint8Array) => boolean;

const startsWith = (b: Uint8Array, sig: number[], offset = 0) => sig.every((v, i) => b[offset + i] === v);
const ascii = (b: Uint8Array, from: number, to: number) => String.fromCharCode(...b.slice(from, to));

const CHECKS: Record<string, Check> = {
  pdf: (b) => startsWith(b, [0x25, 0x50, 0x44, 0x46]), // %PDF
  jpg: (b) => startsWith(b, [0xff, 0xd8, 0xff]),
  jpeg: (b) => startsWith(b, [0xff, 0xd8, 0xff]),
  png: (b) => startsWith(b, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  webp: (b) => ascii(b, 0, 4) === 'RIFF' && ascii(b, 8, 12) === 'WEBP',
  heic: (b) => ascii(b, 4, 8) === 'ftyp' && /^(heic|heix|hevc|hevx|mif1|msf1)$/.test(ascii(b, 8, 12)),
  zip: (b) => startsWith(b, [0x50, 0x4b, 0x03, 0x04]) || startsWith(b, [0x50, 0x4b, 0x05, 0x06]),
  dwg: (b) => ascii(b, 0, 2) === 'AC' && /^AC10\d\d$/.test(ascii(b, 0, 6)),
  // DXF je textový formát – ověříme, že jde o čitelný text se sekcí DXF a bez HTML.
  dxf: (b) => {
    const head = new TextDecoder('latin1').decode(b.slice(0, 2048));
    return /SECTION/.test(head) && !/<\s*(script|html|svg)/i.test(head) && !b.slice(0, 2048).includes(0);
  },
};

export const MIME: Record<string, string> = {
  pdf: 'application/pdf',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  heic: 'image/heic',
  zip: 'application/zip',
  dwg: 'application/acad',
  dxf: 'application/dxf',
};

export function sniffMatchesExtension(filename: string, bytes: Uint8Array): boolean {
  const check = CHECKS[fileExtension(filename)];
  return Boolean(check && bytes.length >= 4 && check(bytes));
}

/** Bezpečný název souboru pro přílohu e-mailu. */
export function safeFilename(name: string): string {
  const ext = fileExtension(name);
  const base = name
    .slice(0, name.length - (ext ? ext.length + 1 : 0))
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-zA-Z0-9._-]+/g, '-')
    .replace(/^[-.]+|[-.]+$/g, '')
    .slice(0, 80);
  return `${base || 'priloha'}.${ext}`;
}
