// ═══════════════════════════════════════════════════════
//  i18n — Swedish (sv) Translation Strings
// ═══════════════════════════════════════════════════════
export default {
  nav: {
    home:      'Hem',
    resume:    'CV',
    projects:  'Projekt',
    guestbook: 'Gästbok',
  },
  hero: {
    greeting:      'Hej, jag heter',
    name:          'Amarildo',
    aka:           'aka',
    handle:        'bl4ckswordsman',
    tagline:       'Utvecklare · Skapare · Utforskare',
    cta_github:    'Se GitHub',
    cta_resume:    'Se CV',
  },
  resume: {
    title:         'CV',
    skills:        'Färdigheter',
    experience:    'Erfarenhet',
    education:     'Utbildning',
    languages:     'Språk',
    contact:       'Kontakt',
    present:       'Nuvarande',
    download:      'Ladda ner PDF',
    view_original: 'Visa på Reactive Resume',
  },
  projects: {
    title:              'Projekt',
    subtitle:           'Öppen källkod på GitHub',
    stars:              'Stjärnor',
    forks:              'Forks',
    view_on_github:     'Visa på GitHub',
    filter_placeholder: 'Filtrera projekt…',
    no_results:         'Inga projekt matchar ditt filter.',
    updated:            'Uppdaterad',
  },
  guestbook: {
    title:    'Gästbok',
    subtitle: 'Lämna en kommentar via GitHub Discussions',
  },
  footer: {
    built_with: 'Byggd med Astro',
    source:     'Källkod',
  },
  a11y: {
    skip_to_content: 'Hoppa till huvudinnehåll',
    toggle_theme:    'Växla färgtema',
    change_language: 'Byt språk',
    open_menu:       'Öppna meny',
    close_menu:      'Stäng meny',
    external_link:   'Öppnas i ny flik',
  },
  theme: {
    light:  'Ljust',
    dark:   'Mörkt',
    system: 'System',
  },
} as const;
