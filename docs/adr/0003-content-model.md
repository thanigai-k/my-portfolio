# 3. Content model for the redesign

Date: 2026-10-04 · Status: accepted

## Decision
- **Home bio** = the design's two paragraphs. Avatar dropped (text first).
- **Experience** gains `summary` (one line, shown on Home under the role). Home shows top 3 by `order`.
- **Projects** (case studies + side projects) gain `tagline`: the short "Name - tagline" line.
  The hover card reuses `summary` (2-line description) and `stack` (tech, mono).
  Kind = "Case study" for `content/work`, "Side project" for `content/projects`.
- **Writing** `tag` is renamed `topic`. The /writing filter lists only topics that have posts.
  Read time is computed from word count. The list "hook" is `summary`.
- **Hero slot** (Post template) is decided per entry: `heroVideo` → `hero` image → `tldr` list →
  collapses. No site-wide default.
- **Case studies** use the Post template with breadcrumb "← Thanigaivel / Projects" (→ `/#projects`),
  topic line "<topic> · Case study", and previous/next through case studies by `order`.
  Posts: breadcrumb "← Thanigaivel / Writing", previous/next by date.
- **Placeholder posts**: ~4 live posts (`draft: false`) with neutral titles, no invented metrics,
  bodies marked "[To write: …]", so the Writing section renders in production and previews.
  Replace before promoting v2.
- **No RSS** for now; the design's RSS links are dropped.
