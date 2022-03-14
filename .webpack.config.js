const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

module.exports = {
  resolve: {
    fallback: {
      stream: require.resolve('stream-browserify'),
      zlib: require.resolve('browserify-zlib'),
    },
  },
  plugins: [
    new NodePolyfillPlugin(),
    new webpack.DefinePlugin({
      //<--key to reduce React's size
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
  mode: 'development',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
    ],
  },
  ignoreWarnings: [/Failed to parse source map/],
  devServer: {
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined')
      }

      devServer.app.get('/setup-middleware/some/path', (_, response) => {
        response.send('setup-middlewares option GET')
      })

      middlewares.push({
        name: 'hello-world-test-one',
        // `path` is optional
        path: '/foo/bar',
        middleware: (req, res) => {
          res.send('Foo Bar!')
        },
      })

      middlewares.push((req, res) => {
        res.send('Hello World!')
      })

      return middlewares
    },
  },
}

devServer.stat
