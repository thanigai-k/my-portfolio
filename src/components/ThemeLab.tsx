import { useEffect, useState } from 'react'
import {
  FONT_CATALOG,
  theme as defaultTheme,
  type ColorToken,
  type FontName,
  type RoleName,
  type TypeToken,
} from '../theme.config'
import { COLOR_TOKENS, ROLES, TYPE_TOKENS, fontStack } from '../lib/theme'
import {
  clearOverrides,
  ensureFontLoaded,
  readOverrides,
  writeOverrides,
  type Overrides,
} from '../lib/overrides'
import { applyMode, readMode } from './ThemeToggle'

const FONT_NAMES = Object.keys(FONT_CATALOG) as FontName[]
const LAYOUT_KEYS = ['readColumn', 'wideColumn', 'railWidth', 'avatar'] as const

/** Live token editor. Everything it changes is a CSS var, so the preview is the site. */
export default function ThemeLab() {
  const [o, setO] = useState<Overrides>({})
  const [mode, setMode] = useState<'light' | 'dark'>('light')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setO(readOverrides())
    const m = readMode()
    setMode(m === 'dark' ? 'dark' : m === 'light' ? 'light' : matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  }, [])

  const set = (patch: Overrides) => {
    const next = { ...o, ...patch }
    for (const [k, v] of Object.entries(patch)) if (v === '') delete next[k]
    setO(next)
    writeOverrides(next)
  }

  /** Current value: override if present, otherwise the committed config. */
  const val = (key: string, fallback: string | number) => o[key] ?? String(fallback)

  const switchMode = (m: 'light' | 'dark') => {
    setMode(m)
    applyMode(m)
  }

  const pickFont = (role: RoleName, family: FontName) => {
    ensureFontLoaded(family, FONT_CATALOG[family].axis)
    set({ [`--ff-${role}`]: fontStack(family) })
  }

  const currentFont = (role: RoleName): FontName => {
    const raw = o[`--ff-${role}`]
    const match = raw?.match(/^'([^']+)'/)?.[1] as FontName | undefined
    return match && match in FONT_CATALOG ? match : defaultTheme.fonts[role]
  }

  const copy = async () => {
    await navigator.clipboard.writeText(serialize(o))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    clearOverrides()
    setO({})
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center gap-2">
        <Segmented
          options={['light', 'dark']}
          value={mode}
          onChange={(m) => switchMode(m as 'light' | 'dark')}
        />
        <span className="flex-1" />
        <button type="button" onClick={copy} className={btn}>
          {copied ? 'copied ✓' : 'copy config'}
        </button>
        <button type="button" onClick={reset} className={btn} disabled={!Object.keys(o).length}>
          reset
        </button>
      </div>

      <Group title="Fonts">
        {ROLES.map((role) => (
          <Row key={role} label={role}>
            <select
              value={currentFont(role)}
              onChange={(e) => pickFont(role, e.target.value as FontName)}
              className={input}
            >
              {FONT_NAMES.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </Row>
        ))}
      </Group>

      <Group title="Type scale">
        {TYPE_TOKENS.map((t) => (
          <TypeRow key={t} token={t} val={val} set={set} />
        ))}
      </Group>

      <Group title="Layout">
        {LAYOUT_KEYS.map((k) => (
          <Row key={k} label={k}>
            <Slider
              min={k === 'avatar' ? 40 : 320}
              max={k === 'avatar' ? 160 : 1100}
              value={parseFloat(val(`--layout-${k}`, `${defaultTheme.layout[k]}px`))}
              onChange={(v) => set({ [`--layout-${k}`]: `${v}px` })}
              suffix="px"
            />
          </Row>
        ))}
      </Group>

      <Group title={`Colors — ${mode}`}>
        <p className="type-meta m-0 mb-2 text-muted2">
          Overrides apply to whichever mode is showing. Switch above to edit the other set.
        </p>
        {COLOR_TOKENS.map((c) => (
          <ColorRow key={c} token={c} mode={mode} o={o} set={set} />
        ))}
      </Group>
    </div>
  )
}

/* ── bits ─────────────────────────────────────────────────────────────────── */

const btn =
  'type-meta min-h-9 rounded-control border border-rule px-3 py-1.5 text-muted transition-colors hover:text-ink disabled:opacity-40'
const input =
  'type-meta w-full min-h-9 rounded-control border border-rule bg-bg px-2 py-1.5 text-ink'

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="type-label mb-3 border-b border-rule2 pb-2.5 text-muted2">{title}</h2>
      <div className="flex flex-col gap-2.5">{children}</div>
    </section>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid grid-cols-[110px_1fr] items-center gap-3">
      <span className="type-meta text-muted">{label}</span>
      {children}
    </label>
  )
}

function Segmented({
  options,
  value,
  onChange,
}: {
  options: string[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="flex rounded-control border border-rule p-0.5">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className="type-meta min-h-8 rounded-control px-3"
          style={{
            background: value === opt ? 'var(--panel)' : 'transparent',
            color: value === opt ? 'var(--ink)' : 'var(--muted2)',
          }}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}

function Slider({
  min,
  max,
  step = 1,
  value,
  onChange,
  suffix = '',
}: {
  min: number
  max: number
  step?: number
  value: number
  onChange: (v: number) => void
  suffix?: string
}) {
  return (
    <span className="flex items-center gap-3">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="h-9 flex-1 accent-[var(--ink)]"
      />
      <span className="type-meta w-14 text-right text-muted2">
        {value}
        {suffix}
      </span>
    </span>
  )
}

function SubSlider({
  label,
  ...rest
}: { label: string } & Parameters<typeof Slider>[0]) {
  return (
    <label className="grid grid-cols-[52px_1fr] items-center gap-2">
      <span className="type-meta text-muted2">{label}</span>
      <Slider {...rest} />
    </label>
  )
}

function TypeRow({
  token,
  val,
  set,
}: {
  token: TypeToken
  val: (k: string, f: string | number) => string
  set: (p: Overrides) => void
}) {
  const d = defaultTheme.type[token]
  return (
    <fieldset className="m-0 border-0 p-0 pb-1">
      <legend className="type-meta mb-0.5 text-ink">{token}</legend>
      <SubSlider
        label="size"
        min={9}
        max={110}
        value={parseFloat(val(`--t-${token}-size`, `${d.size}px`))}
        onChange={(v) => set({ [`--t-${token}-size`]: `${v}px` })}
        suffix="px"
      />
      <SubSlider
        label="line"
        min={0.9}
        max={2.2}
        step={0.01}
        value={parseFloat(val(`--t-${token}-line`, d.line))}
        onChange={(v) => set({ [`--t-${token}-line`]: String(v) })}
      />
      <SubSlider
        label="weight"
        min={100}
        max={900}
        step={100}
        value={parseFloat(val(`--t-${token}-weight`, d.weight))}
        onChange={(v) => set({ [`--t-${token}-weight`]: String(v) })}
      />
    </fieldset>
  )
}

function ColorRow({
  token,
  mode,
  o,
  set,
}: {
  token: ColorToken
  mode: 'light' | 'dark'
  o: Overrides
  set: (p: Overrides) => void
}) {
  const committed = defaultTheme.colors[mode][token]
  const current = o[`--${token}`] ?? committed
  // <input type=color> only speaks hex; rgba tokens fall back to a text field.
  const isHex = /^#[0-9a-f]{6}$/i.test(current)

  return (
    <div className="grid grid-cols-[110px_1fr] items-center gap-3">
      <span className="type-meta text-muted">{token}</span>
      <span className="flex items-center gap-2">
        {isHex && (
          <input
            type="color"
            value={current}
            onChange={(e) => set({ [`--${token}`]: e.target.value })}
            className="size-9 shrink-0 rounded-control border border-rule bg-bg"
          />
        )}
        <input
          type="text"
          value={current}
          onChange={(e) => set({ [`--${token}`]: e.target.value })}
          className={input}
        />
      </span>
    </div>
  )
}

/* ── serialisation ────────────────────────────────────────────────────────── */

/** Turn the live overrides back into a paste-ready theme.config.ts body. */
function serialize(o: Overrides): string {
  const t = structuredClone(defaultTheme) as any

  for (const role of ROLES) {
    const raw = o[`--ff-${role}`]
    const match = raw?.match(/^'([^']+)'/)?.[1]
    if (match) t.fonts[role] = match
  }

  for (const token of TYPE_TOKENS) {
    const s = t.type[token]
    const size = o[`--t-${token}-size`]
    const line = o[`--t-${token}-line`]
    const weight = o[`--t-${token}-weight`]
    const track = o[`--t-${token}-track`]
    if (size) s.size = parseFloat(size)
    if (line) s.line = parseFloat(line)
    if (weight) s.weight = parseFloat(weight)
    if (track) s.track = track
  }

  for (const k of Object.keys(t.layout)) {
    const v = o[`--layout-${k}`]
    if (v) t.layout[k] = parseFloat(v)
  }

  // Colour overrides are mode-blind at runtime, so apply them to whichever mode
  // is active right now.
  const mode = document.documentElement.dataset.theme === 'dark' ||
    (!document.documentElement.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches)
    ? 'dark'
    : 'light'
  for (const c of COLOR_TOKENS) {
    const v = o[`--${c}`]
    if (v) t.colors[mode][c] = v
  }

  const json = JSON.stringify(t, null, 2)
    .replace(/"([A-Za-z0-9_]+)":/g, '$1:')
    .replace(/"/g, "'")
  return `// Paste over the \`theme\` object in src/theme.config.ts\nexport const theme = ${json}\n`
}
