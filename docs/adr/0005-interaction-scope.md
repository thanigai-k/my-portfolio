# 5. Interaction scope and behaviour

Date: 2026-10-04 · Status: accepted

## Decision
- Ship every item on the canvas's **Confirmed** page. ⌘K search (Fun page) is out.
- **Keyboard welcome**: first keyboard focus of a visit (`sessionStorage`), not per page.
  "Press / to search" is dropped with ⌘K. The 6s timer is the progress bar's own animation
  (`animationend` closes it), so hovering pauses bar and timer together.
- **Project hover card**: one shared card in the Projects section, moved by a small script on
  pointer hover (not touch) or keyboard focus. It glides (position + height) between rows instead
  of each row popping its own card. Each row keeps its content in a hidden span as the link's
  `aria-describedby`. Positioned right of the name, vertically centred. Skips the prototype's JS
  viewport clamping: the 720px column always leaves room on the right at ≥768px.
- **Link sparkle**: one `SparkLink` component, also used for Markdoc body links. Row and card
  links (post rows, contact rows, prev/next cards) don't use it.
- **Palette bubble**: Popover API + CSS anchor positioning, native radio group for ↑↓, small script
  for the 120ms hover-open / 300ms hover-close and tab-out close.
- **Phone bottom bar**: Home · Projects · Writing · Contact; Projects/Contact jump to Home anchors.
  No desktop nav beyond the header links.

## Consequences
Hover card can clip at the very top/bottom of the viewport. Add JS clamping if that shows up.
Without JS there is no hover card; the description is still read on focus.
