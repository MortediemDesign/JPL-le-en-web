import { expect, test } from '@playwright/test';
import { KEY_PAGES, WIDTHS, blockLegacyImages } from './helpers';

for (const width of WIDTHS) {
  test.describe(`šířka ${width}px`, () => {
    test.use({ viewport: { width, height: 800 } });
    test.beforeEach(({ page }) => blockLegacyImages(page));

    for (const path of KEY_PAGES) {
      test(`${path} – bez horizontálního overflow, viditelné H1 a CTA`, async ({ page }) => {
        const res = await page.goto(path);
        expect(res?.status()).toBe(200);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        expect(overflow, 'horizontální overflow').toBeLessThanOrEqual(0);
        await expect(page.locator('h1')).toBeVisible();
        // CTA „Poptat lešení“ je vždy dostupné (hlavička nebo mobilní lišta)
        if (width >= 420) await expect(page.locator('.header__cta')).toBeVisible();
        if (width < 768) await expect(page.locator('.mobile-bar__cta')).toBeVisible();
      });
    }

    test('navigace funguje', async ({ page }) => {
      await page.goto('/');
      const menuBtn = page.locator('[data-menu-btn]');
      if (width < 1200) {
        await expect(page.locator('#main-nav')).toBeHidden();
        await menuBtn.click();
        await expect(menuBtn).toHaveAttribute('aria-expanded', 'true');
        await expect(page.locator('#main-nav')).toBeVisible();
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        expect(overflow).toBeLessThanOrEqual(0);
        await page.keyboard.press('Escape');
        await expect(menuBtn).toHaveAttribute('aria-expanded', 'false');
        await expect(menuBtn).toBeFocused();
        await menuBtn.click();
        await page.locator('#main-nav').getByRole('link', { name: 'Reference', exact: true }).click();
        await expect(page).toHaveURL(/\/reference$/);
      } else {
        await expect(menuBtn).toBeHidden();
        const toggle = page.locator('[data-sub-toggle]').first();
        await toggle.click();
        await expect(toggle).toHaveAttribute('aria-expanded', 'true');
        await page.getByRole('link', { name: 'Montáž a demontáž' }).first().click();
        await expect(page).toHaveURL(/montaz-a-demontaz-leseni/);
      }
    });
  });
}
