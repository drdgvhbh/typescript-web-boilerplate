import * as path from 'path';
const HtmlWebpackPlugin = require('html-webpack-plugin');
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';
const merge = require('webpack-merge');
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

const commonConfig = {
  entry: {
    app: path.join(__dirname, 'src/app/App.tsx'),
    vendor: ['react', 'react-dom'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
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
  devServer: {
    historyApiFallback: true,
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
  devServer: {
    historyApiFallback: true,
    proxy: {
      'api/': {
        target: 'http://localhost:3000',
      },
    },
  },
  output: {
    pathinfo: false,
  },
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
  plugins: [new HardSourceWebpackPlugin()],
});

const prodConfig = merge(commonConfig, {
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
});

let config = devConfig;
if (process.env.NODE_ENV === 'production') {
  config = prodConfig;
}

export default config;
