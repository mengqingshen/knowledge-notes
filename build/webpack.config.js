const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const WebpackBrowserPlugin = require('webpack-browser-plugin')
const extractForIframes = new ExtractTextPlugin('[name].css')

module.exports = {
  cache: true,
  context: path.resolve(__dirname, '../client'),
  entry: {
    'vendor': ['vue'],
    'main': './entry.js'
  },
  externals: {
    docute: 'docute'
  },
  output: {
    path: path.resolve(__dirname, '../public'),
    publicPath: '/',
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.vue$/,
        loader: 'eslint-loader',
        exclude: /(node_modules)/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: extractForIframes.extract({
              use: [
                'css-loader',
                'sass-loader'
              ],
              fallback: 'vue-style-loader'
            })
          }
        },
        exclude: /(node_modules)/
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'stage-0'],
              cacheDirectory: true
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.pug$/,
        use: 'pug-loader'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name].[ext]?[hash]'
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  devtool: 'cheap-module-source-map',
  plugins: [
    new CopyWebpackPlugin([
      {
        from: '../README.md',
        to: '../public/README.md'
      }
    ]),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      chunks: ['vendor', 'main'],
      hash: true
    }),
    new webpack.BannerPlugin('这里是打包文件头部注释！'),
    extractForIframes,
    new WebpackBrowserPlugin({
      browser: 'Chrome',
      port: 8082,
      url: 'http://localhost'
    })
  ],
  resolve: {
    // 指定可以被 import 的文件后缀
    extensions: ['.js', '.vue', '.json', '.sass', 'scss', '.pug', '.css'],
    alias: {
      'vue': 'vue/dist/vue.min.js'
    }
  }
}
