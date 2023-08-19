import * as fs from 'fs/promises';
import { Liquid } from 'liquidjs';
import * as path from 'path';
import * as process from 'process';
import { fileURLToPath } from 'url';
import {
  AUTHOR_URL,
  DESCRIPTION,
  DESCRIPTION_LINES,
  DOMAIN_NAME,
  NICKNAME,
  REAL_NAME,
  SITE_NAME,
  THEME_COLOR
} from './app/metadata';

const LIQUID_EXTENSION = '.liquid';
const sourceDirectory = path.dirname(fileURLToPath(import.meta.url));
console.log("ℹ️ Looking for Liquid files...");
console.log("    - Extension: '%s'", LIQUID_EXTENSION);
console.log("    - Directory: '%s'", sourceDirectory);

const sourceFiles = await fs.readdir(sourceDirectory)
const templateFiles = sourceFiles.filter((file) => path.extname(file) == LIQUID_EXTENSION)

if (templateFiles.length == 0) {
  console.warn('⚠️ %d items found. None of it has a template extension', templateFiles.length);
  process.exit();
}

console.log('ℹ️ Found %d template file(s) (of %d items)', templateFiles.length, sourceFiles.length);
for (const templateFile of templateFiles) {
  console.log("    - '%s'", templateFile);
}

console.log('ℹ️ Context built from metadata');
const METADATA_CONTEXT = {
  nickname: NICKNAME,
  realName: REAL_NAME,
  siteName: SITE_NAME,
  description: DESCRIPTION,
  descriptionLines: DESCRIPTION_LINES,
  domainName: DOMAIN_NAME,
  authorUrl: AUTHOR_URL.toString(),
  themeColor: THEME_COLOR,
};
console.table(METADATA_CONTEXT);
console.log('ℹ️ Extra context');
const EXTRA_CONTEXT = {
  manifestJsonIcons: [
    {size: 36, density: '0.75'},
    {size: 48, density: '1.0'},
    {size: 72, density: '1.5'},
    {size: 96, density: '2.0'},
    {size: 144, density: '3.0'},
    {size: 192, density: '4.0'},
  ],
  browserconfigIconSizes: [70, 150, 310],
};
console.table(EXTRA_CONTEXT);
const CONTEXT = {...METADATA_CONTEXT, ...EXTRA_CONTEXT}

console.log('⚙️ Rendering files from templates...');
const engine = new Liquid({root: sourceDirectory});

for (const templateFile of templateFiles) {
  console.group("ℹ️ Rendering '%s'", templateFile);
  const renderedContents = await engine.renderFile(templateFile, CONTEXT);
  console.info("✅  Rendered successfully")
  const outputFile = path.parse(templateFile).name;
  await fs.writeFile(path.resolve(sourceDirectory, outputFile), renderedContents);
  console.info("✅  Output saved to '%s'", outputFile);
  console.groupEnd();
}
