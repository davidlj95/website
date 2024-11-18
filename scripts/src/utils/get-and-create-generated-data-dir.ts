import { resolve } from 'path'
import { getRepositoryRootDir } from './get-repository-root-dir'
import { mkdir } from 'fs/promises'

export async function getAndCreateGeneratedDataDir() {
  const generatedDataDir = resolve(getRepositoryRootDir(), 'data', 'generated')
  await mkdir(generatedDataDir, { recursive: true })
  return generatedDataDir
}
