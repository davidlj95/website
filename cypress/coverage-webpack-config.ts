// Needs to be a default export as if it was used directly by `webpack`
// in order to be picked up by `knip`'s homonym plugin
export default {
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
