import * as child_process from 'child_process';
import * as fs from 'fs/promises';
import { Liquid } from 'liquidjs';
import * as path from 'path';
import * as util from 'util';
import { generateTemplatedFile, LIQUID_EXTENSION } from './generate-templated-files.mjs';
import { getRepositoryRootDir, isMain, Log, SECURITY_TXT_REL_PATH } from './utils.mjs';

async function generateSecurityTxt() {
  Log.info('Rendering security.txt from template')
  const securityTxtFile = path.resolve(getRepositoryRootDir(), 'src', SECURITY_TXT_REL_PATH)
  const engine = new Liquid({
    dateFormat: '%Y-%m-%d %H:%M:%S+00:00',
    timezoneOffset: 0,
  })
  await generateTemplatedFile(`${securityTxtFile}${LIQUID_EXTENSION}`, {engine: engine})

  Log.info('Signing file with GPG')
  const exec = util.promisify(child_process.exec)
  const result = await exec(`gpg --output - --clear-sign ${securityTxtFile}`)
  Log.ok('Signed')

  Log.info('Writing signed file');
  await fs.writeFile(securityTxtFile, result['stdout']);
}

if (isMain(import.meta.url)) {
  generateSecurityTxt().then(() => {
    Log.ok('Done')
  });
}
