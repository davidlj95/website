import * as fs from 'fs';
import subsetFont from 'subset-font';
import { isMain, Log } from '../utils';

async function generateFonts() {
  Log.info("Generating font subset for Material Symbols Outlined")
  // Obtained from Google Fonts
  // https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200
  const materialSymbolsFont = fs.readFileSync('assets/material-symbols-outlined.woff2');
  const fontBuffer = Buffer.from(materialSymbolsFont);

  const glyphs = [
    'dark_mode',
    'light_mode',
  ];
  Log.info("Glyphs to include in font")
  glyphs.forEach((glyph) => Log.item(glyph));

  const glyphText = glyphs.join('');

  Log.info("Output")
  const baseFilename = 'assets/material-symbols-outlined-subset';
  const formats = ['ttf', 'woff', 'woff2']
  Log.item("Base filename: '%s'", baseFilename);
  Log.item("Formats: '%s'", formats);

  await generateFontSubsets(fontBuffer, {
    text: glyphText,
    // https://caniuse.com/woff2
    // woff, ttf just to support IE users
    // https://caniuse.com/woff
    // https://caniuse.com/ttf
    formats: ['truetype', 'woff', 'woff2'],
    filename: baseFilename,
  });
}

async function generateFontSubsets(fontBuffer: Buffer, {
  text,
  formats,
  filename,
}: Omit<GenerateFontSubsetOptions, 'format'> & { formats: Array<FontFormat> }) {
  await Promise.all(
    formats.map((format) => generateFontSubset(fontBuffer, {
      text: text,
      format: format,
      filename: filename,
    })),
  )
}

interface GenerateFontSubsetOptions {
  text: string,
  format: FontFormat,
  filename: string
}

type FontFormat = 'truetype' | 'woff' | 'woff2'; // any of the supported ones (see SubsetFontOptions type)

async function generateFontSubset(fontBuffer: Buffer, {text, format, filename}: GenerateFontSubsetOptions) {
  const subsetBuffer = await subsetFont(fontBuffer, text, {targetFormat: format});
  fs.writeFileSync(`${filename}.${getExtensionFromFormat(format)}`, subsetBuffer);
}

function getExtensionFromFormat(format: FontFormat): string {
  if (format == 'truetype') return 'ttf';
  return format;
}

if (isMain(module)) {
  generateFonts().then(() => {
    Log.ok('Done')
  });
}


