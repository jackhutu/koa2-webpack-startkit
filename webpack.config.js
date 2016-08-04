const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin")
const JadeInjectPlugin = require('jade-inject-webpack-plugin')
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin')

const env = process.env.NODE_ENV || 'development'
const debug = env !== 'production'
const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true'

var getEntry = function (pathName) {
  var entry = {}
  glob.sync(pathName).forEach(function (name) {
    const filename = path.basename(name,'.js')
    const files = [name]
    if(debug){
      files.push(hotMiddlewareScript)
    }
    entry[filename] = files
  })
  return entry
}

var config = {
  devtool: debug?'eval-source-map':'source-map',
  name: 'client-src',
  debug: debug,
  context: __dirname,
  entry: getEntry('./client-src/js/page/**/*.js'),
  output: {
    path: path.join(__dirname, './client'),
    filename: './js/[hash:8].[name].js',
    chunkFilename: "./js/[id].chunk.js",
    publicPath: '/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify(env)
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new CommonsChunkPlugin({
      name: 'commons',
      chunks: ["index", "about"]
    }),
    new ExtractTextPlugin('styles/[hash:8].[name].css', { allChunks: true }),
    new JadeInjectPlugin({
      indent:['spaces',2], //默认空格2, 其它选项: ['tab',1]
      entry:{
        './views/entry/index.jade':{
          'js':['commons.js','index.js'],
          'css':['index.css'],
          'output':'./views' //默认同Key
        },
        './views/entry/about.jade':{
          'js':['commons.js','about.js'],
          'css':['about.css'],
          'output':'./views'
        }
      }
    })
  ],
  module: {
    preLoaders: [
      { test: /\.js$/, loader: "eslint-loader", exclude: /node_modules/ }
    ],
    loaders: [{
      test: /\.js$|\.jsx$/,
      loader: 'babel',
      include: path.join(__dirname, 'client-src'),
      exclude: /node_modules/
    }, 
    { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap' ) },
    {
      test: /\.(jpe?g|png|gif)$/i,
      loaders: [
        'url?limit=10000&name=images/[name].[ext]',
        'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
      ]
    },{
      test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url?limit=10000&name=fonts/[hash:8].[name].[ext]'
    }]
  },
  eslint: {
    configFile: './.eslintrc.json'
  },
  resolve: {
    extensions: ['','.js','.scss','.css']
  }
}

if(!debug){
  config.plugins.push(new UglifyJsPlugin({
    compress: { warnings: false }
  }))
}
module.exports = config