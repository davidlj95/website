export const COVERAGE_WEBPACK_CONFIG = {
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['babel-plugin-istanbul'],
          },
        },
        enforce: 'post',
        exclude: [/cypress/],
      },
    ],
  },
}
