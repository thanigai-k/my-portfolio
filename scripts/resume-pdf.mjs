// Prints /resume to public/resume.pdf, so the download is the page (print CSS keeps only the sheet).
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
    preferCSSPageSize: true,
    printBackground: true,
  })
  const pages = pdf.toString('latin1').match(/\/Type\s*\/Page[^s]/g)?.length
  console.log(`wrote public/resume.pdf (${pages} page${pages === 1 ? '' : 's'})`)
  if (pages !== 1) process.exitCode = 1
} finally {
  await browser.close()
  await server.stop()
}
