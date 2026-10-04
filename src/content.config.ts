import { defineCollection, type SchemaContext } from 'astro:content'
import { z } from 'astro:schema'
import { glob } from 'astro/loaders'

const mdoc = (dir: string) => glob({ pattern: '**/*.mdoc', base: `./content/${dir}` })

/** Accepts a bare path or markdown `![alt](path)` syntax, resolved through Astro's image optimizer. */
const mdImage = (image: SchemaContext['image']) =>
  z.preprocess((s) => (typeof s === 'string' ? (s.match(/\(([^)]+)\)/)?.[1] ?? s) : s), image())

const writing = defineCollection({
  loader: mdoc('writing'),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      topic: z.string().default('Notes'),
      /** One line under the title in lists (the "hook"). */
      summary: z.string(),
      hero: mdImage(image).optional(),
      /** Up to 3 bullets shown in the hero slot when there is no hero image. */
      tldr: z.array(z.string()).max(3).optional(),
      draft: z.boolean().default(false),
    }),
})

const projects = defineCollection({
  loader: mdoc('projects'),
  schema: z.object({
    title: z.string(),
    /** Shown in the hover card and as the verb before the tagline (`roleVerb`). */
    role: z.enum(['founder', 'lead', 'contributor']),
    /** Short one-liner on Home: "Name - Verb tagline". Starts lowercase; it follows the verb. */
    tagline: z.string(),
    /** Two-line description in the project hover card. */
    summary: z.string(),
    order: z.number().default(99),
    /** Where the row links: the project's site or GitHub repo. No page is built. */
    href: z.string().url(),
    draft: z.boolean().default(false),
  }),
})

const experiences = defineCollection({
  loader: mdoc('experiences'),
  schema: z.object({
    role: z.string(),
    company: z.string(),
    period: z.string(),
    /** One line under the role on Home. */
    summary: z.string().optional(),
    order: z.number(),
    stack: z.string().optional(),
  }),
})

const pages = defineCollection({
  loader: mdoc('pages'),
  schema: z.object({
    title: z.string(),
    tagline: z.string().optional(),
  }),
})

export const collections = { writing, projects, experiences, pages }
