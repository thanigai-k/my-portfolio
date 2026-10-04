# 6. Projects link out, no pages

Date: 2026-10-04 · Status: accepted

## Decision

- A **Project** is a link, not a page. Each Home row links to the project's site or GitHub repo
  (`href`, required). No `/projects/[slug]` or `/work/[slug]` pages are built.
- Projects without a public URL are dropped from the site.
- `content/projects` frontmatter is `title, role, tagline, summary, order, href, draft`. `topic`, `hero`,
  `heroVideo`, `tldr` and `stack` are gone; the hover card shows name + summary.
- The Post template loses its video hero (only case studies used it).
- Old `/work/<slug>` URLs 404 by choice; `/work` and `/projects` still redirect to `/#projects`.

Supersedes the case-study parts of 0001 (`/work/[slug]` route) and 0003 (Kind, Case studies,
`heroVideo` in the hero slot).
