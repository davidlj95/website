import * as path from 'path';
import * as process from 'process';
import { fileURLToPath } from 'url';

export function getRepositoryRootDir() {
  return path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
}

export const SECURITY_TXT_REL_PATH = path.join('.well-known', 'security.txt');

// https://stackoverflow.com/a/63193714/3263250
export function isMain(moduleUrl: string) {
  return process.argv[1] === fileURLToPath(moduleUrl)
}

export class Log implements Partial<Console> {
  static info(message: string, ...params: any[]) {
    console.info(`ℹ️ ${message}`, ...params);
  }

  static item(message: string, ...params: any[]) {
    console.info(`    - ${message}`, ...params);
  }

  static warn(message: string, ...params: any[]) {
    console.warn(`⚠️ ${message}`, ...params);
  }

  static group(label: string, ...params: any[]) {
    console.group(`🏷️${label}`, ...params);
  }

  static groupEnd() {
    console.groupEnd();
  }

  static ok(message: string, ...params: any[]) {
    console.info(`✅  ${message}`, ...params);
  }
}
