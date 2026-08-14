import { useEffect, useRef, useState } from 'react'
import { nav } from '../site.config'

const tabs = nav.filter((n) => n.tab)
/** The sheet holds the overflow only — never a destination already in the bar. */
const overflow = nav.filter((n) => !n.tab)

/** Mockup 13a — three destinations plus More, which raises a sheet with all seven. */
export default function MobileTabBar({ current }: { current: string }) {
  const [open, setOpen] = useState(false)
  const sheet = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    sheet.current?.querySelector<HTMLAnchorElement>('a')?.focus()
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const isActive = (href: string) => (href === '/' ? current === '/' : current.startsWith(href))
  const moreActive = !tabs.some((t) => isActive(t.href))

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label="Close menu"
        onClick={() => setOpen(false)}
        tabIndex={open ? 0 : -1}
        className="fixed inset-0 z-40 bg-ink/55 transition-opacity duration-[var(--motion-base)]"
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none' }}
      />

      <div
        ref={sheet}
        id="more-sheet"
        role="dialog"
        aria-modal={open}
        aria-label="All pages"
        aria-hidden={!open}
        /* pb clears the tab bar so the last destination is never trapped under it. */
        className="fixed inset-x-0 bottom-0 z-50 max-h-[74vh] overflow-y-auto rounded-t-sheet bg-bg px-4 pb-28 pt-[18px] shadow-[0_-14px_40px_rgba(0,0,0,.16)] transition-transform duration-[var(--motion-slow)] ease-[var(--motion-ease)]"
        style={{
          transform: open ? 'translateY(0)' : 'translateY(101%)',
          visibility: open ? 'visible' : 'hidden',
        }}
      >
        <span className="mx-auto mb-4 block h-1 w-[38px] rounded-full bg-rule2" />
        {overflow.map((item, i) => (
          <a
            key={item.href}
            href={item.href}
            tabIndex={open ? 0 : -1}
            className="flex min-h-12 items-center justify-between rounded-lg px-[14px] no-underline transition-[background,color] duration-[var(--motion-fast)]"
            style={{
              fontFamily: 'var(--ff-heading)',
              fontSize: '17px',
              color: isActive(item.href) ? 'var(--ink)' : 'var(--muted)',
              background: isActive(item.href) ? 'var(--panel)' : 'transparent',
            }}
          >
            {item.label}
            <span className="type-meta text-muted2">{String(i + 1).padStart(2, '0')}</span>
          </a>
        ))}
      </div>

      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-50 flex border-t border-rule2 bg-bg/90 px-2 pb-5 pt-1.5 backdrop-blur-[14px]"
      >
        {tabs.map((tab) => (
          <TabButton
            key={tab.href}
            label={tab.label}
            href={tab.href}
            /* While the sheet is up, More owns the highlight — never two at once. */
            active={!open && isActive(tab.href)}
          />
        ))}
        <TabButton
          label="More"
          active={moreActive || open}
          onClick={() => setOpen((o) => !o)}
          controls="more-sheet"
          expanded={open}
        />
      </nav>
    </div>
  )
}

function TabButton({
  label,
  href,
  active,
  onClick,
  controls,
  expanded,
}: {
  label: string
  href?: string
  active: boolean
  onClick?: () => void
  controls?: string
  expanded?: boolean
}) {
  const inner = (
    <>
      <span
        className="size-[5px] rounded-full bg-current transition-[opacity,transform] duration-[var(--motion-base)] ease-[var(--motion-ease)]"
        style={{ opacity: active ? 1 : 0, transform: active ? 'scale(1)' : 'scale(.4)' }}
      />
      <span className="type-meta">{label}</span>
    </>
  )
  const cls =
    'flex min-h-12 flex-1 flex-col items-center justify-center gap-1.5 no-underline transition-colors duration-[var(--motion-fast)]'
  const style = { color: active ? 'var(--ink)' : 'var(--muted2)' }

  return href ? (
    <a href={href} className={cls} style={style} aria-current={active ? 'page' : undefined}>
      {inner}
    </a>
  ) : (
    <button
      type="button"
      onClick={onClick}
      className={cls}
      style={style}
      aria-controls={controls}
      aria-expanded={expanded}
    >
      {inner}
    </button>
  )
}
