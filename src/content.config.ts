import { defineCollection, type SchemaContext } from 'astro:content'
import { z } from 'astro:schema'
import { glob } from 'astro/loaders'

const mdoc = (dir: string) => glob({ pattern: '**/*.mdoc', base: `./content/${dir}` })

/** Accepts a bare path or markdown `![alt](path)` syntax, resolved through Astro's image optimizer. */
const mdImage = (image: SchemaContext['image']) =>
  z.preprocess(
    (s) => (typeof s === 'string' ? (s.match(/\(([^)]+)\)/)?.[1] ?? s) : s),
    image(),
  )

const writing = defineCollection({
  loader: mdoc('writing'),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      tag: z.string().default('Note'),
      summary: z.string(),
      hero: mdImage(image).optional(),
      draft: z.boolean().default(false),
    }),
})

const work = defineCollection({
  loader: mdoc('work'),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      hero: mdImage(image).optional(),
      order: z.number().default(99),
      stack: z.string().optional(),
      draft: z.boolean().default(false),
    }),
})

const experiences = defineCollection({
  loader: mdoc('experiences'),
  schema: z.object({
    role: z.string(),
    company: z.string(),
    period: z.string(),
    order: z.number(),
    stack: z.string().optional(),
  }),
})

const projects = defineCollection({
  loader: mdoc('projects'),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    order: z.number(),
    stack: z.string().optional(),
    href: z.string().optional(),
  }),
})

const pages = defineCollection({
  loader: mdoc('pages'),
  schema: z.object({
    title: z.string(),
    tagline: z.string().optional(),
  }),
})

export const collections = { writing, work, experiences, projects, pages }
