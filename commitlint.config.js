module.exports = {
  extends: ['@commitlint/config-conventional'],
  // Let Dependabot write its commits, which are semantic, but too long
  ignores: [(commitMessage) => commitMessage.match(/^build\(deps(?:-dev)?\): bump/)]
}
