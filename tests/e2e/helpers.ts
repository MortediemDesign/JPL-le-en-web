import type { Page } from '@playwright/test';

export const WIDTHS = [320, 375, 390, 768, 1024, 1280, 1440];

export const KEY_PAGES = [
  '/',
  '/pronajem-leseni',
  '/peri-leseni',
  '/typy-leseni',
  '/reference',
  '/reference/jezuitsky-kostel-klatovy',
  '/o-nas',
  '/strediska',
  '/strediska/karlovy-vary',
  '/kontakty',
  '/poptavka',
];

/**
 * Fotografie se zatím načítají z CMS současného webu (image.php). Ve vývojovém prostředí
 * může být doména nedostupná – požadavky na ni blokujeme, aby testy byly deterministické.
 */
export async function blockLegacyImages(page: Page) {
  await page.route(/www\.jplleseni\.cz\/(image|file)\.php/, (route) => route.abort());
}

export async function allSitemapPaths(page: Page): Promise<string[]> {
  const res = await page.request.get('/sitemap-0.xml');
  const xml = await res.text();
  return [...xml.matchAll(/<loc>https:\/\/www\.jplleseni\.cz([^<]*)<\/loc>/g)].map((m) => m[1] || '/');
}
