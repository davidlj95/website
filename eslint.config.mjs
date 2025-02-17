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

import globals from 'globals'

const gitignorePath = resolve(
  dirname(fileURLToPath(import.meta.url)),
  '.gitignore',
)

const jsRules = [eslint.configs.recommended]

export const NAMING_CONVENTION_SELECTORS = [
  // https://github.com/typescript-eslint/typescript-eslint/blob/v8.16.0/packages/eslint-plugin/docs/rules/naming-convention.mdx#enforce-that-all-variables-functions-and-properties-follow-are-camelcase
  {
    selector: 'variableLike',
    format: ['camelCase'],
  },
  // https://google.github.io/styleguide/tsguide.html#naming-rules-by-identifier-type
  {
    selector: 'variable',
    format: ['camelCase', 'UPPER_CASE'],
  },
  // https://github.com/typescript-eslint/typescript-eslint/blob/v8.16.0/packages/eslint-plugin/docs/rules/naming-convention.mdx#enforce-that-private-members-are-prefixed-with-an-underscore
  // 👇 `modifiers` matches code with ALL modifiers specified
  //    To specify the same for several modifiers, repeating the rule for each one
  ...['private', 'protected'].map((modifier) => ({
    selector: 'memberLike',
    modifiers: [modifier],
    format: ['camelCase'],
    leadingUnderscore: 'require',
  })),
  // https://github.com/typescript-eslint/typescript-eslint/blob/v8.16.0/packages/eslint-plugin/docs/rules/naming-convention.mdx#enforce-that-interface-names-do-not-begin-with-an-i
  {
    selector: 'typeLike',
    format: ['PascalCase'],
  },
]

export default tsEslint.config(
  includeIgnoreFile(gitignorePath),
  {
    // Symlinked file may not exist if file hasn't been generated
    ignores: [
      'public/manifest.json',
      'public/release.json',
      'src/environments/environment.pull-request.ts',
    ],
  },
  // Configuration files. Right now ESLint and Karma.
  {
    files: ['*.mjs', '*.js'],
    extends: [...jsRules],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ['**/*.ts'],
    extends: [
      ...jsRules,
      ...tsEslint.configs.recommended,
      ...tsEslint.configs.stylistic,
    ],
    rules: {
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        { accessibility: 'no-public' },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        ...NAMING_CONVENTION_SELECTORS,
      ],
    },
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
    extends: [eslintPluginJasmine.configs.recommended],
  },
  {
    files: ['**/*.cy.ts', 'cypress/**/*.ts'],
    extends: [eslintPluginCypress.configs.recommended],
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
