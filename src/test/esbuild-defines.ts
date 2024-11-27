// Tests with Karma builder are built using Webpack:
// https://github.com/angular/angular-cli/blob/17.3.7/packages/angular_devkit/build_angular/src/builders/karma/index.ts#L38-L61
// So manually setting ESBuild defines here. There's no way AFAIK to set those using Karma builder
;(globalThis as unknown as { isDevMode: boolean }).isDevMode = true
