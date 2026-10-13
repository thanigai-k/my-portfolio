# 4. Tailwind only, no React

Date: 2026-10-04 · Status: accepted

## Context

Every React island (ThemeLab, ThemeToggle, MobileTabBar, OverridePill) is removed by the redesign.
The remaining interactions (palette bubble, keyboard welcome, /writing filter) are small.

## Decision

- Drop `react`, `react-dom`, `@astrojs/react`. Interactions are vanilla `<script>`s inside the
  Astro component that owns the markup.
- Style with **Tailwind v4 only**: utilities in markup; reuse comes from Astro components, not
  `@apply`. `src/styles/global.css` holds only what utilities can't express: palette tokens
  (`[data-palette]` blocks + `@theme inline`), keyframes/animations in `@theme`, a few `@utility`
  definitions (`clip-star`, `meta`, `prose-palette`) and base element rules (focus ring).
- Markdoc bodies use `@tailwindcss/typography` (`prose`); `prose-palette` maps its
  `--tw-prose-*` colours to the palette tokens. Layout tweaks via `prose-*:` modifiers.
- Built-in variants carry the a11y rules: `hover:` already means hover-capable devices;
  `md:` (768px) is the phone/desktop split (design says 761px; 7px is not worth a custom breakpoint);
  `motion-reduce:` per element.
- Palette colour fade (600ms) is one `transition` on `:root` over `@property`-registered colours.
- Palette swatches/strip reuse the tokens by setting `data-palette` on the swatch itself, so
  palette colours live only in CSS.

## Consequences

No client framework; total JS is a few hundred lines of plain DOM code.
