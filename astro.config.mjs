// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';
import { redirects } from './src/data/redirects.ts';

const NOINDEX = ['/poptavka/odeslano', '/404', '/api/'];

export default defineConfig({
  site: 'https://www.jplleseni.cz',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'directory' },
  adapter: node({ mode: 'standalone', bodySizeLimit: 11 * 1024 * 1024 }),
  session: false,
  // Node adapter vypíná statické HTML redirecty → server vrací skutečné 301.
  redirects: Object.fromEntries(Object.entries(redirects).map(([from, to]) => [from, { status: 301, destination: to }])),
  integrations: [
    sitemap({
      customPages: ['https://www.jplleseni.cz/poptavka'],
      filter: (page) => !NOINDEX.some((p) => new URL(page).pathname.startsWith(p)) && !(new URL(page).pathname in redirects),
    }),
  ],
  security: { checkOrigin: true },
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  image: { remotePatterns: [] },
  devToolbar: { enabled: false },
});
