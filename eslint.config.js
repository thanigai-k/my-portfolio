import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import astro from 'eslint-plugin-astro'

export default [
  { ignores: ['dist/', '.astro/'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    rules: {
      'no-undef': 'off', // TypeScript (astro check) catches these, and knows Astro's ambient types
      'no-empty': ['error', { allowEmptyCatch: true }], // storage access is try/catch-ignored on purpose
    },
  },
]
