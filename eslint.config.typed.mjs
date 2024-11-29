import eslintConfig, { NAMING_CONVENTION_SELECTORS } from './eslint.config.mjs'
import tsEslint from 'typescript-eslint'

// noinspection JSUnusedGlobalSymbols
export default tsEslint.config(
  ...eslintConfig,
  {
    files: ['**/*.ts'],
    extends: [
      ...tsEslint.configs.recommendedTypeCheckedOnly,
      ...tsEslint.configs.stylisticTypeCheckedOnly,
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/naming-convention': [
        'error',
        ...NAMING_CONVENTION_SELECTORS,
        // https://github.com/typescript-eslint/typescript-eslint/blob/v8.16.0/packages/eslint-plugin/docs/rules/naming-convention.mdx#enforce-that-boolean-variables-are-prefixed-with-an-allowed-verb
        {
          selector: [
            // `member-like` without:
            //  - `property`: will be specified later, with exceptions
            //  - `enumMember`: no types allowed
            //  - `method`: no types allowed
            'classicAccessor',
            'autoAccessor',
            'parameterProperty',
            // All `property` but `objectLiteralProperty`
            'classProperty',
            'typeProperty',
            // The rest
            'parameter',
            'variable',
          ],
          types: ['boolean'],
          format: ['PascalCase'],
          prefix: ['is', 'should', 'has', 'can', 'did', 'will'],
          leadingUnderscore: 'allow',
        },
      ],
    },
  },
  {
    files: ['src/**/*.spec.ts'],
    rules: {
      // 👇 To refer to spied object methods (i.e.: created with `createSpyObj`)
      '@typescript-eslint/unbound-method': 'off',
    },
  },
)
