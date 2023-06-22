import 'webpack-dev-server';

import webpackConfig from './webpack.config';

// import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

// webpackConfig.plugins?.push(new ReactRefreshWebpackPlugin());

webpackConfig.devServer = {
  host: '0.0.0.0',
  port: 4000,
  historyApiFallback: true,
  hot: true,
  client: {
    progress: true,
    logging: 'none',
    overlay: false,
  },
  devMiddleware: {
    writeToDisk: true,
  },
};

export default webpackConfig;
