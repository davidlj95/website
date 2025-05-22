import subsetFont from 'subset-font'
import * as MaterialSymbols from 'data/material-symbols'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { mkdir } from 'fs/promises'
import { isMain } from '../utils/is-main'
import { Log } from '../utils/log'
import { getRepositoryRootDir } from '../utils/get-repository-root-dir'
import { getAndCreateGeneratedDataDir } from '../utils/get-and-create-generated-data-dir'

async function generateFonts() {
  Log.info('Generating font subset for Material Symbols Outlined')
  const FONT_PACKAGE = 'material-symbols-outlined'
  const materialSymbolsFont = readFileSync(
    join(
      getRepositoryRootDir(),
      'node_modules',
      '@fontsource-variable',
      FONT_PACKAGE,
      'files',
      `${FONT_PACKAGE}-latin-full-normal.woff2`,
    ),
  )
  const fontBuffer = Buffer.from(materialSymbolsFont)

  // If using ligatures, file size increases by mystery
  const glyphs = Object.values(MaterialSymbols)
  Log.info('%d glyphs to include in font', glyphs.length)

  const glyphText = glyphs.join('')

  Log.info('Output')
  const fontSubsetsDir = join(
    await getAndCreateGeneratedDataDir(),
    'font-subsets',
  )
  await mkdir(fontSubsetsDir, { recursive: true })
  const baseFilepath = join(fontSubsetsDir, FONT_PACKAGE)
  const formats = ['ttf', 'woff', 'woff2']
  Log.item("Base filepath: '%s'", baseFilepath)
  Log.item('Formats:       %s', formats)

  await fontSubsets(fontBuffer, {
    text: glyphText,
    // https://caniuse.com/woff2
    // woff, ttf just to support IE users
    // https://caniuse.com/woff
    // https://caniuse.com/ttf
    formats: ['truetype', 'woff', 'woff2'],
    filename: baseFilepath,
  })
  Log.ok('Done')
}

async function fontSubsets(
  fontBuffer: Buffer,
  {
    text,
    formats,
    filename,
  }: Omit<GenerateFontSubsetOptions, 'format'> & { formats: FontFormat[] },
) {
  await Promise.all(
    formats.map((format) =>
      generateFontSubset(fontBuffer, {
        text,
        format,
        filename,
      }),
    ),
  )
}

interface GenerateFontSubsetOptions {
  text: string
  format: FontFormat
  filename: string
}

type FontFormat = 'truetype' | 'woff' | 'woff2' // any of the supported ones (see SubsetFontOptions type)

async function generateFontSubset(
  fontBuffer: Buffer,
  { text, format, filename }: GenerateFontSubsetOptions,
) {
  const subsetBuffer = await subsetFont(fontBuffer, text, {
    targetFormat: format,
    variationAxes: {
      FILL: { min: 0, max: 1 },
    },
  })
  writeFileSync(`${filename}.${getExtensionFromFormat(format)}`, subsetBuffer)
}

function getExtensionFromFormat(format: FontFormat): string {
  if (format == 'truetype') return 'ttf'
  return format
}

if (isMain(import.meta.url)) {
  await generateFonts()
}
