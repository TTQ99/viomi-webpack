const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

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
    new CssMinimizerPlugin({
      test: /\.css$/i,
    }),
  ],
  optimization: {
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
