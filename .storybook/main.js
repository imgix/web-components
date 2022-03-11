const rollupStorybook = require('../rollup.storybook.js');

module.exports = {
  staticDirs: ['./public'],
  stories: [
    '../stories/**/*.stories.{ts,mdx}',
    '../docs/**/*.stories.{ts,mdx}',
  ],
  rollupConfig(config) {
    return rollupStorybook.getConfig(config);
  },
};
