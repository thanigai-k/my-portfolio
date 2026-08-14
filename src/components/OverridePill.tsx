import { useEffect, useState } from 'react'
import { clearOverrides, readOverrides } from '../lib/overrides'

/** So a /design experiment is never mistaken for the committed design. */
export default function OverridePill() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const sync = () => setCount(Object.keys(readOverrides()).length)
    sync()
    window.addEventListener('theme-overrides', sync)
    return () => window.removeEventListener('theme-overrides', sync)
  }, [])

  if (!count) return null

  return (
    <button
      type="button"
      onClick={clearOverrides}
      className="type-meta fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-control border border-rule2 bg-panel px-3 py-2 text-muted lg:bottom-6"
    >
      {count} theme override{count > 1 ? 's' : ''} active — reset
    </button>
  )
}
