/** Site identity + navigation. Edit here, both navs follow. */
export const site = {
  name: "Thanigaivel",
  title: "Thanigaivel — Frontend Engineer",
  description:
    "Senior Frontend Engineer and design system lead. Accessible primitives, stable component APIs, frontend platform work.",
  url: "https://thanigai.vercel.app",
};

/** `rail: true` → also shown in the desktop left rail and the mobile tab bar. */
export const nav = [
  { label: "Home", href: "/", rail: true, tab: true },
  { label: "Work", href: "/work", rail: true, tab: true },
  { label: "Experiences", href: "/experiences", rail: false, tab: false },
  { label: "Side projects", href: "/projects", rail: true, tab: true },
  { label: "Writing", href: "/writing", rail: true, tab: false },
  { label: "About", href: "/about", rail: false, tab: false },
  { label: "Contact", href: "/contact", rail: false, tab: false },
];

export const socials = [
  { label: "email", href: "mailto:inbox.thanigai@gmail.com" },
  { label: "X", href: "https://x.com/itsmethanigai" },
  {
    label: "linkedin",
    href: "https://www.linkedin.com/in/thanigai-breathes-tech/",
  },
  { label: "github", href: "https://github.com/thanix-k" },
];
