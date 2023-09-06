import * as path from 'path';
import * as process from 'process';

export function getRepositoryRootDir() {
  return path.resolve(__dirname, '..');
}

export const SECURITY_TXT_REL_PATH = path.join('.well-known', 'security.txt');

export function isMain(module: NodeModule) {
  return process.argv[1] == module.filename;
}

export class Log implements Partial<Console> {
  static info(message: string, ...params: unknown[]) {
    console.info(`ℹ️ ${message}`, ...params);
  }

  static item(message: string, ...params: unknown[]) {
    console.info(`    - ${message}`, ...params);
  }

  static warn(message: string, ...params: unknown[]) {
    console.warn(`⚠️ ${message}`, ...params);
  }

  static group(label: string, ...params: unknown[]) {
    console.group(`🏷️${label}`, ...params);
  }

  static groupEnd() {
    console.groupEnd();
  }

  static ok(message: string, ...params: unknown[]) {
    console.info(`✅  ${message}`, ...params);
  }
}
