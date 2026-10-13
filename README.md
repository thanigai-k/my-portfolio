# thanigai.dev

Astro + TypeScript + Tailwind 4. Content in Markdoc. Dark only, with a time-aware palette.

```bash
pnpm dev      # http://localhost:4321 (drafts visible here only)
pnpm build    # static output in dist/, drafts excluded
```

Design source of truth: the "Confirmed | Handoff" page of the
[design canvas](https://claude.ai/artifact/CBPKwqEqL9d1meWaaK4tsJ). Vocabulary: `CONTEXT.md`.
Decisions and why: `docs/adr/`.

## Where things live

| File                    | What it controls                                                            |
| ----------------------- | --------------------------------------------------------------------------- |
| `content/**/*.mdoc`     | Every word on the site.                                                     |
| `src/site.config.ts`    | Name, role line, email, social links.                                       |
| `src/styles/global.css` | The four palettes (Dawn, Day, Dusk, Night) and the only colours that exist. |

Routes: `/`, `/writing`, `/writing/[slug]`. Old routes redirect (`astro.config.mjs`).

## Writing content

```
content/
  pages/home.mdoc   bio
  writing/          posts        · title, date, topic, summary, hero?, tldr?, draft
  experiences/      job history  · role, company, period, summary?, order (Home shows the top 3)
  projects/         projects     · title, tagline, summary, order, href (site or GitHub), draft
```

`draft: true` renders in `pnpm dev` and is stripped from `pnpm build`.

Post hero slot, first match wins: `hero` → `tldr` (up to 3 bullets) → nothing.

## Still to do

- The four posts in `content/writing/` are **placeholders** ("[To write: …]"). Replace them before promoting v2.
