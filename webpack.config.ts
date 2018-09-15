import ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
import HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
import HtmlWebpackPlugin = require('html-webpack-plugin');
import * as path from 'path';
import * as webpack from 'webpack';
import merge = require('webpack-merge');

const commonConfig: webpack.Configuration = {
  entry: {
    app: [path.join(__dirname, 'src/app/index.tsx')],
    vendor: ['react', 'react-dom', 'redux'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].bundle.js',
  },
  devtool: 'eval',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            babelrc: true,
          },
        },
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/app/index.html'),
    }),
  ],
};

const devConfig = merge(commonConfig, {
  mode: 'development',
  entry: {
    app: ['react-hot-loader/patch', 'webpack-hot-middleware/client'],
  },
  output: {
    pathinfo: false,
  },
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HardSourceWebpackPlugin(),
  ],
});

let config = commonConfig;
if (process.env.NODE_ENV === 'development') {
  config = devConfig;
}

export default config;
