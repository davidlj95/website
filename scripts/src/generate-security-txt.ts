import { Liquid } from 'liquidjs'
import {
  generateTemplatedFile,
  LIQUID_EXTENSION,
} from './generate-templated-files'
import {
  getRepositoryRootDir,
  isMain,
  Log,
  SECURITY_TXT_REL_PATH,
} from './utils.mjs'
import { resolve } from 'path'
import { promisify } from 'util'
import { exec } from 'child_process'
import { writeFile } from 'fs/promises'

async function generateSecurityTxt() {
  Log.info('Rendering security.txt from template')
  const securityTxtFile = resolve(
    getRepositoryRootDir(),
    'src',
    SECURITY_TXT_REL_PATH,
  )
  const engine = new Liquid({
    dateFormat: '%Y-%m-%d %H:%M:%S+00:00',
    timezoneOffset: 0,
  })
  await generateTemplatedFile(`${securityTxtFile}${LIQUID_EXTENSION}`, {
    engine: engine,
  })

  Log.info('Signing file with GPG')
  const execAsync = promisify(exec)
  const result = await execAsync(
    `gpg --output - --clear-sign ${securityTxtFile}`,
  )
  Log.ok('Signed')

  Log.info('Writing signed file')
  await writeFile(securityTxtFile, result['stdout'])
  Log.ok('Done')
}

if (isMain(import.meta.url)) {
  await generateSecurityTxt()
}
