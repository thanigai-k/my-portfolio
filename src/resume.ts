/** The one-page CV at /resume, ported from github.com/thanigai-k/resume (src/content/*.ts).
 *  Edit here, then run `pnpm resume:pdf` so the download matches the page. */
export const resume = {
  /** Shown next to the Download button. Bump when the content changes. */
  updated: 'Nov 2026',
  name: 'Thanigaivel K',
  title: 'Lead Engineer — AI Augmented Development',
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
    "I'm a Lead Engineer with over 7 years of experience. I make front-end teams 3-5x more productive by embedding AI into every stage of the development lifecycle — from design-system-driven code generation to autonomous agents that handle routine engineering work",
  company: { name: 'Full Creative', location: 'Chennai, India', span: '2018 — Present · 7 yrs' },
  roles: [
    {
      title: 'Lead Engineer - AI Augmented',
      dates: 'Oct 2025 - Present',
      impacts: [
        'Led scalable architecture using React, TypeScript, and custom design systems.',
        'Migrated 400+ legacy marketing sites to Next.js, reducing load time by 40% and improving maintainability.',
        'Mentored engineers by introducing code review rituals and refined team-wide DX tooling.',
      ],
    },
    {
      title: 'Sr. Frontend Engineer',
      dates: '2023 - 2025',
      impacts: [
        'Led scalable architecture using React, TypeScript, and custom design systems.',
        'Migrated 400+ legacy marketing sites to Next.js, reducing load time by 40% and improving maintainability.',
        'Collaborated with designers and PMs to ship features faster while ensuring WCAG accessibility compliance.',
        'Mentored engineers by introducing code review rituals and refined team-wide DX tooling.',
      ],
    },
    {
      title: 'Frontend Engineer',
      dates: '2021 - 2023',
      impacts: [
        'Built modular, scalable components using React and Tailwind CSS.',
        'Boosted mobile conversion rate by redesigning booking flow with mobile-first principles.',
        'Worked with stakeholders during sprints to incorporate quick feedback loops.',
      ],
    },
    {
      title: 'Web Developer',
      dates: '2019 - 2021',
      impacts: [
        'Developed responsive, cross-browser compatible interfaces.',
        'Contributed to marketing and product-facing websites, SEO and performance.',
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
    'React-TypeScript Dev',
    'Design System Expertise',
    'Accessibility First',
    'Storybook Driven Development',
    'Mentorship & Engineering Growth',
  ],
}
