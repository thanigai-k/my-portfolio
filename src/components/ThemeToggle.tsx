import { useEffect, useState } from 'react'

type Mode = 'light' | 'dark' | 'system'
const MODES: Mode[] = ['light', 'dark', 'system']

export function applyMode(mode: Mode) {
  if (mode === 'system') delete document.documentElement.dataset.theme
  else document.documentElement.dataset.theme = mode
  localStorage.setItem('theme', mode)
}

export function readMode(): Mode {
  const m = localStorage.getItem('theme')
  return m === 'light' || m === 'dark' ? m : 'system'
}

export default function ThemeToggle() {
  const [mode, setMode] = useState<Mode>('system')
  useEffect(() => setMode(readMode()), [])

  const next = () => {
    const m = MODES[(MODES.indexOf(mode) + 1) % MODES.length]!
    applyMode(m)
    setMode(m)
  }

  return (
    <button
      type="button"
      onClick={next}
      aria-label={`Theme: ${mode}. Click to change.`}
      className="type-meta rounded-control px-2 py-1.5 text-muted2 transition-colors duration-[var(--motion-fast)] hover:text-ink"
    >
      {mode}
    </button>
  )
}
