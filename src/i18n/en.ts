// ═══════════════════════════════════════════════════════
//  i18n — English (default) Translation Strings
// ═══════════════════════════════════════════════════════
export default {
  // ── Navigation ────────────────────────────────────────
  nav: {
    home:      'Home',
    resume:    'Résumé',
    projects:  'Projects',
    guestbook: 'Guestbook',
  },
  // ── Hero ──────────────────────────────────────────────
  hero: {
    greeting:      'Hello, I\'m',
    name:          'Amarildo',
    aka:           'aka',
    handle:        'bl4ckswordsman',
    tagline:       'Developer · Creator · Explorer',
    cta_github:    'View GitHub',
    cta_resume:    'View Résumé',
  },
  // ── Portfolio ─────────────────────────────────────────
  resume: {
    title:          'Résumé',
    skills:         'Skills',
    experience:     'Experience',
    education:      'Education',
    languages:      'Languages',
    contact:        'Contact',
    present:        'Present',
    download:       'Download PDF',
    view_original:  'View on Reactive Resume',
  },
  // ── Projects ──────────────────────────────────────────
  projects: {
    title:          'Projects',
    subtitle:       'Open source work on GitHub',
    stars:          'Stars',
    forks:          'Forks',
    view_on_github: 'View on GitHub',
    filter_placeholder: 'Filter projects…',
    no_results:     'No projects match your filter.',
    updated:        'Updated',
  },
  // ── Guestbook ─────────────────────────────────────────
  guestbook: {
    title:    'Guestbook',
    subtitle: 'Leave a comment via GitHub Discussions',
  },
  // ── Footer ────────────────────────────────────────────
  footer: {
    built_with: 'Built with Astro',
    source:     'Source',
  },
  // ── Accessibility ─────────────────────────────────────
  a11y: {
    skip_to_content:   'Skip to main content',
    toggle_theme:      'Toggle colour theme',
    change_language:   'Change language',
    open_menu:         'Open menu',
    close_menu:        'Close menu',
    external_link:     'Opens in new tab',
  },
  // ── Theme ─────────────────────────────────────────────
  theme: {
    light: 'Light',
    dark:  'Dark',
    system: 'System',
  },
} as const;
