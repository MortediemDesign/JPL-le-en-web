// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';
import { redirects } from './src/data/redirects.ts';

const NOINDEX = ['/poptavka/odeslano', '/404', '/api/'];

/**
 * PUBLIC_PREVIEW=1 → čistě statický náhled (GitHub Pages): bez Node serveru, formulář v demo režimu,
 * vše noindex. Viz .github/workflows/pages.yml a scripts/pages-rebase.mjs.
 */
const PREVIEW = process.env.PUBLIC_PREVIEW === '1';

/** V náhledu se všechny routy (i /poptavka) prerenderují, serverové endpointy se vynechají. */
const previewStatic = {
  name: 'preview-static',
  hooks: {
    /** @param {{ route: { component: string; prerender?: boolean } }} opts */
    'astro:route:setup': ({ route }) => {
      route.prerender = true;
    },
  },
};

export default defineConfig({
  site: 'https://www.jplleseni.cz',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'directory' },
  ...(PREVIEW
    ? {}
    : {
        adapter: node({ mode: 'standalone', bodySizeLimit: 11 * 1024 * 1024 }),
        session: false,
      }),
  // S Node adapterem → skutečné 301; ve statickém náhledu → HTML přesměrování.
  redirects: Object.fromEntries(Object.entries(redirects).map(([from, to]) => [from, { status: 301, destination: to }])),
  integrations: PREVIEW
    ? [previewStatic]
    : [
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
