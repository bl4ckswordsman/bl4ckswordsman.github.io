// ═══════════════════════════════════════════════════════
//  Data — TypeScript Type Definitions
// ═══════════════════════════════════════════════════════

export interface Skill {
  name: string;
  /** Group the skill belongs to */
  category: 'language' | 'framework' | 'tool' | 'platform' | 'database' | 'other';
}

export interface TimelineEntry {
  title: string;
  organisation: string;
  location?: string;
  startDate: string;    // ISO year or year-month
  endDate?: string;     // omit → "Present"
  description?: string;
  highlights?: string[];
}

export interface SpokenLanguage {
  /** Language name in English */
  name: string;
  /** Proficiency level */
  level: 'native' | 'fluent' | 'professional' | 'conversational' | 'basic';
}

export interface SocialLink {
  platform: string;
  url: string;
  /** Inline SVG path (d attribute) for a simple 24×24 icon */
  iconPath?: string;
  label: string;
}

export interface Portfolio {
  skills: Skill[];
  experience: TimelineEntry[];
  education: TimelineEntry[];
  spokenLanguages: SpokenLanguage[];
  socials: SocialLink[];
  /** Contact email — public */
  email?: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  pushed_at: string;
  fork: boolean;
  archived: boolean;
}
