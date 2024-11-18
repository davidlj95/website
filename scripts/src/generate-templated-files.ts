import { Liquid } from 'liquidjs'
import { METADATA } from '@/data/metadata'
import { join } from 'path'
import { mkdir, readdir, writeFile } from 'fs/promises'
import { execSync } from 'child_process'
import { isMain } from './utils/is-main'
import { Log } from './utils/log'
import { getRepositoryRootDir } from './utils/get-repository-root-dir'
import { getAndCreateGeneratedDataDir } from './utils/get-and-create-generated-data-dir'

export const LIQUID_EXTENSION = '.liquid'

async function generateTemplatedFiles() {
  Log.info('Looking for Liquid files...')
  Log.item("Extension: '%s'", LIQUID_EXTENSION)

  const templatesDir = join(getRepositoryRootDir(), 'data', 'templates')
  const templateFiles = await readdir(templatesDir)
  if (templateFiles.length == 0) {
    Log.warn('No files with Liquid extension found')
    process.exit()
  }

  Log.info('Found %d template file(s)', templateFiles.length)
  for (const templateFile of templateFiles) {
    Log.item("'%s'", templateFile)
  }

  Log.info('Rendering files from templates...')
  const context = getContext()
  const engine = new Liquid({
    root: templatesDir,
    dateFormat: '%Y-%m-%d %H:%M:%S+00:00',
    timezoneOffset: 0,
  })
  const outputDir = await getAndCreateOutputDir()
  for (const templateFile of templateFiles) {
    Log.group("Rendering '%s'", templateFile)

    const renderedContents = await engine.renderFile(templateFile, context)
    Log.ok('Rendered successfully')

    const outputFilename = templateFile.substring(
      0,
      templateFile.lastIndexOf('.'),
    )
    const outputFilepath = join(outputDir, outputFilename)
    await writeFile(outputFilepath, renderedContents)
    Log.ok("Output saved to '%s'", outputFilepath)
    Log.groupEnd()
  }
  Log.ok('Done')
}

function getContext() {
  const METADATA_CONTEXT = {
    ...METADATA,
  }
  const today = new Date()
  const sixMonthsFromToday = new Date(new Date().setMonth(today.getMonth() + 6))
  const EXTRA_CONTEXT = {
    manifestJsonMaskableIconSizes: [48, 72, 96, 128, 192, 384, 512],
    browserconfigIconSquareSizes: [70, 150, 310],
    prBranchName:
      // Use CI environment variable, or default to branch name to work locally
      process.env['GITHUB_HEAD_REF'] ??
      // https://stackoverflow.com/a/35778030/3263250
      execSync('git rev-parse --abbrev-ref HEAD').toString().trim(),
    securityTxtExpiration: sixMonthsFromToday,
  }
  return { ...METADATA_CONTEXT, ...EXTRA_CONTEXT }
}

async function getAndCreateOutputDir() {
  const outputDir = join(await getAndCreateGeneratedDataDir(), 'from-templates')
  await mkdir(outputDir, { recursive: true })
  return outputDir
}

if (isMain(import.meta.url)) {
  await generateTemplatedFiles()
}
