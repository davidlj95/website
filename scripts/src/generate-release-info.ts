// @ts-expect-error No default export
import release, { Config } from 'release-it'
import { createReleaseItConfig, ExtraConfig } from '@/data/release-it'
import { execSync } from 'child_process'
import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'
import { objectToJson } from './utils/object-to-json'
import { isMain } from './utils/is-main'
import { getRepositoryRootDir } from './utils/get-repository-root-dir'
import { getAndCreateGeneratedDataDir } from './utils/get-and-create-generated-data-dir'

interface ReleaseData {
  commitSha: string
  current: {
    version: string
    changelog: string
  }
  next?: {
    changelog: string
  }
}

// TODO: PR for this
const releaseIt = release as (config: Config) => Promise<{
  name: string
  changelog: string
  latestVersion: string
  version: string | undefined
}>

const generateReleaseInfo = async (): Promise<ReleaseData> => {
  const dryRunReleaseResult = await dryRunReleaseIt()
  const commitSha = execSync('git rev-parse HEAD').toString().trim()
  if (dryRunReleaseResult.version) {
    return {
      commitSha,
      current: {
        version: dryRunReleaseResult.version,
        changelog: dryRunReleaseResult.changelog,
      },
    }
  }

  const currentReleaseData = {
    commitSha,
    current: {
      version: dryRunReleaseResult.latestVersion,
      changelog: await getLastChangelog(dryRunReleaseResult.latestVersion),
    },
  }

  const isReleasedAlready =
    execSync('git tag --points-at HEAD').toString().trim().length > 0
  if (isReleasedAlready) {
    return currentReleaseData
  }

  return {
    ...currentReleaseData,
    next: {
      changelog: await fixUnreleasedChangelog(dryRunReleaseResult.changelog),
    },
  }
}

const dryRunReleaseIt = (extraConfig?: ExtraConfig) => {
  const config = createReleaseItConfig(extraConfig)
  const dryRunConfig: Config = {
    git: {
      ...config.git,
      requireCleanWorkingDir: false,
      requireUpstream: false,
      requireBranch: false,
      push: false,
      tag: false,
    },
    github: {
      ...config.github,
      release: false,
    },
    // @ts-expect-error TODO: Invalid definition, issue a PR
    dryRun: true,
  }
  return releaseIt({
    ...config,
    ...dryRunConfig,
  })
}

const getLastChangelog = async (lastVersion: string): Promise<string> => {
  const previousVersion = getPreviousVersion()
  const lastChangelog = (
    await dryRunReleaseIt({
      gitRawCommitsOpts: { from: previousVersion, to: `v${lastVersion}` },
    })
  ).changelog
  return lastChangelog
    .slice(lastChangelog.indexOf(`## [${lastVersion}]`))
    .replace(`v${lastVersion}...vnull`, `${previousVersion}...v${lastVersion}`)
}

const getPreviousVersion = (): string =>
  execSync('git describe --abbrev=0 --tags `git describe --abbrev=0 --tags`^')
    .toString()
    .trim()

const fixUnreleasedChangelog = async (changelog: string): Promise<string> =>
  changelog
    .replace(await getVersionPlaceHolder(), 'Unreleased')
    .replace('vnull', 'main')
const getVersionPlaceHolder = async (): Promise<string> => {
  const packageJson = JSON.parse(
    await readFile(join(getRepositoryRootDir(), 'package.json'), 'utf-8'),
  ) as { version: string }
  return packageJson.version
}

if (isMain(import.meta.url)) {
  //👇 Otherwise version field for unreleased changes CHANGELOG is empty
  process.chdir(getRepositoryRootDir())

  await writeFile(
    join(await getAndCreateGeneratedDataDir(), 'release.json'),
    objectToJson(await generateReleaseInfo()),
  )

  // 👇 37 handles open at this point😅 So Node.js doesn't exit
  // Mainly due to `conventional-changelog`'s monorepo libs
  // Maybe that's why `semantic-release` also hangs
  // Use `why-is-node-running` for more info. In the meantime, ...
  process.exit(0)
}
