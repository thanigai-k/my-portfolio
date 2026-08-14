/** Runtime CSS-var overrides written by /design. Shared by ThemeLab and the pill. */
export const OVERRIDE_KEY = 'themeOverrides'

export type Overrides = Record<string, string>

export function readOverrides(): Overrides {
  try {
    return JSON.parse(localStorage.getItem(OVERRIDE_KEY) ?? '{}')
  } catch {
    return {}
  }
}

export function writeOverrides(o: Overrides) {
  localStorage.setItem(OVERRIDE_KEY, JSON.stringify(o))
  const root = document.documentElement
  root.style.cssText = ''
  for (const [k, v] of Object.entries(o)) root.style.setProperty(k, v)
  window.dispatchEvent(new CustomEvent('theme-overrides', { detail: o }))
}

export function clearOverrides() {
  localStorage.removeItem(OVERRIDE_KEY)
  document.documentElement.style.cssText = ''
  window.dispatchEvent(new CustomEvent('theme-overrides', { detail: {} }))
}

/** Load a Google font on demand when the lab switches families. */
export function ensureFontLoaded(family: string, axis: string) {
  const id = `gf-${family.replace(/\W/g, '')}`
  if (document.getElementById(id)) return
  const link = document.createElement('link')
  link.id = id
  link.rel = 'stylesheet'
  link.href = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, '+')}:${axis}&display=swap`
  document.head.append(link)
}
