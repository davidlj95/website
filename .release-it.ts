import { Config } from 'release-it'
import { BumperRecommendation, Preset } from 'conventional-recommended-bump'

export const createReleaseItConfig = ({
  gitRawCommitsOpts,
}: ExtraConfig = {}): Config => ({
  git: {
    requireBranch: 'main',
    tag: true, // default, but for explicitness
    commit: false,
    push: true, // default, but for explicitness
  },
  // @ts-expect-error Invalid type definition. TODO: PR for this
  npm: false,
  github: {
    release: true,
    releaseName: 'v${version}',
    assets: ['dist/*.zip'],
    comments: {
      submit: true,
    },
  },
  hooks: {
    'before:release': 'pnpm run build:pack',
  },
  plugins: {
    '@release-it/conventional-changelog': {
      preset: {
        name: 'conventionalcommits',
        //👇 Type list:
        // https://github.com/conventional-changelog/conventional-changelog/blob/conventional-changelog-conventionalcommits-v8.0.0/packages/conventional-changelog-conventionalcommits/src/constants.js
        //👇 Emojis:
        // https://github.com/orhun/git-cliff/blob/v2.6.1/config/cliff.toml
        // https://gitmoji.dev/
        types: [
          {
            type: 'feat',
            section: '🚀 Features',
          },
          {
            type: 'fix',
            section: '🐛 Bug Fixes',
          },
          {
            type: 'perf',
            section: '⚡️ Performance Improvements',
          },
          {
            type: 'revert',
            section: '↩️ Reverts',
          },
          {
            type: 'docs',
            section: '📚 Documentation',
          },
          {
            type: 'style',
            section: '🎨 Style',
          },
          {
            type: 'chore',
            section: '💼 Miscellaneous Chores',
          },
          {
            type: 'refactor',
            section: '♻️ Code Refactoring',
          },
          {
            type: 'test',
            section: '🧪 Tests',
          },
          {
            type: 'build',
            section: '⚙️ Build System',
          },
          {
            type: 'ci',
            section: '👷 Continuous (Integration|Deployment)',
          },
        ],
      },
      whatBump,
      gitRawCommitsOpts,
    },
  },
})

/**
 * ⚠️ Conventional Changelog version bumpers always returns at least a patch release
 *
 * Therefore, `release-it/conventional-changelog` behaves the same, as it's just a wrapper over it
 * Here, the recommended version bumper is tuned so that not every commit triggers a version bump.
 *
 * See:
 *
 *  - GitHub issue about it:   https://github.com/release-it/conventional-changelog/issues/22
 *  - Original implementation: https://github.com/conventional-changelog/conventional-changelog/blob/conventional-recommended-bump-v10.0.0/packages/conventional-changelog-conventionalcommits/src/whatBump.js
 *
 * @param commits
 */
const whatBump: Preset['whatBump'] = async (commits) => {
  const commitsByLevel = commits.reduce(
    (results, commit) => {
      const addToResults = (key: number) => {
        results[key].push(commit)
        return results
      }
      // As notes are only parsed for breaking changes
      // https://github.com/conventional-changelog/conventional-changelog/blob/conventional-recommended-bump-v10.0.0/packages/conventional-changelog-conventionalcommits/src/parser.js
      const hasBreakingChanges = addBangNotes(commit).length > 0
      if (hasBreakingChanges) {
        return addToResults(RELEASE_LEVEL_MAJOR)
      }
      if (commit.type === 'feat' || commit.type === 'feature') {
        return addToResults(RELEASE_LEVEL_MINOR)
      }
      const isReleaseCommit = () =>
        commit.type === 'chore' &&
        commit.scope === 'release' &&
        commit.subject?.includes('manual')
      if (
        commit.type === 'fix' ||
        commit.type === 'perf' ||
        isReleaseCommit()
      ) {
        return addToResults(RELEASE_LEVEL_PATCH)
      }
      return results
    },
    [[], [], []] as [Commit[], Commit[], Commit[]],
  )
  const level = ifMinusOneToUndefined(
    commitsByLevel.findIndex((commits) => commits.length > 0),
  ) as BumperRecommendation['level']
  const reason =
    level === undefined
      ? 'No commit needs to be released according to bump rules'
      : 'These are the commits that triggered a release. The highest release level was chosen\n' +
        commitsByLevel
          .map(
            (commitHeaders, level) =>
              ` - ${RELEASE_LEVEL_NAMES[level]}: ${commitHeaders.map((header) => `"${header}"`).join(', ')}`,
          )
          .join('\n')
  return { level, reason }
}

export type ExtraConfig = Partial<{
  gitRawCommitsOpts: { from: string; to: string }
}>

// https://github.com/conventional-changelog/conventional-changelog/blob/conventional-changelog-conventionalcommits-v8.0.0/packages/conventional-changelog-conventionalcommits/src/utils.js
function addBangNotes(commit: Commit) {
  const breakingHeaderPattern = /^(\w*)(?:\((.*)\))?!: (.*)$/
  const match = commit.header?.match(breakingHeaderPattern)
  if (match && commit.notes.length === 0) {
    const noteText = match[3] // the description of the change.

    return [
      {
        title: 'BREAKING CHANGE',
        text: noteText,
      },
    ]
  }

  return commit.notes
}

// https://stackoverflow.com/a/52331580/3263250
type Unpacked<T> = T extends (infer U)[] ? U : T
type Commit = Unpacked<Parameters<Preset['whatBump']>[0]>

const ifMinusOneToUndefined = (n: number) => (n !== -1 ? n : undefined)

// https://github.com/conventional-changelog/conventional-changelog/blob/conventional-recommended-bump-v10.0.0/packages/conventional-recommended-bump/src/bumper.ts#L24-L28
const RELEASE_LEVEL_NAMES = ['major', 'minor', 'patch'] as const
const [RELEASE_LEVEL_MAJOR, RELEASE_LEVEL_MINOR, RELEASE_LEVEL_PATCH] = [
  ...RELEASE_LEVEL_NAMES.keys(),
]

export default createReleaseItConfig()
