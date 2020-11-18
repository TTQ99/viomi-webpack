const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const Webpack = require('webpack')
module.exports = merge(baseConfig, {
  mode: 'production',
  plugins: [
    new Webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
        ENV_CONFIG: `"${process.env.env_config}"`,
      },
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      // new UglifyJsPlugin({
      //   test: /\.js$/i,
      // })
    ],
    splitChunks: {
      chunks: 'async',
      minSize: 0,
      cacheGroups: {
        commons: {
          name: 'vendors',
          chunks: 'all',
          minChunks: 2,
        },
      },
    }
  }
})
