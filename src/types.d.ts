/**
 * Used to know if we're in dev mode, in the same fashion Angular does
 *
 * Public API `isDevMode` (https://angular.io/api/core/isDevMode) is more
 * stable.
 *
 * However, given it's a function call, code under `if(isDevMode())` can not be tree-shaken
 * So to allow tree-shaking, using a `const` in the same fashion Angular does for their packages.
 *
 * We can't use `ngDevMode` either like this:
 *
 * ```typescript
 * declare const ngDevMode: boolean
 * export const isDevMode = typeof ngDevMode === 'undefined' || ngDevMode
 * ```
 *
 * ESBuild doesn't go so far of taking `isDevMode` as interpreting build-time as const
 * So code is not tree-shaken either.
 *
 * So using ESBuild defines for the purpose, configured in `angular.json`
 *
 * See also:
 *  - https://github.com/angular/angular/blob/17.0.7/packages/router/src/router_module.ts#L38-L39
 *  - https://github.com/angular/angular/issues/51175
 *  - https://github.com/angular/angular-cli/issues/23738
 *  - https://netbasal.com/explore-angular-clis-define-option-effortless-global-identifier-replacement-f08fec7d9243
 */
declare const isDevMode: boolean
