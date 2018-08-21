const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {

  mode:"development",// 开发模式
  entry: {
    vendor: ["echarts"],
    home:["webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true", path.join(__dirname, '../src/index.js')],
  },
  // where to place the compiled bundle
  output: {
    path: path.join(__dirname, '../static/'),
    publicPath: '/static/',
    filename: 'js/[name].bundle.js',
    chunkFilename: 'js/[chunkhash:8].js',
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "css/common.css"}),
    new HtmlWebpackPlugin(
      {
        title: '智慧课堂可视化',
        template: path.join(__dirname, '../src/index.html'),
        filename: '../static/index.html',
        inject: true,
        chunks: ['home','vendor']
      }
    ),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('development'),
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [ "stage-0","es2015"],
            plugins: ['transform-runtime']
          }
        }]
      },
      { test: /\.json$/, loader: 'json-loader' },
      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: /src\/index.html/
      },
      { test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
      ] },
      { test: /\.(jpg|png)$/, loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]' },
      { test: /\.woff$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot$/, loader: 'file-loader' },
      { test: /\.svg$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' },
    ],
  },

  resolve: {
    alias: {
      vue$: path.resolve(__dirname, '../node_modules/vue/dist/vue.esm.js'),
    },
    modules: [
      path.resolve(__dirname, '../node_modules'),
    ],
    extensions: ['.vue', '.ts', '.js'],
  },
  resolveLoader: {
    modules: [path.resolve(__dirname, '../node_modules')],
    extensions: ['.js', '.json'],
    mainFields: ['loader', 'main'],
  },
  optimization : {
      splitChunks: {
      chunks: "async",
      minSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        commons: {
          chunks: 'initial',// 必须三选一： "initial" | "all"(默认就是all) | "async"
          minChunks: 2,// 最小 chunk ，默认1
          maxInitialRequests: 5,// 最大初始化请求书，默认1
          minSize: 0 // 最小尺寸，默认0
        },
        vendor: {// key 为entry中定义的 入口名称
          test: /node_modules/,// 正则规则验证，如果符合就提取 chunk
          chunks: 'initial',
          name: 'vendor',// 要缓存的 分隔出来的 chunk 名称
          filename: 'js/[name].bundle.js',
          priority: 10,// 缓存组优先级
          enforce: true
        }
      }
    },
    runtimeChunk: false
  }
};
