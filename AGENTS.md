## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)


## Project Structure

```
├── public/                 # Static assets (images, fonts, etc.)
├── src/
│   ├── components/         # Reusable UI components
│   ├── layouts/            # Layout components for pages
│   ├── pages/              # Page components (routes)
│   ├── styles/             # Global styles and Tailwind configuration
│   └── utils/              # Utility functions and helpers
├── astro.config.mjs        # Astro configuration file
├── package.json            # Project metadata and dependencies
├── tailwind.config.cjs     # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration  
```
