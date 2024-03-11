# @davidlj95/website

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.0.

## To start

First, run the `prebuild` command, to generate files that are required for the app to work

```shell
pnpm run prebuild
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you
change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also
use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a
package that implements end-to-end testing capabilities.

## Commit message guidelines

Commit messages follow the [conventional commits][conventional-commits] guidelines. This allows for automating the
semantic versioning release process using [semantic release][semantic-release]

[conventional-commits]: https://www.conventionalcommits.org/en/v1.0.0/
[semantic-release]: https://semantic-release.gitbook.io/semantic-release/

### Commit message lint

To enforce that, [`commitlint`][commitlint] is used. It reads the commit messages on a PR and ensures they follow
[conventional commits][conventional-commits] convention.

You can use the following run script to ensure the last commit follows the guidelines:

```shell
pnpm run commitlint-last
```

[commitlint]: https://github.com/conventional-changelog/commitlint

## Release

[Semantic Release][semantic-release] is used to automate the release process. Based on commit messages, a new major,
minor or patch release is generated for every push to main branch. For every release, a Git tag will be created, a
GitHub release will be created and a new version of the app will be published to `npm` public registry. All of this
is managed automatically by [Semantic Release][semantic-release] and CI/CD pipelines.

> Config has been tweaked so all commits appear in the release notes. To do so, `types` of commits included are all
> of those defined in [Conventional Changelog type defaults][conventional-changelog-type-defaults]. But none is
> hidden. That list comprehends
> all [commit types that `commitlint`](https://github.com/conventional-changelog/commitlint/blob/v17.7.1/%40commitlint/config-conventional/index.js#L22-L32)
> will lint.

[conventional-changelog-type-defaults]: https://github.com/conventional-changelog/conventional-changelog/blob/conventional-changelog-conventionalcommits-v7.0.1/packages/conventional-changelog-conventionalcommits/constants.js#L3

### Getting release info

In order to embed release information in the app, a script was created to export that kind of information using
[Semantic Release's JavaScript API](https://semantic-release.gitbook.io/semantic-release/developer-guide/js-api).

To generate the release info, run

```shell
pnpm run prebuild:generate-release-file
```

It will generate a `release.json` file in the root of the repository containing all info about releases that
[Semantic Release][semantic-release] provides.

> ⚠️ **Next release can be fake**
>
> The API only outputs information when a new release has to be generated. As a
> workaround, a fake
> patch release is generated in case no release was needed to get access to all that info.
>
> **To distinguish a real run from a faked run, a `fake` property exists in that JSON** with value set to `true`. The
> only faked properties are about next release (`nextRelease` and `releases` at the moment of writing this). Info
> about last release
> remains correct even when faking the release to generate the output (`lastRelease` at the moment of writing this)

> ⚠️ **Next release can be a preview**
>
> If running the script from a branch that's not configured to trigger releases, the default API behaviour is to
> output no data. As a workaround, we simulate being on the `main` branch and see what would happen in that scenario
> when including commits from the current branch.
>
> **To distinguish a real run from a faked run, a `preview` property exists in that JSON** with value set to `true`.
> This is because it's a simulation of this branch being merged into main branch. But you could want to merge that
> against another (the script could be smarter and simulate that too, but not yet :P).

> ⚠️ **Next release can be fake and preview**
> If both of previous situations happen at same time (commits of branch are not enough to trigger a release and
> branch is not one configured for releases)

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

If you update some metadata in that file, run the script to update files generated from templates. Otherwise, they
won't be in sync.

> Automatically updating generated files is not straightforward. Doing something before/after an Angular app build
> runs is [not an option right now][angular-build-hooks-issue]. Adding a bunch of
> [pre `npm` run scripts][npm-pre-post-scripts] left the `package.json` file quite cluttered. Also, won't work if
> issuing `ng` commands. So decided to leave the task to update generated files to the developer. At some point a CI
> check could be introduced to ensure generated files are up-to-date. Generated files are left in the repo because of
> that reason (and also so you can clone & run without issues). That metadata won't change often anyway.

[angular-build-hooks-issue]: https://github.com/angular/angular-cli/issues/11787
[npm-pre-post-scripts]: https://docs.npmjs.com/cli/v9/using-npm/scripts#pre--post-scripts

## Quirks

## Rendering font subsets

Some fonts included are a subset of a big font file. Before doing anything, please run

```shell
pnpm run prebuild:font-subsets
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
cd .ci && make test # for instance
```

And see how a command run in the CI/CD behaves locally. Notice your machine's state may differ from the CI/CD machine
one.

## Further help

To get more help on the Angular CLI use `ng help` or go check out
the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
