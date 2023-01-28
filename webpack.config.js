const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/* --------------------------------------------------- */

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'projects/async/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
    clean: true,
    assetModuleFilename: 'assets/[hash].[ext]',
  },
  module: {
    rules: [
      { test: /\.html$/i, loader: 'html-loader' },
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: { cacheDirectory: true },
      },
      {
        test: /\.woff2?$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name].[ext]',
        },
      },
      {
        test: /\.(jpe?g|png|webp|gif|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Async example ',
      template: path.resolve(__dirname, 'layout.ejs'),
    }),
    new HtmlWebpackPartialsPlugin({
      path: path.join(__dirname, './projects/async/towns.html'),
      location: 'body',
      template_filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],
};
