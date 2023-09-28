module.exports = {
  ci: {
    upload: {
      target: 'temporary-public-storage',
      url: ['http://localhost/'],
    },
    collect: {
      staticDistDir: process.env.CI
        ? 'browser'
        : 'dist/@davidlj95/website/browser',
    },
    assert: {
      preset: 'lighthouse:no-pwa',
      assertions: {
        'bf-cache': 'warn',
        'csp-xss': 'warn',
        'unused-javascript': 'warn',
        'uses-responsive-images': 'warn',
      },
    },
  },
}
