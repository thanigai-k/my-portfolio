# Context — glossary

Shared language for this site. Design source of truth: the "Confirmed | Handoff" page of the
design canvas (https://claude.ai/artifact/CBPKwqEqL9d1meWaaK4tsJ). Decisions: `docs/adr/`.

| Term                 | Meaning                                                                                                               |
| -------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Home**             | `/`. Name, role line, bio, links, Projects, Writing (3 latest), Experience (3 roles), Contact (phones only).          |
| **Role line**        | "Senior Frontend Engineer & Design System Lead · India".                                                              |
| **Project**          | A row in Home › Projects. A `content/projects` entry; links out to its site or GitHub repo (`href`).                  |
| **Post**             | A `content/writing` entry at `/writing/[slug]`.                                                                       |
| **Experience**       | A role in `content/experiences`. Home shows the top 3.                                                                |
| **Palette**          | One of Dawn, Day, Dusk, Night (Bold set). Picked from the visitor's local hour.                                       |
| **Auto / Locked**    | Auto = palette follows local time. Locked = visitor picked one in the bubble; lasts the visit.                        |
| **Palette bubble**   | Popover from the "● Dusk" trigger beside the name: schedule strip + Auto/Dawn/Day/Dusk/Night radios.                  |
| **Accent**           | The current palette's accent. Drives sparkles, focus ring, hover underline.                                           |
| **Glint**            | Lighter mix of the accent; the second sparkle colour.                                                                 |
| **Tagline**          | A project's short one-liner on Home ("Name - Verb tagline"); the verb comes from its Role.                            |
| **Role**             | A project's `role` (founder, lead, contributor). Sets the tagline's verb and the Home › Projects filter.              |
| **Hover card**       | Desktop-only card that opens right of a project name on hover/focus: name, role, summary.                             |
| **Topic**            | A post's single subject (React, Accessibility…). Drives the /writing filter.                                          |
| **Hook**             | The muted line under a post title in lists. Same as the post's `summary`.                                             |
| **Hero slot**        | Area under a Post's title: image, TL;DR box, or nothing.                                                              |
| **TL;DR**            | Up to 3 bullets in the hero slot when a post has no image (`tldr` frontmatter).                                       |
| **Placeholder post** | A live dummy post marked "[To write: …]". Must be replaced before launch.                                             |
| **Sparkle**          | Three accent shines that pop around a text link on hover/focus (desktop). **Card sparkle**: four, on prev/next cards. |
| **Keyboard welcome** | Corner note shown on the first keyboard focus of a visit.                                                             |
| **Bottom bar**       | Phone-only sticky nav: Home · Projects · Writing · Contact.                                                           |
