// @ts-check
import { defineConfig } from 'astro/config'

import markdoc from '@astrojs/markdoc'
import tailwindcss from '@tailwindcss/vite'

// https://astro.build/config
export default defineConfig({
  site: 'https://thanigai.vercel.app',
  integrations: [markdoc()],
  // Pages removed in the redesign (docs/adr/0001) land on the matching Home section.
  redirects: {
    '/work': '/#projects',
    '/projects': '/#projects',
    '/experiences': '/#experience',
    '/about': '/',
    '/contact': '/#contact',
    '/design': '/',
  },

  vite: {
    plugins: [tailwindcss()],
  },
  devToolbar: {
    enabled: false,
  },
})
