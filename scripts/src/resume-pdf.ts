import { isMain } from './utils/is-main'
import { createServer } from 'http-server'
import { join } from 'path'
import { getRepositoryRootDir } from './utils/get-repository-root-dir'
import puppeteer from 'puppeteer-core'
import { getAndCreateGeneratedDataDir } from './utils/get-and-create-generated-data-dir'
import { cp } from 'fs/promises'

const resumePdf = async () => {
  const PORT = 8080
  const distDir = join(
    getRepositoryRootDir(),
    'dist',
    '@davidlj95',
    'website',
    'browser',
  )

  const server = createServer({
    root: distDir,
  })

  server.listen(PORT)
  const browser = await puppeteer.launch({ channel: 'chrome' })
  const page = await browser.newPage()
  await page.goto(`http://localhost:${PORT}/resume/?plain`, {
    waitUntil: 'networkidle2',
  })

  const DEFAULT_CHROME_MARGIN = '0.4in'
  const OUTPUT_FILENAME = 'resume.pdf'
  const outputFile = join(await getAndCreateGeneratedDataDir(), OUTPUT_FILENAME)
  await page.pdf({
    path: outputFile,
    format: 'a4',
    margin: {
      bottom: DEFAULT_CHROME_MARGIN,
      top: DEFAULT_CHROME_MARGIN,
      left: DEFAULT_CHROME_MARGIN,
      right: DEFAULT_CHROME_MARGIN,
    },
  })
  await cp(outputFile, join(distDir, OUTPUT_FILENAME))
  await browser.close()
  server.close()
}

if (isMain(import.meta.url)) {
  await resumePdf()
}
