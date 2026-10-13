/** Drafts render in `astro dev` so you can preview them, never in a build. */
export const isPublished = ({ data }: { data: { draft?: boolean } }) =>
  import.meta.env.DEV || !data.draft

/** Minutes to read at ~200 words a minute. */
export const readMinutes = (body = '') =>
  Math.max(1, Math.round(body.split(/\s+/).filter(Boolean).length / 200))

/** "Sep 2026" */
export const monthYear = (d: Date) =>
  d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })

/** The verb that opens a project row's tagline, per role. */
export const roleVerb = { founder: 'Founded', lead: 'Led', contributor: 'Contributed to' } as const
