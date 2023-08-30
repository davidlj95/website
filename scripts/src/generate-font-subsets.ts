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
    'format_paint',
  ];
  Log.info("Glyphs to inlude in font")
  glyphs.forEach((glyph) => Log.item(glyph));

  const glyphText = glyphs.join('');

  Log.info("Output")
  const baseFilename = 'assets/material-symbols-outlined-subset';
  const formats = ['woff', 'woff2']
  Log.item("Base filename: '%s'", baseFilename);
  Log.item("Formats: '%s'", formats);

  await generateFontSubsets(fontBuffer, {
    text: glyphText,
    // https://caniuse.com/woff2
    // woff just to support IE users
    // https://caniuse.com/woff
    formats: ['woff', 'woff2'],
    filename: baseFilename,
  });
}

async function generateFontSubsets(fontBuffer: Buffer, {
  text,
  formats,
  filename,
}: Omit<GenerateFontSubsetOptions, 'format'> & { formats: Array<GenerateFontSubsetOptions['format']> }) {
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
  format: 'woff' | 'woff2', // any of the supported ones (see SubsetFontOptions type)
  filename: string
}

async function generateFontSubset(fontBuffer: Buffer, {text, format, filename}: GenerateFontSubsetOptions) {
  const subsetBuffer = await subsetFont(fontBuffer, text, {targetFormat: format});
  fs.writeFileSync(`${filename}.${format}`, subsetBuffer);
}

if (isMain(module)) {
  generateFonts().then(() => {
    Log.ok('Done')
  });
}


