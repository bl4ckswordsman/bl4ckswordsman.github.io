// ═══════════════════════════════════════════════════════
//  Reactive Resume — Shared Data Fetcher & Rate-Limit Shield
//  - Guarantees max 1 HTTP request per build (in-memory memoization)
//  - Uses disk cache (.astro/cache) for local dev (prevents rxresu.me 429s)
//  - Stale-while-revalidate fallback for HTTP 429 / 403 / offline errors
// ═══════════════════════════════════════════════════════
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { portfolio } from './portfolio';

export const RXRESUME_USERNAME = 'blackswordsman';
export const RXRESUME_SLUG     = 'a-r-resume';

const CACHE_DIR  = join(process.cwd(), '.astro/cache');
const CACHE_FILE = join(CACHE_DIR, 'rxresume-data.json');
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes local dev cache

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

interface DiskCache {
  timestamp: number;
  rxData: any;
  updatedAtStr: string;
}

let cachedPromise: Promise<ResumeStats> | null = null;

export async function fetchResumeStats(lang: string = 'en'): Promise<ResumeStats> {
  if (cachedPromise) return cachedPromise;

  cachedPromise = (async () => {
    let rxData: any = null;
    let updatedAtStr = '';

    // 1. Try reading valid disk cache first (bypasses rxresu.me rate limits in dev)
    try {
      if (existsSync(CACHE_FILE)) {
        const raw = readFileSync(CACHE_FILE, 'utf-8');
        const disk: DiskCache = JSON.parse(raw);
        if (Date.now() - disk.timestamp < CACHE_TTL_MS && disk.rxData) {
          rxData = disk.rxData;
          updatedAtStr = disk.updatedAtStr;
        }
      }
    } catch {
      // Ignore cache read errors
    }

    // 2. Fetch from rxresu.me if not loaded from cache
    if (!rxData && RXRESUME_USERNAME && RXRESUME_SLUG) {
      try {
        const res = await fetch('https://rxresu.me/api/rpc/resume/getBySlug', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'bl4ckswordsman-homepage-builder',
          },
          body: JSON.stringify({
            json: { username: RXRESUME_USERNAME, slug: RXRESUME_SLUG },
          }),
        });

        if (res.ok) {
          const raw = await res.json();
          rxData = raw?.json?.data || raw?.data?.data || raw?.data || raw;
          updatedAtStr = raw?.json?.updatedAt || rxData?.updatedAt || '';

          // Save to disk cache
          if (rxData) {
            try {
              if (!existsSync(CACHE_DIR)) mkdirSync(CACHE_DIR, { recursive: true });
              const payload: DiskCache = { timestamp: Date.now(), rxData, updatedAtStr };
              writeFileSync(CACHE_FILE, JSON.stringify(payload, null, 2), 'utf-8');
            } catch {
              // Ignore cache write errors
            }
          }
        } else if ((res.status === 429 || res.status === 403) && existsSync(CACHE_FILE)) {
          // Stale-while-revalidate fallback if rate limited
          const raw = readFileSync(CACHE_FILE, 'utf-8');
          const disk: DiskCache = JSON.parse(raw);
          rxData = disk.rxData;
          updatedAtStr = disk.updatedAtStr;
        }
      } catch {
        // Fallback to disk cache if network error
        if (existsSync(CACHE_FILE)) {
          try {
            const raw = readFileSync(CACHE_FILE, 'utf-8');
            const disk: DiskCache = JSON.parse(raw);
            rxData = disk.rxData;
            updatedAtStr = disk.updatedAtStr;
          } catch {
            // Ignore
          }
        }
      }
    }

    // 3. Format last updated date
    let lastUpdated = '';
    if (updatedAtStr) {
      try {
        lastUpdated = new Intl.DateTimeFormat(lang, { dateStyle: 'medium' }).format(
          new Date(updatedAtStr)
        );
      } catch {
        lastUpdated = updatedAtStr;
      }
    }

    // 4. Compute counts
    let skillsCount = portfolio.skills.length;
    let rolesCount = portfolio.experience.length;
    let languagesCount = portfolio.spokenLanguages.length;

    if (rxData?.sections) {
      const skillGroups = rxData.sections.skills?.items?.filter((i: any) => !i.hidden) || [];
      const totalKeywords = skillGroups.reduce(
        (acc: number, item: any) => acc + (item.keywords?.length || 1),
        0
      );
      if (totalKeywords > 0) skillsCount = totalKeywords;

      const expItems = rxData.sections.experience?.items?.filter((i: any) => !i.hidden) || [];
      if (expItems.length > 0) rolesCount = expItems.length;

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
