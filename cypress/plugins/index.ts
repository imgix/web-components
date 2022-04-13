import {startDevServer} from '@cypress/vite-dev-server';
import path from 'path';

export default (on, config) => {
  on('dev-server:start', (options) => {
    return startDevServer({
      options,
      viteConfig: {
        // eslint-disable-next-line
        configFile: path.resolve(__dirname, '..', '..', 'vite.config.ts'),
      },
    });
  });
};
