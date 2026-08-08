// ═══════════════════════════════════════════════════════
//  Reactive Resume — Shared Data Fetcher & Aggregator
//  Fetches once at build time and computes stats cleanly
// ═══════════════════════════════════════════════════════
import { portfolio } from './portfolio';

export const RXRESUME_USERNAME = 'blackswordsman';
export const RXRESUME_SLUG     = 'a-r-resume';

export interface RxResumeExperienceItem {
  id: string;
  hidden?: boolean;
  position?: string;
  company?: string;
  period?: string;
  location?: string;
  description?: string;
}

export interface RxResumeEducationItem {
  id: string;
  hidden?: boolean;
  degree?: string;
  area?: string;
  school?: string;
  period?: string;
  location?: string;
  description?: string;
}

export interface RxResumeSkillItem {
  id: string;
  hidden?: boolean;
  name?: string;
  proficiency?: string;
  keywords?: string[];
}

export interface RxResumeLanguageItem {
  id: string;
  hidden?: boolean;
  language?: string;
  fluency?: string;
  level?: number;
}

export interface RxResumeCertificationItem {
  id: string;
  hidden?: boolean;
  title?: string;
  issuer?: string;
  date?: string;
  website?: { url?: string; label?: string };
  description?: string;
}

export interface RxResumeProjectItem {
  id: string;
  hidden?: boolean;
  name?: string;
  period?: string;
  website?: { url?: string; label?: string };
  description?: string;
}

export interface ResumeStats {
  skillsCount: number;
  rolesCount: number;
  languagesCount: number;
  rxData: any | null;
  lastUpdated: string;
}

let cachedPromise: Promise<ResumeStats> | null = null;

export async function fetchResumeStats(lang: string = 'en'): Promise<ResumeStats> {
  if (cachedPromise) return cachedPromise;

  cachedPromise = (async () => {
    let rxData: any = null;
    let lastUpdated = '';

    if (RXRESUME_USERNAME && RXRESUME_SLUG) {
      try {
        const res = await fetch('https://rxresu.me/api/rpc/resume/getBySlug', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            json: { username: RXRESUME_USERNAME, slug: RXRESUME_SLUG },
          }),
        });
        if (res.ok) {
          const raw = await res.json();
          rxData = raw?.json?.data || raw?.data?.data || raw?.data || raw;
          if (raw?.json?.updatedAt || rxData?.updatedAt) {
            const dateStr = raw?.json?.updatedAt || rxData?.updatedAt;
            lastUpdated = new Intl.DateTimeFormat(lang, { dateStyle: 'medium' }).format(
              new Date(dateStr)
            );
          }
        }
      } catch {
        // Fall back to static portfolio data below
      }
    }

    let skillsCount = portfolio.skills.length;
    let rolesCount = portfolio.experience.length;
    let languagesCount = portfolio.spokenLanguages.length;

    if (rxData?.sections) {
      // Skills: count keywords across groups if present, otherwise group items
      const skillGroups = rxData.sections.skills?.items?.filter((i: any) => !i.hidden) || [];
      const totalKeywords = skillGroups.reduce(
        (acc: number, item: any) => acc + (item.keywords?.length || 1),
        0
      );
      if (totalKeywords > 0) skillsCount = totalKeywords;

      // Roles / Experience
      const expItems = rxData.sections.experience?.items?.filter((i: any) => !i.hidden) || [];
      if (expItems.length > 0) rolesCount = expItems.length;

      // Languages
      const langItems = rxData.sections.languages?.items?.filter((i: any) => !i.hidden) || [];
      if (langItems.length > 0) languagesCount = langItems.length;
    }

    return {
      skillsCount,
      rolesCount,
      languagesCount,
      rxData,
      lastUpdated,
    };
  })();

  return cachedPromise;
}
