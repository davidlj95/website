import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

export function getRepositoryRootDir() {
  // Relative to `dist`, as this file will be output there
  return resolve(
    dirname(fileURLToPath(import.meta.url)),
    '..',
    '..',
    '..',
    '..',
  )
}
