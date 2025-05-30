import { join, resolve } from 'path'
import { promisify } from 'util'
import { exec } from 'child_process'
import { writeFile } from 'fs/promises'
import { isMain } from './utils/is-main'
import { Log } from './utils/log'
import { getRepositoryRootDir } from './utils/get-repository-root-dir'

export const SECURITY_TXT = 'security.txt'

async function securityTxt() {
  const securityTxtFile = resolve(
    getRepositoryRootDir(),
    'data',
    'generated',
    'from-templates',
    SECURITY_TXT,
  )

  Log.info('Signing file with GPG')
  const execAsync = promisify(exec)
  const result = await execAsync(
    `gpg --output - --clear-sign ${securityTxtFile}`,
  )
  Log.ok('Signed')

  Log.info('Writing signed file')
  await writeFile(
    join(getRepositoryRootDir(), 'src', '.well-known', SECURITY_TXT),
    result.stdout,
  )
  Log.ok('Done')
}

if (isMain(import.meta.url)) {
  await securityTxt()
}
