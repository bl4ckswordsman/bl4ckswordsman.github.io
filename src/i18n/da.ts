// ═══════════════════════════════════════════════════════
//  i18n — Danish (da) Translation Strings
// ═══════════════════════════════════════════════════════
export default {
  nav: {
    home:      'Hjem',
    resume:    'CV',
    projects:  'Projekter',
    guestbook: 'Gæstebog',
  },
  hero: {
    greeting:   'Hej, jeg hedder',
    name:       'Amarildo',
    aka:        'aka',
    handle:     'bl4ckswordsman',
    tagline:    'Udvikler · Skaber · Udforsker',
    cta_github: 'Se GitHub',
    cta_resume: 'Se CV',
  },
  resume: {
    title:         'CV',
    skills:        'Færdigheder',
    experience:    'Erfaring',
    education:     'Uddannelse',
    languages:     'Sprog',
    contact:       'Kontakt',
    present:       'Nuværende',
    download:      'Download PDF',
    view_original: 'Vis på Reactive Resume',
  },
  projects: {
    title:              'Projekter',
    subtitle:           'Open source på GitHub',
    stars:              'Stjerner',
    forks:              'Forks',
    view_on_github:     'Se på GitHub',
    filter_placeholder: 'Filtrer projekter…',
    no_results:         'Ingen projekter matcher dit filter.',
    updated:            'Opdateret',
  },
  guestbook: {
    title:    'Gæstebog',
    subtitle: 'Skriv en kommentar via GitHub Discussions',
  },
  footer: {
    built_with: 'Bygget med Astro',
    source:     'Kildekode',
  },
  a11y: {
    skip_to_content: 'Spring til hovedindhold',
    toggle_theme:    'Skift farvetema',
    change_language: 'Skift sprog',
    open_menu:       'Åbn menu',
    close_menu:      'Luk menu',
    external_link:   'Åbnes i ny fane',
  },
  theme: {
    light:  'Lyst',
    dark:   'Mørkt',
    system: 'System',
  },
} as const;
