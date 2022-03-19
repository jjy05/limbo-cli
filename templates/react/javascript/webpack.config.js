const path = require('path');

const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const basePath = path.resolve(__dirname, 'src');

const smp = new SpeedMeasurePlugin();

module.exports = smp.wrap({
  context: basePath,
  mode: process.env.NODE_ENV,
  entry: {
    main: ['./index.js'],
  },
  output: {
    filename: 'bundle-[hash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
    ],
    // splitChunks: {
    //   chunks: 'all',
    //   cacheGroups: {
    //     vendor: {
    //       name: 'vendor',
    //       priority: 1,
    //       test: /node_modules/,
    //       minSize: 50,
    //       minChunks: 1
    //     },
    //     common: {
    //       name: 'common',
    //       priority: 0,
    //       minSize: 0,
    //       minChunks: 2,
    //     }
    //   }
    // }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      title: 'Toy',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          // 'thread-loader',
          // 'cache-loader',
          'babel-loader'
        ],
        include: basePath,
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: "postcss.config.js"
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg|ttf|woff|woff2)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  devServer: {
    // quiet: true,
    host: 'localhost',
    // disableHostCheck: true,
    historyApiFallback: true,
    // public: 'localhost:8080',
    port: 8080,
  },
});
