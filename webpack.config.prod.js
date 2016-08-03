const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin')
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin')
const JadeInjectPlugin = require('jade-inject-webpack-plugin')

const env = process.env.NODE_ENV || 'production'
var clientConfig = require('./webpack.config.dev')
clientConfig.plugins.push(new UglifyJsPlugin({
  compress: { warnings: false }
}))

module.exports = [
  clientConfig
  , {
    name: "server-src",
    context: __dirname,
    target: "node",
    entry: {
      app: ['babel-polyfill','./server-src/app']
    },
    output: {
      path: path.join(__dirname, './server'),
      filename: "[name].js",
      publicPath: "/",
      libraryTarget: "commonjs2"
    },
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.DefinePlugin({
        'process.env':{
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.IgnorePlugin(/vertx/),
    ],
    module: {
      preLoaders: [
        { test: /\.js$|\.jsx$/, loader: "eslint-loader", exclude: /node_modules/ }
      ],
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel',
          exclude: /node_modules/,
        }
      ]
    },
    eslint: {
      configFile: './.eslintrc.json'
    },
    resolve: {
      extensions: ['', '.js'],
      modulesDirectories: [
        "server-src", "node_modules"
      ]
    },
    //externals: nodeModules
  }
]