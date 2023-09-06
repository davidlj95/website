// Getting hipster here 😎 Importing JSONs and type assertions are experimental
import { execaSync } from "execa";
import * as fs from 'fs';
import path from 'path';
import semanticRelease, {
  AnalyzeCommitsContext,
  BranchObject,
  Options,
  PluginSpec,
  ReleaseType,
  Result,
} from 'semantic-release';
// But we get type safety given Typescript reads the JSON
// We can always go back to an old boring read file sync if experiment goes wrong :P
import realReleaseOptions from '../../.releaserc.json' assert { type: 'json' }
import { getRepositoryRootDir, isMain, Log } from './utils.mjs';

async function generateReleaseFile() {
  Log.info('Patching options')
  Log.item('Dry run: forced to true')
  Log.item('Excluded plugins: %s', EXCLUDED_PLUGINS)
  const options = getDryRunOptionsWithUnneededPlugins(realReleaseOptions);
  console.log(options)

  let result: Result | FakeResultObject;
  Log.info('Running semantic release')
  result = await runSemanticRelease(options);

  if (!result) {
    Log.warn('No release expected. Faking one')
    result = await runSemanticReleaseThatReturnsAFakeRelease(options)
  }

  Log.info('Final release info')
  console.log(result)

  Log.info('Writing to file \'%s\'', RELEASE_FILE)
  fs.writeFileSync(RELEASE_FILE, JSON.stringify(result, undefined, 2))

  Log.ok('Done')
}

function getDryRunOptionsWithUnneededPlugins(options: Options): Options {
  const plugins = options.plugins ?? [];
  return {
    ...options,
    dryRun: true,
    plugins: plugins.filter((pluginSpec) => {
      if (typeof pluginSpec === 'string' || pluginSpec instanceof String) {
        return !EXCLUDED_PLUGINS.includes(pluginSpec as string);
      }
      if (Array.isArray(pluginSpec)) {
        const [name] = pluginSpec;
        return !EXCLUDED_PLUGINS.includes(name as string);
      }
      return true;
    }),
  }
}

const EXCLUDED_PLUGINS = [
  '@semantic-release/github',
  '@semantic-release/npm',
]

async function runSemanticRelease(options: Options): Promise<Result | PreviewResultObject> {
  const currentBranch = await getCurrentBranch()
  const env = {} as any;
  const mainBranch = getMainBranch(options);
  if (currentBranch != mainBranch) {
    Log.info('Faking we are on main branch to generate a release')
    env['env'] = {
      'GITHUB_ACTIONS': true,
      'GITHUB_REF': mainBranch,
    }
  }
  const result = await semanticRelease(options, env);
  if (result) {
    return {
      preview: true,
      ...result,
    }
  }
  return result;
}

type PreviewResultObject = ResultObject & { preview: true }

// Same way as semantic release via `env-ci`
// https://github.com/semantic-release/env-ci/blob/v9.1.1/lib/git.js#L11-L34
// Use built-in Node.js child process though
async function getCurrentBranch() {
  try {
    const headRef = execaSync(
      "git",
      ["rev-parse", "--abbrev-ref", "HEAD"],
    ).stdout;

    if (headRef === "HEAD") {
      const branch = execaSync(
        "git",
        ["show", "-s", "--pretty=%d", "HEAD"],
      )
        .stdout.replace(/^\(|\)$/g, "")
        .split(", ")
        .find((branch) => branch.startsWith("origin/"));
      return branch ? branch.match(/^origin\/(?<branch>.+)/)![1] : undefined;
    }

    return headRef;
  } catch {
    return undefined;
  }
}

function getMainBranch(options: Options): string {
  if (typeof options.branches === 'string') {
    return options.branches;
  }
  if (Array.isArray(options.branches)) {
    const COMMON_MAINS = ['main', 'master'];
    const candidates: string[] = options.branches.map((branch) => {
      if (typeof branch === 'string' && COMMON_MAINS.includes(branch)) {
        return branch;
      }
      if (typeof branch == 'object' && !Array.isArray(branch) && branch !== null) {
        const branchObj = branch as BranchObject;
        if ((branchObj.channel === false || !branchObj.channel) && !branchObj.prerelease && !branchObj.range) {
          return branchObj.name
        }
      }
      return ''
    }).filter((branch) => branch.length > 0);
    for (const candidate of candidates) {
      if (COMMON_MAINS.includes(candidate)) {
        return candidate;
      }
    }
  }
  if (typeof options.branches === 'object' && options.branches !== null) {
    return (options.branches as BranchObject).name;
  }
  // Good ol' default
  return 'master';
}

async function runSemanticReleaseThatReturnsAFakeRelease(options: Options): Promise<FakeResultObject | PreviewResultObject> {
  const alwaysReleasePatchedOptions = {
    ...options,
    plugins: [
      ...options.plugins ?? [],
      // PluginSpec doesn't contemplate inline plugins, so casting here
      generateFakeAnalyzeCommitsThatJustTriggersARelease('patch') as unknown as PluginSpec,
    ],
  }
  const result = await runSemanticRelease(alwaysReleasePatchedOptions) as ResultObject
  return {
    fake: true,
    ...result,
  }
}

function generateFakeAnalyzeCommitsThatJustTriggersARelease(releaseType: AnalyzeCommitsReleaseType): AnalyzeCommitsPlugin {
  return {analyzeCommits: async (_pluginContext, _context) => releaseType};
}

// https://github.com/semantic-release/commit-analyzer/blob/v10.0.4/index.js#L28
type AnalyzeCommitsPlugin = {
  analyzeCommits: (pluginConfig: unknown, context: AnalyzeCommitsContext) => Promise<ReleaseType>,
}
// https://github.com/semantic-release/semantic-release/blob/v21.1.1/lib/definitions/plugins.js#L19
// https://github.com/semantic-release/semantic-release/blob/v21.1.1/lib/definitions/constants.js
type AnalyzeCommitsReleaseType = Extract<ReleaseType, 'major' | 'minor' | 'patch'>

type ResultObject = Exclude<Result, false>
type FakeResultObject = ResultObject & { fake: true }

const RELEASE_FILE = path.join(getRepositoryRootDir(), 'release.json')

if (isMain(import.meta.url)) {
  await generateReleaseFile()
}
