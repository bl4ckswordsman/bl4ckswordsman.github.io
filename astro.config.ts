// ═══════════════════════════════════════════════════════
//  Homepage — Astro Configuration
//  Static site generator targeting GitHub Pages
// ═══════════════════════════════════════════════════════
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://bl4ckswordsman.github.io',
  output: 'static',
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          sv: 'sv',
          no: 'no',
          da: 'da',
          fi: 'fi',
          it: 'it',
          zh: 'zh',
          ja: 'ja',
        },
      },
    }),
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'sv', 'no', 'da', 'fi', 'it', 'zh', 'ja'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  vite: {
    build: {
      cssMinify: true,
    },
  },
});
