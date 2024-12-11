// Tests with Karma builder are built using Webpack:
// https://github.com/angular/angular-cli/blob/17.3.7/packages/angular_devkit/build_angular/src/builders/karma/index.ts#L38-L61
// Though experimental support for building with ESBuild / application builder was added in v19
// https://github.com/angular/angular-cli/pull/28416
// However, `angular.json` doesn't allow to set the `define`s if using ESBuild
// So manually setting ESBuild defines here. There's no way AFAIK to set those using Karma builder
;(globalThis as unknown as { isDevMode: boolean }).isDevMode = true
