# bl4ckswordsman.github.io

Personal homepage — built with [Astro](https://astro.build), deployed to GitHub Pages.

## Tech stack

| | |
|--|--|
| Framework | Astro (static site generator) |
| Styling | Vanilla CSS — Neo-Brutalist design system |
| i18n | Astro built-in + 8 locales: EN, SV, NO, DA, FI, IT, ZH, JA |
| Guestbook | [Giscus](https://giscus.app) (GitHub Discussions embed) |
| Hosting | GitHub Pages |
| Package manager | Bun |

## Development

```sh
bun install
bun run dev       # dev server at localhost:4321
bun run build     # production build → dist/
bun run preview   # preview built site
```

## i18n

All UI strings live in `src/i18n/<locale>.ts`. To add a new locale:
1. Add the locale code to `SUPPORTED_LOCALES` in `src/i18n/locales.ts`
2. Create `src/i18n/<locale>.ts` with all keys from `en.ts`
3. Add the locale to the `translations` record in `src/i18n/i18n.ts`
4. Add to the `i18n.locales` array in `astro.config.ts`

## Portfolio content

Edit `src/data/portfolio.ts` — no database, no API, just TypeScript.

## Guestbook setup

1. Enable GitHub Discussions on this repo
2. Visit [giscus.app](https://giscus.app) and configure for this repo
3. Fill in `GISCUS_REPO_ID` and `GISCUS_CATEGORY_ID` in `src/components/GiscusComments.astro`

## Deployment

Push to `main` → GitHub Actions builds and deploys automatically.  
Requires GitHub Pages source set to **GitHub Actions** in repo settings.

## Design

Neo-Brutalist design system inherited and enhanced from the re:job project:
- Hard 2px borders with offset box shadows
- Neon accent palette (cyan, yellow, pink, green)
- Space Grotesk (headings) + Inter (body) + JetBrains Mono (code)
- System `prefers-color-scheme` with manual toggle override
- Scroll-driven CSS reveal animations
- `light-dark()` CSS function for theme tokens
- Logical CSS properties for RTL/i18n readiness
- `@layer` cascade architecture
