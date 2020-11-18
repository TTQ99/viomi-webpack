const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const path = require('path')
const Webpack = require('webpack')
module.exports = merge(
  baseConfig,
  {
    mode: 'development',
    plugins: [
      new Webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"development"',
          ENV_CONFIG: `"${process.env.env_config}"`,
        },
      }),
    ],
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      hot: true,
      port: 8081,
      open: true,
      stats: 'errors-only',
    }
  }
)