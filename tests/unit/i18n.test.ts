import { describe, expect, test } from 'bun:test';
import { SUPPORTED_LOCALES, LOCALE_META, getLocalePath, getLocaleFromPath } from '../../src/i18n/locales';
import { useTranslations } from '../../src/i18n/i18n';
import en from '../../src/i18n/en';
import sv from '../../src/i18n/sv';
import no from '../../src/i18n/no';
import da from '../../src/i18n/da';
import fi from '../../src/i18n/fi';
import it from '../../src/i18n/it';
import zh from '../../src/i18n/zh';
import ja from '../../src/i18n/ja';

const allDictionaries = { en, sv, no, da, fi, it, zh, ja };

// Helper to get nested keys from an object (e.g., 'nav.home')
function getObjectKeys(obj: Record<string, any>, prefix = ''): string[] {
  let keys: string[] = [];
  for (const key of Object.keys(obj)) {
    const val = obj[key];
    const newPrefix = prefix ? `${prefix}.${key}` : key;
    if (val && typeof val === 'object' && !Array.isArray(val)) {
      keys = keys.concat(getObjectKeys(val, newPrefix));
    } else {
      keys.push(newPrefix);
    }
  }
  return keys.sort();
}

describe('i18n Translation Key Parity', () => {
  const canonicalKeys = getObjectKeys(en);

  test('English dictionary has non-empty keys', () => {
    expect(canonicalKeys.length).toBeGreaterThan(0);
    for (const key of canonicalKeys) {
      const parts = key.split('.');
      const val = parts.reduce((o, i) => o[i], en as any);
      expect(typeof val).toBe('string');
      expect(val.trim().length).toBeGreaterThan(0);
    }
  });

  for (const locale of SUPPORTED_LOCALES) {
    describe(`Locale: ${locale}`, () => {
      const dict = allDictionaries[locale];
      const localeKeys = getObjectKeys(dict);

      test('has exact key parity with English', () => {
        expect(localeKeys).toEqual(canonicalKeys);
      });

      test('all translation values are non-empty strings', () => {
        for (const key of canonicalKeys) {
          const parts = key.split('.');
          const val = parts.reduce((o, i) => o[i], dict as any);
          expect(typeof val).toBe('string');
          expect(val.trim().length).toBeGreaterThan(0);
        }
      });
    });
  }
});

describe('Locale Metadata & Helpers', () => {
  test('all supported locales have metadata', () => {
    for (const locale of SUPPORTED_LOCALES) {
      const meta = LOCALE_META[locale];
      expect(meta).toBeDefined();
      expect(meta.code).toBe(locale);
      expect(meta.nativeName.length).toBeGreaterThan(0);
      expect(meta.tag.length).toBeGreaterThan(0);
    }
  });

  test('getLocalePath generates valid paths', () => {
    expect(getLocalePath('en', '/')).toBe('/en/');
    expect(getLocalePath('en', '/resume')).toBe('/en/resume');
    expect(getLocalePath('sv', '/projects')).toBe('/sv/projects');
    expect(getLocalePath('ja', '/guestbook')).toBe('/ja/guestbook');
  });

  test('getLocaleFromPath extracts locale correctly', () => {
    expect(getLocaleFromPath('/en/resume')).toBe('en');
    expect(getLocaleFromPath('/sv/projects')).toBe('sv');
    expect(getLocaleFromPath('/ja/')).toBe('ja');
    expect(getLocaleFromPath('/unknown/path')).toBe('en'); // fallback
  });

  test('useTranslations accessor returns correct strings and falls back gracefully', () => {
    const tEn = useTranslations('en');
    expect(tEn('nav', 'home')).toBe('Home');
    expect(tEn('hero', 'name')).toBe('Amarildo');

    const tSv = useTranslations('sv');
    expect(tSv('nav', 'home')).toBe('Hem');
    expect(tSv('hero', 'name')).toBe('Amarildo');
  });
});
