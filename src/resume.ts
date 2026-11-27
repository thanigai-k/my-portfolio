/** The one-page CV (impacts render as HTML, so inline <a> links work) at /resume, ported from github.com/thanigai-k/resume (src/content/*.ts).
 *  Edit here, then run `pnpm resume:pdf` so the download matches the page. */
export const resume = {
  /** Shown next to the Download button. Bump when the content changes. */
  updated: 'Nov 2026',
  name: 'Thanigaivel K',
  title: 'Senior Frontend Engineer — Design Systems & AI',
  contact: [
    { icon: 'mail', label: 'inbox.thanigai@gmail.com', href: 'mailto:inbox.thanigai@gmail.com' },
    { icon: 'phone', label: '(91) 78711 00685', href: 'tel:+917871100685' },
    {
      icon: 'linkedin',
      label: 'Linkedin/thanigai',
      href: 'https://www.linkedin.com/in/thanigaivel-k-82b5b6184',
    },
    { icon: 'globe', label: 'Visit my site', href: 'https://thanigai.vercel.app' },
  ],
  profile:
    'Senior front-end engineer, 7+ years. I lead Earth Design System, a React design system AI agents can read, use and help maintain, and I modernise legacy systems without stopping the business: +40% sign-ups, performance scores 30–40 → 85–95, ~40 engineers trained.',
  company: { name: 'Full Creative', location: 'Chennai, India', span: '2018 — Present · 7 yrs' },
  roles: [
    {
      title: 'Sr. Frontend Engineer · Design System Lead',
      dates: '2023 - Present',
      impacts: [
        'Leading <a href="https://earth.anywhere.co">Earth Design System</a>: 15–20 accessible components (roving focus, typeahead, smart popovers), each shaped by design, dev and market audits before code.',
        "Automated the design system's day-to-day work through a component factory, letting a handful of engineers do what used to need a full team (~80% less manual effort).",
        "Introduced the org's first monorepo and moved every engineer into it, using Turborepo or Nx per use case; shared context lifted productivity ~30–40%.",
        'Build MCP servers and CLIs that let AI coding agents use internal tools, as with Earth Design System, plus llms.txt, Markdown docs and an agent-published Figma library.',
        'Build eval layers for an AI-assisted software factory: visual-regression, interaction, unit and product-logic checks run in CI and catch agent-written changes before they land.',
      ],
    },
    {
      title: 'Frontend Engineer',
      dates: '2021 - 2023',
      impacts: [
        'As one of the lead trainers, coached ~40 full-stack engineers into front-end roles over nine months, and was promoted to Senior after the programme.',
        'Pioneered our first framework-agnostic design system, then co-built Earth Design System in React with <a href="https://www.thinkmill.com.au/">Thinkmill</a> (Australia), growing from contributor to shaping its architecture.',
        'Rolled Earth Design System into a 10–15-year-old app view by view without blocking product teams, tracking adoption per file and prop.',
      ],
    },
    {
      title: 'Junior Frontend Engineer',
      dates: '2020 - 2021',
      impacts: [
        "Was the main contributor to Setmore's booking-page redesign, and added a sign-up form after booking that lifted sign-ups ~40%, premium plans included.",
        'Built a GraphQL backend-for-frontend over a legacy back end, so the new booking page got clean, type-safe data without waiting on back-end changes.',
        "Rebuilt the Services (Easy Share) screen in Setmore's Electron desktop app to match the new design.",
      ],
    },
    {
      title: 'Web Developer',
      dates: '2019 - 2020',
      impacts: [
        'Moved the high-traffic Setmore site from Java to Next.js route by route behind a load balancer, fully migrated in ~4–5 months with no big-bang cutover.',
        'Took performance scores from 30–40 to 85–95 using SSR and ISR, which helped the site climb in organic search, where most sign-ups come from.',
        'Built routing for 5–6 native-language versions of the site, and WordPress themes that other products went on to adopt.',
      ],
    },
  ],
  education: [
    {
      title: 'B.Tech - IT',
      years: '2014 - 2018',
      school: 'Jeppiaar Engineering College',
      location: 'Chennai, India',
    },
  ],
  projects: [
    { label: 'Earth Design System', href: 'https://earth.anywhere.co' },
    { label: 'NetFlow', href: 'https://netflow-finance-app.vercel.app' },
  ],
  skills: [
    'React · Next.js · TypeScript',
    'Design Systems & Accessibility',
    'AI Agents · MCP · llms.txt',
    'Web Performance & SEO',
    'Monorepos · Turborepo · Nx',
    'Mentorship & Engineering Growth',
  ],
}
