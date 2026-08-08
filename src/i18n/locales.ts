// ═══════════════════════════════════════════════════════
//  i18n — Locale Metadata & Supported Languages
// ═══════════════════════════════════════════════════════

export const SUPPORTED_LOCALES = ['en', 'sv', 'no', 'da', 'fi', 'it', 'zh', 'ja'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

export interface LocaleMeta {
  code: Locale;
  /** Native name of the language */
  nativeName: string;
  /** Script direction */
  dir: 'ltr' | 'rtl';
  /** BCP 47 tag for <html lang=""> */
  tag: string;
}

export const LOCALE_META: Record<Locale, LocaleMeta> = {
  en: { code: 'en', nativeName: 'English',  dir: 'ltr', tag: 'en' },
  sv: { code: 'sv', nativeName: 'Svenska',  dir: 'ltr', tag: 'sv' },
  no: { code: 'no', nativeName: 'Norsk',    dir: 'ltr', tag: 'no' },
  da: { code: 'da', nativeName: 'Dansk',    dir: 'ltr', tag: 'da' },
  fi: { code: 'fi', nativeName: 'Suomi',    dir: 'ltr', tag: 'fi' },
  it: { code: 'it', nativeName: 'Italiano', dir: 'ltr', tag: 'it' },
  zh: { code: 'zh', nativeName: '中文',     dir: 'ltr', tag: 'zh' },
  ja: { code: 'ja', nativeName: '日本語',   dir: 'ltr', tag: 'ja' },
};

/** Get the href for the same page in another locale */
export function getLocalePath(locale: Locale, path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  // All locales (including default) are prefixed: /en/, /sv/, etc.
  return `/${locale}${cleanPath === '/' ? '/' : cleanPath}`;
}

/** Extract locale from a URL pathname */
export function getLocaleFromPath(pathname: string): Locale {
  const seg = pathname.split('/')[1] as Locale;
  return SUPPORTED_LOCALES.includes(seg) ? seg : DEFAULT_LOCALE;
}
