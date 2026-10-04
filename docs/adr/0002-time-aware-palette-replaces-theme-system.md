# 2. Time-aware palette replaces the theme system

Date: 2026-10-04 · Status: accepted

## Context
The old site had light/dark mode, a `/design` ThemeLab with live overrides, and
`src/theme.config.ts` driving every token. The redesign is dark-only ("never a light mode") and
adds a time-aware palette: Dawn 5–8am, Day 8am–5pm, Dusk 5–8pm, Night 8pm–5am.

## Decision
- Delete light mode, ThemeToggle, ThemeLab, OverridePill, `lib/overrides.ts`, `lib/theme.ts`
  and the type-scale machinery in `theme.config.ts`.
- Ship the **Bold** token set (bg, surface, rule, text, muted, accent per palette) as CSS
  custom properties. An inline `<head>` script picks the palette from the visitor's local hour
  before first paint (no flash).
- **Accent follows the palette.** One `--accent` drives link sparkles, card sparkles, focus
  ring and hover underline. The glint is a lighter `color-mix()` of the accent.
- Extra shades in the mockup (raised, card bg, borders) derive from bg/text via `color-mix()`.
  The mockup's "faint" text (#8A867E) fails 4.5:1 on Bold Day, so faint collapses into `muted`.
- A visitor's pick in the palette bubble **locks for the visit** (`sessionStorage`). Next visit
  is Auto again.

## Consequences
The README's base look (#181715 + peach) never appears as such; Dawn is the closest.
Every palette must keep text ≥ 4.5:1 — re-check if a token changes.
