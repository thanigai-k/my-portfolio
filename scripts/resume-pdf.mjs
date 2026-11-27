// Prints /resume to public/resume.pdf the way Cmd+P does in Chrome (A4, default margins).
// Run after editing src/resume.ts: `pnpm resume:pdf`, then commit the PDF.
import { build, preview } from 'astro'
import { chromium } from 'playwright'

await build({ logLevel: 'warn' })
const server = await preview({ logLevel: 'warn' })
const browser = await chromium.launch()
try {
  const page = await browser.newPage()
  await page.goto(`http://localhost:${server.port}/resume`, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  const pdf = await page.pdf({
    path: 'public/resume.pdf',
    format: 'A4',
    margin: { top: '0.4in', right: '0.4in', bottom: '0.4in', left: '0.4in' },
  })
  const pages = pdf.toString('latin1').match(/\/Type\s*\/Page[^s]/g)?.length
  console.log(`wrote public/resume.pdf (${pages} page${pages === 1 ? '' : 's'})`)
} finally {
  await browser.close()
  await server.stop()
}
