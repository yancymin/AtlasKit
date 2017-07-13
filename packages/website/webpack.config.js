const { resolve } = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  context: resolve(__dirname, 'src'),

  entry: './index',

  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/',
  },

  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    mainFields: ['ak:webpack:raw', 'browser', 'module', 'main'],
  },

  devtool: 'cheap-source-map',

  devServer: {
    contentBase: resolve(__dirname, 'dist'),
    historyApiFallback: true,
    overlay: true,
    port: 8080,
    publicPath: '/',
    stats: {
      assets: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: true,
    },
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(le|c)ss$/,
        exclude: /prismjs/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
          options: {
            camelCase: true,
            importLoaders: 1,
            mergeRules: false,
            modules: true,
          },
        }, {
          loader: 'less-loader',
        }],
      },
      {
        test: /\.css$/,
        include: /prismjs/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }],
      },
      {
        test: /\.(gif|jpe?g|png|ico)$/,
        loader: 'url-loader?limit=10000',
      },
      {
        test: /\.svg/,
        use: {
          loader: 'svg-url-loader',
          options: {
            limit: 512,
          },
        },
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    new HTMLWebpackPlugin({
      template: resolve(__dirname, 'src', 'index.html.ejs'),
    }),
    new CopyWebpackPlugin([
      { from: resolve(__dirname, 'public') },
    ]),
  ],

};
