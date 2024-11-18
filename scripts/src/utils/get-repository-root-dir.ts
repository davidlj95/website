import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export function getRepositoryRootDir() {
  // Relative to `dist`, as this file will be output there
  return resolve(__dirname, '..', '..', '..', '..')
}
