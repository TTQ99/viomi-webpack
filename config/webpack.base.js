const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MimiCssExtractPlugin = require('mini-css-extract-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');



module.exports = {
  entry: '../src/main.js',
  output: {
    path: path.resolve('dist'),
    filename: 'static/js/[name]_[hash:8].js'
  },
  devtool: 'cheap-module-eval-source-map',
  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname, "/src")
    ],
    extensions: ['.js', '.vue', '*'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, '../', 'src')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          MimiCssExtractPlugin.loader,
          'css-loader',
        ],

      },
      {
        test: /\.scss$/,
        use: [
          MimiCssExtractPlugin.loader,
          // 'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /.less$/,
        use: [
          MimiCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /.(svg|woff|ttf|eot)$/,
        loader: 'url-loader',
        options: {
          name: 'static/font/[name].[ext]',
        },
      },
      {
        test: /.(jpg|jpeg|png)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            name: 'static/img/[name].[ext]',
            limit: 8192,
            esModule: false
          }
        }]
      },

    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new Webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: '../index.html'
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../static'),
          to: path.resolve(__dirname, './dist/static'),
        }
      ]
    }),
    new MimiCssExtractPlugin({
      filename: 'static/css/[name].css',
      ignoreOrder: true
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  }
}
