import { BetterProgressPlugin } from '@tokamakjs/dev-utils';

import webpackConfig from './webpack.config';

webpackConfig.mode = 'production';
webpackConfig.devtool = 'source-map';

webpackConfig.plugins = [
  ...(webpackConfig?.plugins ?? []),
  new BetterProgressPlugin({ mode: 'detailed' }),
];

export default webpackConfig;
