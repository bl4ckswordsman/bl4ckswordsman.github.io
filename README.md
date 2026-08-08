# bl4ckswordsman.github.io

Personal homepage built with [Astro](https://astro.build) and [Bun](https://bun.sh), deployed to GitHub Pages.

## Commands

```sh
bun install
bun run dev     # Dev server at localhost:4321
bun run test    # Run unit, check & E2E tests
bun run build   # Production static build
```

## Features

- **Design**: Neo-Brutalist design system (Space Grotesk, Inter, JetBrains Mono, tactile 2px borders).
- **i18n**: 8 locales (`en`, `sv`, `no`, `da`, `fi`, `it`, `zh`, `ja`) with static route prefixes.
- **Résumé**: Integrated with [Reactive Resume](https://rxresu.me) (`blackswordsman/a-r-resume`) + static fallback.
- **Projects**: Auto-fetches repos from `bl4ckswordsman` & `JoestarLabs` with rate-limit shielding & disk caching.
- **Guestbook**: Powered by [Giscus](https://giscus.app) GitHub Discussions.

## Configuration

- **Translations**: `src/i18n/<locale>.ts`
- **Fallback Data**: `src/data/portfolio.ts`
- **Giscus IDs**: `src/components/GiscusComments.astro`
- **Deployment**: Automatic via GitHub Actions on push to `main`.
