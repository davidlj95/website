// Getting hipster here 😎 Importing JSONs and type assertions are experimental
import * as fs from 'fs';
import path from 'path';
import semanticRelease, { AnalyzeCommitsContext, Options, PluginSpec, ReleaseType, Result } from 'semantic-release';
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


async function runSemanticRelease(options: Options): Promise<Result> {
  return semanticRelease(options);
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

async function runSemanticReleaseThatReturnsAFakeRelease(options: Options): Promise<FakeResultObject> {
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
