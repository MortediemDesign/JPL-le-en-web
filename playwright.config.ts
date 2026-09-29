import { defineConfig } from '@playwright/test';
import { existsSync } from 'node:fs';

const PORT = 4401;
// Předinstalovaný Chromium v CI/cloud prostředí; lokálně se použije Chromium z Playwright.
const executablePath = ['/opt/pw-browsers/chromium-1194/chrome-linux/chrome'].find((p) => existsSync(p));

export default defineConfig({
  testDir: 'tests/e2e',
  timeout: 30_000,
  fullyParallel: true,
  reporter: [['list']],
  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    locale: 'cs-CZ',
    launchOptions: executablePath ? { executablePath } : {},
  },
  webServer: {
    command: `npm run build && PORT=${PORT} node server.mjs`,
    url: `http://127.0.0.1:${PORT}/`,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
