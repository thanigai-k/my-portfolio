/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  THE DESIGN TABLE — every visual decision on this site lives here.
 *
 *  Edit a number or a hex, save, done. No component hard-codes a colour or a
 *  font size; they all read the CSS variables generated from this file
 *  (see src/lib/theme.ts).
 *
 *  Want to experiment before committing? Run the site and open /design —
 *  tweak everything live, then hit "Copy config" and paste the result back
 *  over the `theme` object below.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** Google Fonts you can pick from in /design. Add a row to add a choice. */
export const FONT_CATALOG = {
  Newsreader: { axis: 'opsz,wght@6..72,200..700', stack: 'serif' },
  'Instrument Serif': { axis: 'wght@400', stack: 'serif' },
  'Playfair Display': { axis: 'wght@400..700', stack: 'serif' },
  'Libre Baskerville': { axis: 'wght@400;700', stack: 'serif' },
  'Libre Franklin': { axis: 'wght@100..900', stack: 'sans-serif' },
  Archivo: { axis: 'wght@100..900', stack: 'sans-serif' },
  Inter: { axis: 'wght@100..900', stack: 'sans-serif' },
  'Space Grotesk': { axis: 'wght@300..700', stack: 'sans-serif' },
  'IBM Plex Mono': { axis: 'wght@300;400;500;600', stack: 'monospace' },
  'DM Mono': { axis: 'wght@300;400;500', stack: 'monospace' },
  'Space Mono': { axis: 'wght@400;700', stack: 'monospace' },
  'JetBrains Mono': { axis: 'wght@100..800', stack: 'monospace' },
} as const

export type FontName = keyof typeof FONT_CATALOG
export type RoleName = 'heading' | 'body' | 'meta'

export const theme = {
  /** Which catalog font plays which role. */
  fonts: {
    heading: 'Newsreader',
    body: 'Libre Franklin',
    meta: 'IBM Plex Mono',
  } as Record<RoleName, FontName>,

  /**
   * Type scale. `size` is px, `line` is unitless line-height.
   * `font` picks the role above. `track` is letter-spacing.
   */
  type: {
    h1: { size: 52, line: 1.05, weight: 300, track: '-0.015em', font: 'heading' },
    h1Page: { size: 46, line: 1.05, weight: 300, track: '-0.015em', font: 'heading' },
    h2: { size: 27, line: 1.25, weight: 400, track: '0em', font: 'heading' },
    h3: { size: 24, line: 1.25, weight: 400, track: '0em', font: 'body' },
    lead: { size: 19, line: 1.65, weight: 300, track: '0em', font: 'body' },
    body: { size: 15, line: 1.6, weight: 300, track: '0em', font: 'body' },
    prose: { size: 19, line: 1.7, weight: 300, track: '0em', font: 'body' },
    listTitle: { size: 20, line: 1.3, weight: 400, track: '0em', font: 'body' },
    label: { size: 11, line: 1, weight: 500, track: '0.14em', font: 'meta' },
    meta: { size: 11, line: 1, weight: 400, track: '0em', font: 'meta' },
    nav: { size: 12, line: 1, weight: 400, track: '0em', font: 'meta' },
  },

  /**
   * Phone overrides (< 768px). Only list what differs — everything omitted
   * inherits the desktop value above. These numbers come from the mockup's
   * own 390px frames.
   */
  mobile: {
    type: {
      h1: { size: 32, line: 1.05 },
      h1Page: { size: 30, line: 1.08 },
      h2: { size: 22, line: 1.25 },
      h3: { size: 20, line: 1.3 },
      lead: { size: 16, line: 1.6 },
      prose: { size: 15, line: 1.65 },
      listTitle: { size: 16, line: 1.35 },
    },
    layout: { avatar: 52, pagePadding: 22 },
  },

  /** px. readColumn is the reading measure; wideColumn is for hero/case-study. */
  layout: {
    readColumn: 640,
    wideColumn: 820,
    railWidth: 132,
    pagePadding: 20,
    avatar: 76,
  },

  radius: { card: 4, sheet: 14, control: 12 },

  motion: {
    fast: '.25s',
    base: '.35s',
    slow: '.5s',
    ease: 'cubic-bezier(.3,1.15,.35,1)',
  },

  /** Same token names in both modes — that is what makes dark mode free. */
  colors: {
    light: {
      bg: '#FBFAF7',
      ink: '#14130F',
      ink2: '#3B3931',
      muted: '#6B675E',
      muted2: '#8B877C',
      rule: 'rgba(20,19,15,.10)',
      rule2: 'rgba(20,19,15,.16)',
      panel: '#F6F4EF',
    },
    dark: {
      bg: '#14130F',
      ink: '#F2F0EA',
      ink2: '#C9C5BA',
      muted: '#8B877C',
      muted2: '#6F6C63',
      rule: 'rgba(242,240,234,.12)',
      rule2: 'rgba(242,240,234,.20)',
      panel: '#1C1A16',
    },
  },
}

export type Theme = typeof theme
export type TypeToken = keyof Theme['type']
export type ColorToken = keyof Theme['colors']['light']
