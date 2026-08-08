// ═══════════════════════════════════════════════════════
//  i18n — Finnish (fi) Translation Strings
// ═══════════════════════════════════════════════════════
export default {
  nav: {
    home:      'Etusivu',
    resume:    'Ansioluettelo',
    projects:  'Projektit',
    guestbook: 'Vieraskirja',
  },
  hero: {
    greeting:   'Hei, nimeni on',
    name:       'Amarildo',
    aka:        'eli',
    handle:     'bl4ckswordsman',
    tagline:    'Kehittäjä · Luoja · Tutkija',
    cta_github: 'Katso GitHub',
    cta_resume: 'Katso ansioluettelo',
  },
  resume: {
    title:         'Ansioluettelo',
    skills:        'Taidot',
    experience:    'Kokemus',
    education:     'Koulutus',
    languages:     'Kielet',
    contact:       'Yhteydenotto',
    present:       'Nykyinen',
    download:      'Lataa PDF',
    view_original: 'Näytä Reactive Resumessa',
  },
  projects: {
    title:              'Projektit',
    subtitle:           'Avoin lähdekoodi GitHubissa',
    stars:              'Tähdet',
    forks:              'Forkit',
    view_on_github:     'Näytä GitHubissa',
    filter_placeholder: 'Suodata projekteja…',
    no_results:         'Mikään projekti ei vastaa suodatustasi.',
    updated:            'Päivitetty',
  },
  guestbook: {
    title:    'Vieraskirja',
    subtitle: 'Jätä kommentti GitHub Discussionsin kautta',
  },
  footer: {
    built_with: 'Rakennettu Astrolla',
    source:     'Lähdekoodi',
  },
  a11y: {
    skip_to_content: 'Siirry pääsisältöön',
    toggle_theme:    'Vaihda väriteema',
    change_language: 'Vaihda kieli',
    open_menu:       'Avaa valikko',
    close_menu:      'Sulje valikko',
    external_link:   'Avautuu uuteen välilehteen',
  },
  theme: {
    light:  'Vaalea',
    dark:   'Tumma',
    system: 'Järjestelmä',
  },
} as const;
