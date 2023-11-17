import { glob } from 'glob'
import { Liquid } from 'liquidjs'
import {
  getRepositoryRootDir,
  isMain,
  Log,
  SECURITY_TXT_REL_PATH,
} from './utils'
import { METADATA } from '../../src/app/metadata'
import { resolve } from 'path'
import { writeFile } from 'fs/promises'
import { execSync } from 'child_process'

export const LIQUID_EXTENSION = '.liquid'

async function generateTemplatedFiles() {
  const EXCLUSIONS = [SECURITY_TXT_REL_PATH].map(
    (exclusion) => `**/${exclusion}${LIQUID_EXTENSION}`,
  )
  const repoRootDir = getRepositoryRootDir()
  const globExpression = resolve('src', '**', `*${LIQUID_EXTENSION}`)
  Log.info('Looking for Liquid files...')
  Log.item("Extension: '%s'", LIQUID_EXTENSION)
  Log.item("Directory: '%s'", globExpression)
  Log.item('Exclusions: %s', EXCLUSIONS)

  const templateFiles = await glob(globExpression, {
    absolute: false,
    cwd: repoRootDir,
    dot: true,
    ignore: EXCLUSIONS,
  })

  if (templateFiles.length == 0) {
    Log.warn('No files with Liquid extension found')
    process.exit()
  }

  Log.info('Found %d template file(s)', templateFiles.length)
  for (const templateFile of templateFiles) {
    Log.item("'%s'", templateFile)
  }

  const context = getContext()

  Log.info('Rendering files from templates...')
  const engine = new Liquid({ root: repoRootDir })

  for (const templateFile of templateFiles) {
    await generateTemplatedFile(templateFile, {
      context: context,
      engine: engine,
    })
  }
  Log.ok('Done')
}

export async function generateTemplatedFile(
  templateFile: string,
  opts: {
    context?: unknown
    engine?: Liquid
  } = {},
) {
  const context = opts.context ?? getContext()
  const engine = opts.engine ?? new Liquid()

  Log.group("Rendering '%s'", templateFile)

  const renderedContents = await engine.renderFile(templateFile, context)
  Log.ok('Rendered successfully')

  const outputFile = templateFile.substring(0, templateFile.lastIndexOf('.'))
  await writeFile(resolve(engine.options.root[0], outputFile), renderedContents)
  Log.ok("Output saved to '%s'", outputFile)

  Log.groupEnd()
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
    securityTxtExpiration: sixMonthsFromToday,
    prBranchName:
      // Use CI environment variable, or default to branch name to work locally
      process.env['GITHUB_HEAD_REF'] ??
      // https://stackoverflow.com/a/35778030/3263250
      execSync('git rev-parse --abbrev-ref HEAD').toString().trim(),
  }
  const CONTEXT = { ...METADATA_CONTEXT, ...EXTRA_CONTEXT }
  Log.info('Context for rendering')
  Log.info(JSON.stringify(CONTEXT, null, 4))
  return CONTEXT
}

if (isMain(import.meta.url)) {
  await generateTemplatedFiles()
}
