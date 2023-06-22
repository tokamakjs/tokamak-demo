import path from 'path';

import dotenv from 'dotenv';
import HtmlPlugin from 'html-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { Configuration, DefinePlugin, EnvironmentPlugin } from 'webpack';

dotenv.config();

const config: Configuration = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: {
    app: './src/index.ts',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    plugins: [new TsconfigPathsPlugin()],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
  },
  optimization: {
    moduleIds: 'named',
    emitOnErrors: false,
  },
  plugins: [
    new EnvironmentPlugin('NODE_ENV', 'APP_ENV', 'API_HOST', 'API_PREFIX'),
    new DefinePlugin({
      __REACT_DEVTOOLS_GLOBAL_HOOK__: '({ isDisabled: true })',
    }),
    new HtmlPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, './src/index.html'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              env: {
                development: {
                  // plugins: [require.resolve('react-refresh/babel')],
                },
              },
            },
          },
          {
            loader: 'ts-loader',
            options: {
              onlyCompileBundledFiles: true,
              context: process.cwd(),
              compilerOptions: {
                declaration: false,
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        type: 'asset/resource',
        generator: {
          filename: './css/[hash][ext][query]',
        },
      },
      {
        test: /\.ttf$/,
        type: 'asset/resource',
        generator: {
          filename: './fonts/[hash][ext][query]',
        },
      },
    ],
  },
};

export default config;
