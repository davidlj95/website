import { defineConfig } from 'cypress'
import { CoverageWebpackConfig } from './cypress/coverage-webpack-config'
import registerCodeCoverageTasks from '@cypress/code-coverage/task'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',
  },

  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
      options: {
        projectConfig: {
          //👇 To be in sync with angular.json build target
          //   Cypress isn't ready for ESBuild yet
          //   https://github.com/cypress-io/cypress/issues/28997
          //   The configuration is the minimal one in order to make it work
          root: '',
          sourceRoot: 'src',
          buildOptions: {
            styles: ['src/styles.scss', 'src/sass/themes/devtools.scss'],
            stylePreprocessorOptions: {
              includePaths: ['src/sass'],
            },
            //👇 If not adding types.d.ts here, it isn't included and `isDevMode` isn't defined
            //   Maybe because Cypress tries to build only what the component imports. But that type is global
            //   The value is then actually set to `true` by the `esbuild-defines.ts` as done with unit tests
            polyfills: ['src/types.d.ts', 'src/test/esbuild-defines.ts'],
          },
        },
      },
      webpackConfig: CoverageWebpackConfig,
    },
    specPattern: '**/*.cy.ts',
    setupNodeEvents(on, config) {
      registerCodeCoverageTasks(on, config)
      return config
    },
  },
})
