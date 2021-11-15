/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const AutoPrefixerPlugin = require('autoprefixer');
const CSSNanoPlugin = require('cssnano');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UnminifiedWebpackPlugin = require('unminified-webpack-plugin');

const { NODE_ENV = 'development' } = process.env;
const useProductionBuild = true; // NODE_ENV === 'production';

module.exports = {
  mode: useProductionBuild ? 'production' : 'development',
  devtool: useProductionBuild ? 'source-map' : 'cheap-module-eval-source-map',
  stats: 'errors-warnings',
  devServer: {
    compress: true,
    historyApiFallback: true,
    hot: true,
    port: 8765,
  },
  entry: {
    lib: path.resolve(__dirname, 'src/index.js'),
    demo: path.resolve(__dirname, 'demo/index.js'),
  },
  output: {
    chunkFilename: '[name].[contenthash].js',
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    pathinfo: false,
    libraryTarget: 'umd',
  },
  optimization: (!useProductionBuild
    ? {
      removeAvailableModules: false,
      removeEmptyChunks: false,
      splitChunks: false,
    }
    : {
      splitChunks: {
        cacheGroups: {
          peerDependencies: {
            test: /[\\/]node_modules[\\/]react(-dom)?[\\/]/,
          },
        },
      },
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            output: {
              comments: false,
            },
          },
        }),
      ],
    }
  ),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: filePath => /node_modules/.test(filePath),
        use: ['babel-loader'],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: {
                localIdentName: '[name]---[local]---[hash:base64:5]',
              },
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  AutoPrefixerPlugin,
                  CSSNanoPlugin,
                ],
              },
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),

    new UnminifiedWebpackPlugin(), // adds a non-minified file alongside the minified one

    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),

    new HtmlWebpackPlugin({
      template: './demo/index.template.html',
    }),
  ],
};
