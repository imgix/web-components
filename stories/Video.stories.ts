import {Meta, Story} from '@storybook/web-components';
import {Video, VideoProps} from './Video';
// More on default export: https://storybook.js.org/docs/web-components/writing-stories/introduction#default-export
export default {
  title: 'Example/Video',
  // More on argTypes: https://storybook.js.org/docs/web-components/api/argtypes
  argTypes: {
    videoSrc: {
      control: {type: 'text'},
      defaultValue:
        'https://assets.imgix.net/videos/girl-reading-book-in-library.mp4',
    },
  },
} as Meta;

// More on component templates: https://storybook.js.org/docs/web-components/writing-stories/introduction#using-args
const Template: Story<Partial<VideoProps>> = (args) => Video(args);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/web-components/writing-stories/args
Primary.args = {};
