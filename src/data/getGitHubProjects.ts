// ═══════════════════════════════════════════════════════
//  GitHub API — Clever Caching & Rate-Limit Shield
//  - Guarantees max 1 HTTP request per build (in-memory memoization)
//  - Uses disk cache (.astro/cache) for local dev (bypasses 60/hr limit)
//  - Handles HTTP 403/429 rate-limiting with graceful stale fallback
//  - Automatically picks up GITHUB_TOKEN / GH_TOKEN env vars
// ═══════════════════════════════════════════════════════
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import type { GitHubRepo } from './types';

const GITHUB_USERNAME = 'bl4ckswordsman';
const GITHUB_ORGS     = ['JoestarLabs'];

const CACHE_DIR  = join(process.cwd(), '.astro/cache');
const CACHE_FILE = join(CACHE_DIR, 'github-projects.json');
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes local dev cache

interface DiskCache {
  timestamp: number;
  repos: GitHubRepo[];
}

let cachedPromise: Promise<GitHubRepo[]> | null = null;

export async function fetchGitHubProjects(): Promise<GitHubRepo[]> {
  if (cachedPromise) return cachedPromise;

  cachedPromise = (async () => {
    // 1. Try reading valid disk cache first (bypasses GitHub rate limit in local dev)
    try {
      if (existsSync(CACHE_FILE)) {
        const raw = readFileSync(CACHE_FILE, 'utf-8');
        const disk: DiskCache = JSON.parse(raw);
        if (Date.now() - disk.timestamp < CACHE_TTL_MS && disk.repos.length > 0) {
          return disk.repos;
        }
      }
    } catch {
      // Ignore cache read errors
    }

    // 2. Prepare headers with auto-token detection
    const token =
      import.meta.env.GITHUB_TOKEN ||
      import.meta.env.GH_TOKEN ||
      process.env.GITHUB_TOKEN ||
      process.env.GH_TOKEN;

    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'bl4ckswordsman-homepage-builder',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    try {
      const userReq = fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed&type=owner`,
        { headers }
      );

      const orgReqs = GITHUB_ORGS.map((org) =>
        fetch(`https://api.github.com/orgs/${org}/repos?per_page=100&sort=pushed`, { headers })
      );

      const responses = await Promise.all([userReq, ...orgReqs]);
      let combined: GitHubRepo[] = [];
      let rateLimited = false;

      for (const res of responses) {
        if (res.status === 403 || res.status === 429) {
          rateLimited = true;
          break;
        }
        if (res.ok) {
          const list: GitHubRepo[] = await res.json();
          combined = combined.concat(list);
        }
      }

      // If rate limited, fall back to stale disk cache if available
      if (rateLimited && existsSync(CACHE_FILE)) {
        const raw = readFileSync(CACHE_FILE, 'utf-8');
        const disk: DiskCache = JSON.parse(raw);
        if (disk.repos.length > 0) return disk.repos;
      }

      const filtered = combined
        .filter((r) => !r.fork && !r.archived && r.name !== '.github')
        .sort((a, b) => b.stargazers_count - a.stargazers_count);

      // Save to disk cache for future dev runs
      if (filtered.length > 0) {
        try {
          if (!existsSync(CACHE_DIR)) mkdirSync(CACHE_DIR, { recursive: true });
          const payload: DiskCache = { timestamp: Date.now(), repos: filtered };
          writeFileSync(CACHE_FILE, JSON.stringify(payload, null, 2), 'utf-8');
        } catch {
          // Ignore write errors
        }
      }

      return filtered;
    } catch {
      // Emergency fallback to disk cache if fetch failed entirely (e.g. offline)
      if (existsSync(CACHE_FILE)) {
        try {
          const raw = readFileSync(CACHE_FILE, 'utf-8');
          const disk: DiskCache = JSON.parse(raw);
          return disk.repos;
        } catch {
          // Ignore
        }
      }
      return [];
    }
  })();

  return cachedPromise;
}
