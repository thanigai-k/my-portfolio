# thanigai.dev

Astro 5 + TypeScript + Tailwind 4. Content in Markdoc, design in one config file.

```bash
npm run dev      # http://localhost:4321 (drafts visible here only)
npm run build    # static output in dist/, drafts excluded
```

## The two files you'll actually edit

| File | What it controls |
|---|---|
| `src/theme.config.ts` | Every font, size, line-height, weight, colour, column width, radius, and transition. |
| `content/**/*.mdoc` | Every word on the site. |

Nothing else hard-codes a colour or a size — components read CSS variables generated from the
config. `rg '#[0-9a-fA-F]{6}' src/components src/pages` returns nothing, and it should stay that way.

## Tweaking the design

Open **`/design`**. Sliders and colour pickers write CSS variables live, so the whole site
(including that page) updates as you drag. State survives reloads; a pill at the bottom reminds you
overrides are active.

When you like it → **copy config** → paste over the `theme` object in `src/theme.config.ts` →
**reset**. What you saw is now what builds.

Adding a font: add a row to `FONT_CATALOG` in `src/theme.config.ts` — name and axis exactly as
Google Fonts spells them — and it appears in the `/design` dropdowns.

## Writing content

```
content/
  pages/         home, about, contact — the landing copy
  writing/       posts        · title, date, tag, summary, draft
  work/          case studies · title, summary, hero, order, draft
  experiences/   job history  · role, company, period, order, stack
  projects/      side work    · title, summary, order, stack, href
```

`draft: true` renders in `npm run dev` and is stripped from `npm run build`. The two files
currently marked draft (`content/writing/first-post.mdoc`, `content/work/earth-design-system.mdoc`)
are placeholders — overwrite them and flip the flag.

Prose picks up the `prose` type token, so long-form copy scales with the config like everything else.

## Navigation

`src/site.config.ts`. `rail: true` puts a link in the desktop left rail, `tab: true` puts it in the
mobile bottom bar; everything in the list appears in the mobile **More** sheet regardless.

## Still to do

- Replace the placeholder avatar: drop a photo at `public/avatar.jpg` and change `site.avatar`.
- Replace the two draft stubs with real writing and a real case study.
