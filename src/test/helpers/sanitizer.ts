import { SafeValue } from '@angular/platform-browser';

/**
 * Useful to check for contents wrapped inside a SafeValue (SafeHtml, SafeScript, ...) as result of a DOM security
 * bypass
 */
export function getSafeValueContent(safeValue: SafeValue): string {
  return (safeValue as SafeValueImpl).changingThisBreaksApplicationSecurity;
}

// https://github.com/angular/angular/blob/16.2.0/packages/core/src/sanitization/bypass.ts#L63
type SafeValueImpl = { changingThisBreaksApplicationSecurity: string }
