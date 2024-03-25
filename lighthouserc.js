module.exports = {
  ci: {
    upload: {
      target: 'temporary-public-storage',
      url: ['http://localhost/'],
    },
    collect: {
      staticDistDir: process.env.CI ? '.' : 'dist/@davidlj95/website/browser',
    },
    assert: {
      preset: 'lighthouse:no-pwa',
      assertions: {
        // Angular omits them when bundle size >500kb
        'valid-source-maps': 'warn',
        'bf-cache': 'warn',
        'csp-xss': 'warn',
        'unused-javascript': 'warn',
        'uses-responsive-images': 'warn',
      },
    },
  },
}
