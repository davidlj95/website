/**
 * Used to know if we're in dev mode, in the same fashion Angular does
 *
 * Public API `isDevMode` (https://angular.io/api/core/isDevMode) is more
 * stable.
 *
 * However, given it's a function call, code under `if(isDevMode())` can not be tree-shaken
 * So to allow tree-shaking, using a `const` in the same fashion Angular does for their packages.
 *
 * Simplifying the type to be just an object, to avoid coupling to it. We're not interested in those contents anyway
 *
 * For instance:
 * https://github.com/angular/angular/blob/17.0.7/packages/router/src/router_module.ts#L38-L39
 *
 * See also:
 *  - https://github.com/angular/angular/issues/51175
 *  - https://github.com/angular/angular-cli/issues/23738
 *  - https://netbasal.com/explore-angular-clis-define-option-effortless-global-identifier-replacement-f08fec7d9243
 */
declare const ngDevMode: boolean
export const isDevMode = typeof ngDevMode === 'undefined' || ngDevMode
