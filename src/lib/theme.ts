import {
  FONT_CATALOG,
  theme as defaultTheme,
  type ColorToken,
  type FontName,
  type RoleName,
  type Theme,
  type TypeToken,
} from '../theme.config'

export const ROLES: RoleName[] = ['heading', 'body', 'meta']
export const TYPE_TOKENS = Object.keys(defaultTheme.type) as TypeToken[]
export const COLOR_TOKENS = Object.keys(defaultTheme.colors.light) as ColorToken[]

/** Google Fonts stylesheet URL for the three chosen families. */
export function googleFontsHref(fonts: Record<RoleName, FontName>): string {
  const families = [...new Set(ROLES.map((r) => fonts[r]))]
    .map((f) => `family=${f.replace(/ /g, '+')}:${FONT_CATALOG[f].axis}`)
    .join('&')
  return `https://fonts.googleapis.com/css2?${families}&display=swap`
}

export function fontStack(name: FontName): string {
  return `'${name}', ${FONT_CATALOG[name].stack}`
}

/**
 * Mode-independent variables: fonts, type scale, layout, motion.
 * These are the same names ThemeLab overrides at runtime.
 */
export function baseVars(t: Theme): Record<string, string> {
  const v: Record<string, string> = {}
  for (const role of ROLES) v[`--ff-${role}`] = fontStack(t.fonts[role])

  for (const key of TYPE_TOKENS) {
    const s = t.type[key]
    v[`--t-${key}-size`] = `${s.size}px`
    v[`--t-${key}-line`] = String(s.line)
    v[`--t-${key}-weight`] = String(s.weight)
    v[`--t-${key}-track`] = s.track
    v[`--t-${key}-font`] = `var(--ff-${s.font})`
  }

  for (const [k, px] of Object.entries(t.layout)) v[`--layout-${k}`] = `${px}px`
  for (const [k, px] of Object.entries(t.radius)) v[`--r-${k}`] = `${px}px`
  for (const [k, val] of Object.entries(t.motion)) v[`--motion-${k}`] = val
  return v
}

/** Only the tokens `theme.mobile` actually overrides. */
export function mobileVars(t: Theme): Record<string, string> {
  const v: Record<string, string> = {}
  for (const [token, over] of Object.entries(t.mobile.type)) {
    for (const [prop, value] of Object.entries(over)) {
      v[`--t-${token}-${prop}`] = prop === 'size' ? `${value}px` : String(value)
    }
  }
  for (const [k, px] of Object.entries(t.mobile.layout)) v[`--layout-${k}`] = `${px}px`
  return v
}

export function colorVars(t: Theme, mode: 'light' | 'dark'): Record<string, string> {
  return Object.fromEntries(
    COLOR_TOKENS.map((k) => [`--${k}`, t.colors[mode][k]]),
  )
}

const declare = (vars: Record<string, string>, indent = '  ') =>
  Object.entries(vars)
    .map(([k, v]) => `${indent}${k}: ${v};`)
    .join('\n')

/**
 * The whole stylesheet's worth of tokens, emitted at build time.
 * Dark applies via an explicit [data-theme="dark"] OR system preference when
 * the user hasn't explicitly chosen light — both directions covered.
 */
/** One `.type-<token>` class per row of `theme.type`, all reading the vars. */
function typeClasses(): string {
  return TYPE_TOKENS.map(
    (k) => `.type-${k} {
  font-family: var(--t-${k}-font);
  font-size: var(--t-${k}-size);
  line-height: var(--t-${k}-line);
  font-weight: var(--t-${k}-weight);
  letter-spacing: var(--t-${k}-track);
}`,
  ).join('\n')
}

export function themeCss(t: Theme = defaultTheme): string {
  return `:root {
${declare(baseVars(t))}
${declare(colorVars(t, 'light'))}
  color-scheme: light;
}
@media (max-width: 767px) {
  :root {
${declare(mobileVars(t), '    ')}
  }
}
:root[data-theme='dark'] {
${declare(colorVars(t, 'dark'))}
  color-scheme: dark;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme='light']) {
${declare(colorVars(t, 'dark'), '    ')}
    color-scheme: dark;
  }
}
${typeClasses()}
.type-label { text-transform: uppercase; }`
}

/** Runs before paint so a dark reload never flashes paper-white. */
export const noFlashScript = `(()=>{try{const m=localStorage.getItem('theme');if(m==='dark'||m==='light')document.documentElement.dataset.theme=m;const o=localStorage.getItem('themeOverrides');if(o)for(const[k,v]of Object.entries(JSON.parse(o)))document.documentElement.style.setProperty(k,v)}catch{}})()`
