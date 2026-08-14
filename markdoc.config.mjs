import { defineMarkdocConfig, nodes, component } from '@astrojs/markdoc/config'

export default defineMarkdocConfig({
  nodes: {
    // Markdoc wraps every document in <article> by default, which breaks
    // `.prose > * + *` spacing and nests <article> inside <article> on posts.
    document: { ...nodes.document, render: null },
    // Astro auto-resolves ![alt](src) through astro:assets before this renders;
    // this just adds spacing/rounding to the optimized <Image>.
    image: { ...nodes.image, render: component('./src/components/MdocImage.astro') },
  },
})
