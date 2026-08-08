// ═══════════════════════════════════════════════════════
//  i18n — Norwegian (no) Translation Strings
// ═══════════════════════════════════════════════════════
export default {
  nav: {
    home:      'Hjem',
    resume:    'CV',
    projects:  'Prosjekter',
    guestbook: 'Gjestebok',
  },
  hero: {
    greeting:   'Hei, jeg heter',
    name:       'Amarildo',
    aka:        'aka',
    handle:     'bl4ckswordsman',
    tagline:    'Utvikler · Skaper · Utforsker',
    cta_github: 'Se GitHub',
    cta_resume: 'Se CV',
  },
  resume: {
    title:         'CV',
    skills:        'Ferdigheter',
    experience:    'Erfaring',
    education:     'Utdanning',
    languages:     'Språk',
    contact:       'Kontakt',
    present:       'Nåværende',
    download:      'Last ned PDF',
    view_original: 'Vis på Reactive Resume',
  },
  projects: {
    title:              'Prosjekter',
    subtitle:           'Åpen kildekode på GitHub',
    stars:              'Stjerner',
    forks:              'Forks',
    view_on_github:     'Vis på GitHub',
    filter_placeholder: 'Filtrer prosjekter…',
    no_results:         'Ingen prosjekter samsvarer med filteret ditt.',
    updated:            'Oppdatert',
  },
  guestbook: {
    title:    'Gjestebok',
    subtitle: 'Legg igjen en kommentar via GitHub Discussions',
  },
  footer: {
    built_with: 'Bygget med Astro',
    source:     'Kildekode',
  },
  a11y: {
    skip_to_content: 'Hopp til hovedinnhold',
    toggle_theme:    'Bytt fargetema',
    change_language: 'Bytt språk',
    open_menu:       'Åpne meny',
    close_menu:      'Lukk meny',
    external_link:   'Åpnes i ny fane',
  },
  theme: {
    light:  'Lyst',
    dark:   'Mørkt',
    system: 'System',
  },
} as const;
