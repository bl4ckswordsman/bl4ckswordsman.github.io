// ═══════════════════════════════════════════════════════
//  i18n — Japanese (ja) Translation Strings
// ═══════════════════════════════════════════════════════
export default {
  nav: {
    home:      'ホーム',
    resume:    '履歴書',
    projects:  'プロジェクト',
    guestbook: 'ゲストブック',
  },
  hero: {
    greeting:   'こんにちは、私は',
    name:       'Amarildo',
    aka:        '通称',
    handle:     'bl4ckswordsman',
    tagline:    '開発者 · クリエイター · 探求者',
    cta_github: 'GitHubを見る',
    cta_resume: '履歴書を見る',
  },
  resume: {
    title:         '履歴書',
    skills:        'スキル',
    experience:    '職務経歴',
    education:     '学歴',
    languages:     '言語',
    contact:       'お問い合わせ',
    present:       '現在',
    download:      'PDFをダウンロード',
    view_original: 'Reactive Resumeで見る',
  },
  projects: {
    title:              'プロジェクト',
    subtitle:           'GitHubのオープンソース',
    stars:              'スター',
    forks:              'フォーク',
    view_on_github:     'GitHubで見る',
    filter_placeholder: 'プロジェクトを絞り込む…',
    no_results:         '条件に一致するプロジェクトがありません。',
    updated:            '更新日',
  },
  guestbook: {
    title:    'ゲストブック',
    subtitle: 'GitHub Discussionsからコメントを残してください',
  },
  footer: {
    built_with: 'Astroで構築',
    source:     'ソースコード',
  },
  a11y: {
    skip_to_content: 'メインコンテンツへスキップ',
    toggle_theme:    'カラーテーマを切り替え',
    change_language: '言語を変更',
    open_menu:       'メニューを開く',
    close_menu:      'メニューを閉じる',
    external_link:   '新しいタブで開く',
  },
  theme: {
    light:  'ライト',
    dark:   'ダーク',
    system: 'システム',
  },
} as const;
