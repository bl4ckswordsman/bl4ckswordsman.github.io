// ═══════════════════════════════════════════════════════
//  i18n — Translation Helper
//  Usage: const t = useTranslations(lang);
//         t('nav', 'home') → "Home" | "Hem" | …
// ═══════════════════════════════════════════════════════
import type { Locale } from './locales';
import en from './en';
import sv from './sv';
import no from './no';
import da from './da';
import fi from './fi';
import it from './it';
import zh from './zh';
import ja from './ja';

// Define abstract dictionary structure matching English keys with string values
export type DeepStringObject<T> = {
  [K in keyof T]: T[K] extends string ? string : DeepStringObject<T[K]>;
};

export type Translations = DeepStringObject<typeof en>;

const translations: Record<Locale, Translations> = { en, sv, no, da, fi, it, zh, ja };

/**
 * Returns a strongly-typed translation accessor for the given locale.
 * Falls back to English for any missing key.
 */
export function useTranslations(locale: Locale) {
  const dict = translations[locale] ?? translations.en;

  return function t<
    Section extends keyof Translations,
    Key extends keyof Translations[Section]
  >(
    section: Section,
    key: Key
  ): string {
    const sectionDict = (dict as Translations)[section] as Record<string, string>;
    const fallback = (translations.en[section] as Record<string, string>)[key as string];
    return sectionDict[key as string] ?? fallback ?? `${String(section)}.${String(key)}`;
  };
}
