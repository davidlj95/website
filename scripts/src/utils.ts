import { fileURLToPath } from 'url'
import { dirname, join, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export function getRepositoryRootDir() {
  // Relative to `dist`, as this file will be output there
  return resolve(__dirname, '..', '..', '..')
}

export const objectToJson = (object: object) => JSON.stringify(object, null, 2)

export const SECURITY_TXT_REL_PATH = join('.well-known', 'security.txt')

/**
 * isMain(import.meta.url)
 * https://2ality.com/2022/07/nodejs-esm-main.html
 */
export function isMain(importMetaUrl: string) {
  const modulePath = fileURLToPath(importMetaUrl)
  return process.argv[1] === modulePath
}

export class Log implements Partial<Console> {
  static info(message: string, ...params: unknown[]) {
    console.info(`ℹ️ ${message}`, ...params)
  }

  static item(message: string, ...params: unknown[]) {
    console.info(`    - ${message}`, ...params)
  }

  static warn(message: string, ...params: unknown[]) {
    console.warn(`⚠️ ${message}`, ...params)
  }

  static group(label: string, ...params: unknown[]) {
    console.group(`🏷️${label}`, ...params)
  }

  static groupEnd() {
    console.groupEnd()
  }

  static ok(message: string, ...params: unknown[]) {
    console.info(`✅  ${message}`, ...params)
  }

  static error(message: string, ...params: unknown[]) {
    console.error(`❌  ${message}`, ...params)
  }
}
