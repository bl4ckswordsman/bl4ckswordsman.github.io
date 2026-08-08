import { describe, expect, test, beforeAll } from 'bun:test';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { SUPPORTED_LOCALES, LOCALE_META } from '../../src/i18n/locales';

const DIST_DIR = join(import.meta.dir, '../../dist');
const PAGES = ['', 'resume', 'projects', 'guestbook'];

describe('Build Output Sanity & Regression Tests', () => {
  beforeAll(() => {
    if (!existsSync(DIST_DIR)) {
      throw new Error(`dist directory does not exist at ${DIST_DIR}. Please run 'bun run build' before running e2e tests.`);
    }
  });

  test('sitemap-index.xml and robots.txt exist and are non-empty', () => {
    const sitemapPath = join(DIST_DIR, 'sitemap-index.xml');
    const robotsPath = join(DIST_DIR, 'robots.txt');

    expect(existsSync(sitemapPath)).toBe(true);
    expect(existsSync(robotsPath)).toBe(true);

    const robotsContent = readFileSync(robotsPath, 'utf-8');
    expect(robotsContent).toContain('User-agent: *');
    expect(robotsContent).toContain('Sitemap: https://bl4ckswordsman.github.io/sitemap-index.xml');
  });

  test('root index.html performs redirect to /en/', () => {
    const rootIndexPath = join(DIST_DIR, 'index.html');
    expect(existsSync(rootIndexPath)).toBe(true);
    const content = readFileSync(rootIndexPath, 'utf-8');
    expect(content).toContain('url=/en/');
  });

  for (const locale of SUPPORTED_LOCALES) {
    const meta = LOCALE_META[locale];

    describe(`Locale: ${locale}`, () => {
      for (const page of PAGES) {
        const relativePath = page ? `${locale}/${page}/index.html` : `${locale}/index.html`;
        const filePath = join(DIST_DIR, relativePath);

        test(`generates valid HTML file at ${relativePath}`, () => {
          expect(existsSync(filePath)).toBe(true);
          const html = readFileSync(filePath, 'utf-8');
          expect(html.length).toBeGreaterThan(100);

          // HTML & Accessibility structure
          expect(html).toContain(`lang="${meta.tag}"`);
          expect(html).toContain('class="skip-link"');
          expect(html).toContain('href="#main-content"');

          // Brand logo - single color without mid-word span split
          expect(html).toContain('class="header__brand"');
          expect(html).not.toContain('<span class="header__brand-accent">bl4ck</span>swordsman');

          // Hreflang alternate links for all locales
          for (const altLocale of SUPPORTED_LOCALES) {
            const altMeta = LOCALE_META[altLocale];
            expect(html).toContain(`hreflang="${altMeta.tag}"`);
          }

          // Page title
          expect(html).toMatch(/<title>.*bl4ckswordsman.*<\/title>/i);
        });
      }

      test(`homepage contains personalized name "Amarildo"`, () => {
        const filePath = join(DIST_DIR, `${locale}/index.html`);
        const html = readFileSync(filePath, 'utf-8');
        expect(html).toContain('Amarildo');
        expect(html).toContain('bl4ckswordsman');
      });
    });
  }
});
