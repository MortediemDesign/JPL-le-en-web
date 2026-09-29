import { expect, test } from '@playwright/test';
import { blockLegacyImages } from './helpers';

test.beforeEach(({ page }) => blockLegacyImages(page));

async function fillValid(page: import('@playwright/test').Page) {
  await page.getByLabel('Firma').fill('Stavby Test s.r.o.');
  await page.getByLabel('Kontaktní osoba').fill('Jan Novák');
  await page.getByLabel('Telefon').fill('+420 602 440 035');
  await page.getByLabel('E-mail').fill('jan@firma.cz');
  await page.getByLabel('Typ služby').selectOption('pronajem');
  await page.getByLabel('Adresa realizace').fill('Klatovská 1, Plzeň');
  await page.getByLabel('Popis projektu').fill('Fasádní lešení na bytový dům 20 × 12 m.');
  // klávesnicí (Space) – ověřuje zároveň ovládání bez myši
  await page.getByLabel(/Souhlasím/).focus();
  await page.keyboard.press('Space');
  await expect(page.getByLabel(/Souhlasím/)).toBeChecked();
}

test('client-side validace: chyby u polí, souhrn a fokus', async ({ page }) => {
  await page.goto('/poptavka');
  await page.getByRole('button', { name: 'Odeslat poptávku' }).click();
  const alert = page.locator('[data-form-alert]');
  await expect(alert).toBeVisible();
  await expect(alert).toBeFocused();
  await expect(alert).toContainText('Firma');
  await expect(page.getByLabel('Firma')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.locator('#e-email')).toContainText('Vyplňte e-mail');
  // odkaz v souhrnu přesune fokus na pole
  await alert.getByRole('link', { name: 'E-mail' }).click();
  await expect(page.getByLabel('E-mail')).toBeFocused();
});

test('validace při opuštění pole', async ({ page }) => {
  await page.goto('/poptavka');
  await page.getByLabel('E-mail').fill('neplatny');
  await page.getByLabel('Telefon').focus();
  await expect(page.locator('#e-email')).toContainText('jmeno@firma.cz');
});

test('úspěšné odeslání vede na potvrzení', async ({ page }) => {
  await page.goto('/poptavka');
  await page.waitForTimeout(3100); // časová past proti botům
  await fillValid(page);
  await page.getByLabel('Příloha').setInputFiles({ name: 'vykres.pdf', mimeType: 'application/pdf', buffer: Buffer.from('%PDF-1.4 test') });
  await page.getByRole('button', { name: 'Odeslat poptávku' }).click();
  await expect(page).toHaveURL(/\/poptavka\/odeslano$/);
  await expect(page.locator('h1')).toHaveText('Děkujeme, poptávku jsme přijali');
});

test('nepovolená příloha je odmítnuta už v prohlížeči', async ({ page }) => {
  await page.goto('/poptavka');
  await page.getByLabel('Příloha').setInputFiles({ name: 'virus.exe', mimeType: 'application/octet-stream', buffer: Buffer.from('MZ') });
  await expect(page.locator('#e-attachment')).toContainText('Nepodporovaný typ');
});

test('loading stav během odesílání', async ({ page }) => {
  await page.route('**/api/poptavka', async (route) => {
    await new Promise((r) => setTimeout(r, 800));
    await route.fulfill({ status: 502, contentType: 'application/json', body: JSON.stringify({ ok: false, message: 'Technická chyba' }) });
  });
  await page.goto('/poptavka');
  await fillValid(page);
  const btn = page.getByRole('button', { name: /Odeslat|Odesílám/ });
  await btn.click();
  await expect(btn).toBeDisabled();
  await expect(btn).toHaveAttribute('aria-busy', 'true');
  await expect(page.locator('[data-form-alert]')).toContainText('Technická chyba');
  await expect(btn).toBeEnabled();
});

test('předvyplnění služby a střediska z URL', async ({ page }) => {
  await page.goto('/poptavka?sluzba=navrh&stredisko=olomouc');
  await expect(page.getByLabel('Typ služby')).toHaveValue('navrh');
  await expect(page.getByLabel('Středisko')).toHaveValue('olomouc');
});

test.describe('bez JavaScriptu', () => {
  // plynulé scrollování (CSS) + vypnutý JS rozhodí stabilitu prvků v Playwrightu
  test.use({ javaScriptEnabled: false, reducedMotion: 'reduce' });
  test('formulář se odešle klasickým POST', async ({ page }) => {
    await page.goto('/poptavka');
    await fillValid(page);
    await page.getByRole('button', { name: 'Odeslat poptávku' }).click();
    await expect(page).toHaveURL(/\/poptavka\/odeslano$/);
  });
});
