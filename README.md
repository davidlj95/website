# @davidlj95/website

[![CI/CD workflow](https://github.com/davidlj95/ngx/actions/workflows/cicd.yml/badge.svg)](https://github.com/davidlj95/ngx/actions/workflows/cicd.yml)
[![Codecov](https://codecov.io/gh/davidlj95/website/graph/badge.svg)](https://codecov.io/gh/davidlj95/website)
[![GitHub last commit (branch)](https://img.shields.io/github/last-commit/davidlj95/website/main?logo=github&label=Last%20commit&link=https%3A%2F%2Fgithub.com%2Fdavidlj95%2Fwebsite%2Fcommits%2Fmain%2F)](https://github.com/davidlj95/website/commits/main/)
[![License](https://img.shields.io/github/license/davidlj95/website?label=License&link=https%3A%2F%2Fgithub.com%2Fdavidlj95%2Fwebsite%2Fblob%2Fmain%2FLICENSE)](https://github.com/davidlj95/website/blob/main/LICENSE)

👋 Welcome to my small place in the web 🏠

## Tooling

[![Coded in Typescript](https://img.shields.io/badge/Coded_in-TypeScript-007ACC?logo=typescript&logoColor=white&link=https%3A%2F%2Fwww.typescriptlang.org)](https://www.typescriptlang.org)
[![Angular](https://img.shields.io/badge/Made_with-Angular-red?logo=angular&logoColor=white&link=https%3A%2F%2Fangular.dev%2F)](https://angular.dev/)
![Angular SSR](https://custom-icon-badges.demolab.com/badge/Uses-Angular_SSR-blue.svg?logo=angular-universal&link=https%3A%2F%2Fangular.dev%2Fguide%2Fssr)
[![Git](https://img.shields.io/badge/VCS-Git-f05032?logo=git&logoColor=f05032&link=https%3A%2F%git-scm.com%2F)](https://git-scm.com/)
[![GitHub](https://img.shields.io/badge/Repository%20hosting-GitHub-181717?logo=github&logoColor=181717&link=https%3A%2F%github.com%2F)](https://github.com/)
[![Package manager: pnpm](https://img.shields.io/badge/Package_manager-pnpm-f69220?logo=pnpm&link=https%3A%2F%2Fpnpm.io%2F)](https://pnpm.io/)
[![Linted with ESLint](https://img.shields.io/badge/Linted_with-ESLint-3A33D1?logo=eslint&logoColor=white&link=https%3A%2F%2Feslint.org)][ESLint]
[![Unit tests with Jasmine](https://img.shields.io/badge/Unit_tests_with-Jasmine-8A4182?logo=Jasmine&logoColor=white&link=https%3A%2F%2Fjasmine.github.io)](https://jasmine.github.io)
[![Unit tests ran by Karma](https://custom-icon-badges.demolab.com/badge/Unit_tests_ran_by-Karma-42beae.svg?logo=karma-runner&link=https%3A%2F%2Fkarma-runner.github.io)](https://karma-runner.github.io)
[![Component Testing with Cypress](https://img.shields.io/badge/Component_Testing_with-Cypress-green?logo=cypress&link=https%3A%2F%2Fwww.cypress.io)](https://www.cypress.io)
[![Formatted with Prettier](https://img.shields.io/badge/Formatted_with-prettier-1A2C34?logo=prettier&logoColor=F7BA3E&link=https%3A%2F%2Fprettier.io)](https://prettier.io)
[![Commits follow Conventional Commits convention](https://img.shields.io/badge/Commits_convention-Conventional_Commits-%23FE5196?logo=conventionalcommits&logoColor=white&link=https%3A%2F%2Fconventionalcommits.org)](https://conventionalcommits.org)
[![Git hooks with Husky](https://img.shields.io/badge/Git_hooks_with-Husky%F0%9F%90%B6-1a1a1e?link=https%3A%2F%2Ftypicode.github.io%2Fhusky%2F)](https://typicode.github.io/husky/)
[![Decluttered with Knip](https://img.shields.io/badge/Decluttered_with-Knip-f56e0f?logo=knip&logoColor=f56e0f&link=https%3A%2F%2Fknip.dev)](https://knip.dev)
[![Released with Release It!](https://img.shields.io/badge/Released_with-%F0%9F%9A%80_Release_It!-black?link=https%3A%2F%2Fgithub.com%2Frelease-it%2Frelease-it)](https://github.com/release-it/release-it)
[![Dependencies updated with Renovate](https://img.shields.io/badge/Dependencies_updated_with-Renovate-1a1f6c?logo=renovate&logoColor=white&link=https%3A%2F%2Frenovatebot.com)](https://renovatebot.com)
[![Deployed via Cloudflare Pages](https://img.shields.io/badge/Deployed_via-Cloudflare%20Pages-f38020?logo=cloudflarepages&link=https%3A%2F%pages.cloudflare.com%2F)](https://pages.cloudflare.com/)

[ESLint]: https://eslint.org

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.0.

## To start

First, run the `data` command, to generate data files that are required for the app to work

```shell
pnpm run data
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you
change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also
use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

> Remember to run the data generation scripts first

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a
package that implements end-to-end testing capabilities.

## Commit message guidelines

Commit messages follow the [conventional commits][conventional-commits] guidelines. This allows for automating the release process. By bumping the version depending on the type specified in the commit message. See [release](#release) for more info.

[conventional-commits]: https://www.conventionalcommits.org/en/v1.0.0/

### Commit message lint

To enforce that, [`commitlint`][commitlint] is used. It reads the commit messages on a PR and ensures they follow
[conventional commits][conventional-commits] convention.

You can use the following run script to ensure the last commit follows the guidelines:

```shell
pnpm run commitlint:last
```

[commitlint]: https://github.com/conventional-changelog/commitlint

## Lint

Linting is enabled via [Angular ESLint](https://github.com/angular-eslint/angular-eslint) which adds some nice [ESLint] default configurations for Angular projects. Some additions are done in top of that to lint more files, `package.json`, Jasmine & Cypress... Run the linter for the whole project via:

```shell
pnpm run lint:code
```

By default, [Typescript typed linting](https://typescript-eslint.io/getting-started/typed-linting/) will not run for performance reasons. Except on CI/CD and when using IntelliJ-based IDEs like WebStorm. You can run the full suite of lint rules including typed ones by using the following command:

```shell
pnpm run lint:code:typed
```

## Release

[Release It!][release-it] is used to automate the release process. With the [conventional changelog plugin][release-it-cc] in order to automatically decide which kind of bump to perform (major, minor, patch) based on unreleased commits' messages.

For every push to `main` branch, [Release It!][release-it] will run and check if a new release is needed. In case it is, a `git` tag will be assigned to that commit and a GitHub release will be created containing the built app as an asset.

[release-it]: https://github.com/release-it/release-it
[release-it-cc]: https://github.com/release-it/conventional-changelog

> Config has been tweaked so all commits appear in the release notes. To do so, `types` of commits included are all
> of the available in [Conventional Changelog](https://github.com/conventional-changelog/conventional-changelog/blob/conventional-changelog-conventionalcommits-v7.0.1/packages/conventional-changelog-conventionalcommits/constants.js#L3). But none is
> hidden. That list comprehends
> all [commit types that `commitlint`](https://github.com/conventional-changelog/commitlint/blob/v17.7.1/%40commitlint/config-conventional/index.js#L22-L32)
> will lint.

### Getting release info

In order to embed release information in the app, a script runs to export that kind of information using
[Release It!'s programmatic API](https://github.com/release-it/release-it/blob/main/docs/recipes/programmatic.md).

To generate the release info, go to `scripts` directory and run

```shell
pnpm run generate:release-info
```

It will generate a `release.json` file in the source directory of the app containing the:

- Commit SHA
- Current release version & CHANGELOG
- Unreleased changes CHANGELOG

Checkout the [script](scripts/src/generate-release-info.ts) for more information.

## Git hooks

Not a fan of, but it's useful to enforce conventional commits & format your code before submitting it

To use it, run

```shell
pnpm run git-hooks
```

It will install Git hooks via [`husky`](https://typicode.github.io/husky/). Now everytime you commit, you'll be sure
commit message guidelines are enforced.

> This is very useful if you can push to `main` directly. Because there's no way to reject commits that don't follow the
> commit message guidelines. And once you push to `main`, you cannot amend that commit as per branch protection rules.

## Autogenerated files from templates

Some metadata about the app (like title, author, theme color...) was repeated across files. So used
[LiquidJS](https://liquidjs.com) to create template files (`.liquid` extension). Then, created a small script to render
templates into generated files using metadata defined in `metadata.ts` file (and some hardcoded constants in the
generation script)

If you update some metadata in that file, run the script to update files generated from templates. Otherwise, you
won't see those changes.

## Quirks

### Preview deployments

Can only be triggered by users with write access to the repo (to prevent secrets from being leaked). Same secret is used for production access, so better keep that one safe.

Also, branch names should be short. Otherwise, the `canonicalUrl` may be incorrect, given we try to generate the URL following docs about it in Cloudflare Pages docs. But the exact algorithm to generate the preview URL from branch name is not published. Empirically, it is known that branch names get shorten if they exceed a certain length.

See https://github.com/davidlj95/website/pull/289 for more info.

## Rendering font subsets

Some fonts included are a subset of a big font file. Before doing anything, please go to `scripts` directory and run

```shell
pnpm run generate:font-subsets
```

To generate them. Otherwise, those fonts won't be found and you may get some errors. Also, remember to run it if
changing the glyphs included in each font. Or to add the new glyphs if you want to use more glyphs of a font.

## CI/CD

GitHub Actions are used

### Commands ran by CI/CD

In order to ease running CI/CD commands locally, the `.ci` directory contains a `Makefile` intended to contain all
commands that will be run in CI/CD pipelines. So you can test those locally easily

Just:

```shell
cd .ci && make unit-test # for instance
```

And see how a command run in the CI/CD behaves locally. Notice your machine's state may differ from the CI/CD machine
one. Not all commands are there, only the ones that differ from regular `package.json` run scripts.

## Further help

To get more help on the Angular CLI use `ng help` or go check out
the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
