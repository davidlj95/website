import { resolve } from 'path'
import { mkdir } from 'fs/promises'
import { getRepositoryRootDir } from './get-repository-root-dir.js'

export async function getAndCreateGeneratedDataDir() {
  const generatedDataDir = resolve(getRepositoryRootDir(), 'data', 'generated')
  await mkdir(generatedDataDir, { recursive: true })
  return generatedDataDir
}
