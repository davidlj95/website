import * as path from "path";
import * as process from "process";
import * as url from "url";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function getRepositoryRootDir() {
  return path.resolve(__dirname, "..", "..");
}

export const SECURITY_TXT_REL_PATH = path.join(".well-known", "security.txt");

/**
 * isMain(import.meta.url)
 * https://2ality.com/2022/07/nodejs-esm-main.html
 */
export function isMain(importMetaUrl: string) {
  const modulePath = url.fileURLToPath(importMetaUrl);
  return process.argv[1] === modulePath;
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

  static error(message: string, ...params: unknown[]) {
    console.error(`❌  ${message}`, ...params);
  }
}
