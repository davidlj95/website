// @ts-check
// noinspection NpmUsedModulesInstalled
import eslint from '@eslint/js'
import tsEslint from 'typescript-eslint'
import angular from 'angular-eslint'

import { includeIgnoreFile } from '@eslint/compat'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginCypress from 'eslint-plugin-cypress/flat'
import eslintPluginJasmine from 'eslint-plugin-jasmine'
import eslintPluginJsonFiles from 'eslint-plugin-json-files'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const gitignorePath = resolve(__dirname, '.gitignore')

export default tsEslint.config(
  includeIgnoreFile(gitignorePath),
  {
    // Symlinked file may not exist if file hasn't been generated
    ignores: ['src/release.json'],
  },
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tsEslint.configs.recommended,
      ...tsEslint.configs.stylistic,
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
    files: ['src/**/*.spec.ts'],
    plugins: { jasmine: eslintPluginJasmine },
    ...eslintPluginJasmine.configs.recommended,
  },
  {
    files: ['**/*.cy.ts', 'cypress/**/*.ts'],
    ...eslintPluginCypress.configs.recommended,
  },
  {
    files: ['**/*.json'],
    plugins: { 'json-files': eslintPluginJsonFiles },
    processor: eslintPluginJsonFiles.processors.json,
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
  eslintConfigPrettier,
)
