// ═══════════════════════════════════════════════════════
//  i18n — Italian (it) Translation Strings
// ═══════════════════════════════════════════════════════
export default {
  nav: {
    home:      'Home',
    resume:    'Curriculum',
    projects:  'Progetti',
    guestbook: 'Libro degli ospiti',
  },
  hero: {
    greeting:   'Ciao, mi chiamo',
    name:       'Amarildo',
    aka:        'alias',
    handle:     'bl4ckswordsman',
    tagline:    'Sviluppatore · Creatore · Esploratore',
    cta_github: 'Vedi GitHub',
    cta_resume: 'Vedi curriculum',
  },
  resume: {
    title:         'Curriculum',
    skills:        'Competenze',
    experience:    'Esperienza',
    education:     'Formazione',
    languages:     'Lingue',
    contact:       'Contatti',
    present:       'Presente',
    download:      'Scarica PDF',
    view_original: 'Vedi su Reactive Resume',
  },
  projects: {
    title:              'Progetti',
    subtitle:           'Open source su GitHub',
    stars:              'Stelle',
    forks:              'Fork',
    view_on_github:     'Vedi su GitHub',
    filter_placeholder: 'Filtra progetti…',
    no_results:         'Nessun progetto corrisponde al filtro.',
    updated:            'Aggiornato',
  },
  guestbook: {
    title:    'Libro degli ospiti',
    subtitle: 'Lascia un commento tramite GitHub Discussions',
  },
  footer: {
    built_with: 'Realizzato con Astro',
    source:     'Sorgente',
  },
  a11y: {
    skip_to_content: 'Salta al contenuto principale',
    toggle_theme:    'Cambia tema colore',
    change_language: 'Cambia lingua',
    open_menu:       'Apri menu',
    close_menu:      'Chiudi menu',
    external_link:   'Si apre in una nuova scheda',
  },
  theme: {
    light:  'Chiaro',
    dark:   'Scuro',
    system: 'Sistema',
  },
} as const;
