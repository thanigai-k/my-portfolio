/** Drafts render in `astro dev` so you can preview them, never in a build. */
export const isPublished = ({ data }: { data: { draft?: boolean } }) =>
  import.meta.env.DEV || !data.draft
