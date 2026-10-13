# 1. Design-only route map

Date: 2026-10-04 · Status: accepted

## Context

The redesign specs three screens: Home, /writing, Post. The old site also had /work, /projects,
/experiences, /about, /contact and /design (ThemeLab).

## Decision

Keep `/`, `/writing`, `/writing/[slug]`, `/work/[slug]` (case studies use the Post template).
Delete the other six. Old URLs 301 to Home anchors via `redirects` in `astro.config.mjs`.
Drop the design's "All projects →" link: Home already lists every project.
Role line stays **Senior** (matches live site and resume).

## Consequences

Home shows 3 of 6 roles; the rest of the history is no longer on the site.
