import subsetFont from 'subset-font'
import * as MaterialSymbols from '@/data/material-symbols.js'
import { getRepositoryRootDir, isMain, Log } from './utils.js'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

async function generateFonts() {
  Log.info('Generating font subset for Material Symbols Outlined')
  const materialSymbolsFont = readFileSync(
    join(getRepositoryRootDir(), 'assets', 'material-symbols-outlined.woff2'),
  )
  const fontBuffer = Buffer.from(materialSymbolsFont)

  // If using ligatures, file size increases by mystery
  const glyphs = Object.values(MaterialSymbols)
  Log.info('%d glyphs to include in font', glyphs.length)

  const glyphText = glyphs.join('')

  Log.info('Output')
  const baseFilename = join(
    getRepositoryRootDir(),
    'assets',
    'material-symbols-outlined-subset',
  )
  const formats = ['ttf', 'woff', 'woff2']
  Log.item("Base filename: '%s'", baseFilename)
  Log.item("Formats: '%s'", formats)

  await generateFontSubsets(fontBuffer, {
    text: glyphText,
    // https://caniuse.com/woff2
    // woff, ttf just to support IE users
    // https://caniuse.com/woff
    // https://caniuse.com/ttf
    formats: ['truetype', 'woff', 'woff2'],
    filename: baseFilename,
  })
  Log.ok('Done')
}

async function generateFontSubsets(
  fontBuffer: Buffer,
  {
    text,
    formats,
    filename,
  }: Omit<GenerateFontSubsetOptions, 'format'> & { formats: Array<FontFormat> },
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
