import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { KEY_PAGES, allSitemapPaths, blockLegacyImages } from './helpers';

test.beforeEach(({ page }) => blockLegacyImages(page));

for (const path of KEY_PAGES) {
  test(`WCAG 2.2 AA (axe): ${path}`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
    const summary = results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`);
    expect(summary).toEqual([]);
  });
}

test('SEO: každá stránka ze sitemap má 1× H1, unikátní title/description, canonical, OG a alt texty', async ({ page }) => {
  test.setTimeout(120_000);
  const paths = await allSitemapPaths(page);
  expect(paths.length).toBeGreaterThan(30);
  const titles = new Map<string, string>();
  const descs = new Map<string, string>();
  for (const path of paths) {
    const res = await page.goto(path);
    expect(res?.status(), `${path} HTTP status`).toBe(200);
    await expect(page.locator('h1'), path).toHaveCount(1);
    const title = await page.title();
    const desc = (await page.locator('meta[name="description"]').getAttribute('content')) ?? '';
    expect(title.length, `${path} title`).toBeLessThanOrEqual(75);
    expect(desc.length, `${path} description`).toBeGreaterThan(50);
    expect(titles.has(title), `duplicitní title ${path} = ${titles.get(title)}`).toBe(false);
    expect(descs.has(desc), `duplicitní description ${path} = ${descs.get(desc)}`).toBe(false);
    titles.set(title, path);
    descs.set(desc, path);
    await expect(page.locator('link[rel="canonical"]'), path).toHaveAttribute('href', `https://www.jplleseni.cz${path}`);
    await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
    expect(await page.locator('img:not([alt])').count(), `${path} img bez alt`).toBe(0);
    const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
    for (const j of ld) expect(() => JSON.parse(j)).not.toThrow();
    expect(ld.join('')).not.toMatch(/aggregateRating|"Review"/);
  }
});

test('konzole prohlížeče je bez chyb', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (m) => {
    // chyby načtení blokovaných legacy obrázků ignorujeme
    if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errors.push(`${page.url()}: ${m.text()}`);
  });
  page.on('pageerror', (e) => errors.push(`${page.url()}: ${e.message}`));
  for (const path of [...KEY_PAGES, '/sluzby', '/kariera', '/neexistuje']) {
    await page.goto(path);
    await page.waitForLoadState('networkidle');
  }
  expect(errors).toEqual([]);
});

test('404 stránka vrací HTTP 404', async ({ page }) => {
  const res = await page.goto('/tato-stranka-neexistuje');
  expect(res?.status()).toBe(404);
  await expect(page.locator('h1')).toHaveText('Tuto stránku jsme nenašli');
});

test('301 přesměrování starých URL', async ({ request }) => {
  for (const [from, to] of [
    ['/praha', '/strediska/praha'],
    ['/aktuality', '/kariera'],
    ['/index.php?oid=5181522', '/strediska/slovensko'],
    ['/prodej-haki-leseni', '/prodej-leseni'],
  ]) {
    const res = await request.get(from, { maxRedirects: 0 });
    expect(res.status(), from).toBe(301);
    expect(new URL(res.headers().location, 'http://x').pathname).toBe(to);
  }
});

test('klávesnice: skip link a viditelný fokus', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Přeskočit na obsah' });
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#obsah$/);
});

test('hero obrázek (LCP) se nenačítá líně', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.hero img')).toHaveAttribute('loading', 'eager');
  await expect(page.locator('.hero img')).toHaveAttribute('fetchpriority', 'high');
  await expect(page.locator('link[rel="preload"][as="image"]')).toHaveCount(1);
});
