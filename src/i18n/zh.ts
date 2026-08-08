// ═══════════════════════════════════════════════════════
//  i18n — Chinese Simplified (zh) Translation Strings
// ═══════════════════════════════════════════════════════
export default {
  nav: {
    home:      '首页',
    resume:    '简历',
    projects:  '项目',
    guestbook: '留言板',
  },
  hero: {
    greeting:   '您好，我是',
    name:       'Amarildo',
    aka:        '又名',
    handle:     'bl4ckswordsman',
    tagline:    '开发者 · 创作者 · 探索者',
    cta_github: '查看 GitHub',
    cta_resume: '查看简历',
  },
  resume: {
    title:         '简历',
    skills:        '技能',
    experience:    '工作经验',
    education:     '教育背景',
    languages:     '语言能力',
    contact:       '联系方式',
    present:       '至今',
    download:      '下载 PDF',
    view_original: '在 Reactive Resume 上查看',
  },
  projects: {
    title:              '项目',
    subtitle:           'GitHub 上的开源项目',
    stars:              '星标',
    forks:              'Fork',
    view_on_github:     '在 GitHub 上查看',
    filter_placeholder: '筛选项目…',
    no_results:         '没有项目匹配您的筛选条件。',
    updated:            '更新时间',
  },
  guestbook: {
    title:    '留言板',
    subtitle: '通过 GitHub Discussions 留言',
  },
  footer: {
    built_with: '由 Astro 构建',
    source:     '源代码',
  },
  a11y: {
    skip_to_content: '跳转到主内容',
    toggle_theme:    '切换颜色主题',
    change_language: '切换语言',
    open_menu:       '打开菜单',
    close_menu:      '关闭菜单',
    external_link:   '在新标签页中打开',
  },
  theme: {
    light:  '浅色',
    dark:   '深色',
    system: '跟随系统',
  },
} as const;
