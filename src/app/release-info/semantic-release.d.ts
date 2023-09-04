import { Commit, LastRelease, NextRelease, Release, Result } from 'semantic-release';

export type ReleaseInfo = PatchedResultObject & { fake?: true, preview?: true }

type ResultObject = Exclude<Result, false>
// Turns out the generated JSON contains different things from what was promised
// Manually patching here from the generated file until compiler is happy
// The release.json was generated with a fake release
type PatchedResultObject = Omit<ResultObject, 'lastRelease' | 'commits' | 'nextRelease' | 'releases'> & {
  lastRelease: PatchedLastRelease,
  commits: PatchedCommit[],
  nextRelease: PatchedNextRelease,
  releases: PatchedRelease[],
}
type PatchedLastRelease = Omit<LastRelease, 'channels'> & { channels: LastRelease['channels'] | null[] }
type PatchedCommit = Omit<Commit, 'author' | 'committer'> & {
  author: PatchedCommitAuthor,
  committer: PatchedCommitCommitter
}
type PatchedCommitAuthor = Omit<Commit['author'], 'short'> & { date: string }
type PatchedCommitCommitter = Omit<Commit['committer'], 'short'> & { date: string }
type PatchedNextRelease = Omit<NextRelease, 'channel'> & { channel: NextRelease['channel'] | null }
type PatchedRelease = Omit<Release, 'pluginName'> & { pluginName?: Release['pluginName'] }
