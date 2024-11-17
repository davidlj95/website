// @ts-check
// noinspection NpmUsedModulesInstalled
const eslint = require('@eslint/js')
const tseslint = require('typescript-eslint')
const angular = require('angular-eslint')
const eslintCompat = require('@eslint/compat')
const path = require('path')

const gitignorePath = path.resolve(__dirname, '.gitignore')

const cypressPlugin = require('eslint-plugin-cypress/flat')
const jsonFiles = require('eslint-plugin-json-files')

module.exports = tseslint.config(
  eslintCompat.includeIgnoreFile(gitignorePath),
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
    ],
  },
  {
    files: ['src/**/*.ts'],
    extends: [...angular.configs.tsRecommended],
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
    },
  },
  {
    files: ['src/**/*.html'],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {},
  },
  {
    files: ['**/*.cy.ts'],
    ...cypressPlugin.configs.recommended,
  },
  {
    files: ['**/*.json'],
    plugins: { 'json-files': jsonFiles },
    processor: jsonFiles.processors.json,
    rules: {
      'json-files/require-unique-dependency-names': 'error',
      'json-files/restrict-ranges': [
        'error',
        {
          versionHint: 'pin',
        },
      ],
      'json-files/sort-package-json': 'error',
    },
  },
  {
    files: ['scripts/package.json'],
    rules: {
      'json-files/restrict-ranges': [
        'error',
        {
          versionRegex: 'workspace:\\*',
        },
      ],
      'json-files/sort-package-json': 'error',
    },
  },
)
