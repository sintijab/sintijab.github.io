import type { StoryObj, Meta } from '@storybook/react';

import type { IMarkdownEditor } from './types';
import React from 'react';

export const Dual: StoryObj<IMarkdownEditor> = {
  render: () => {
    return <></>;
  },

  parameters: {
    storyshots: { disable: true },
  },
};

export default {
  title: 'Storybook/Markdown Editor',
  args: {},
  parameters: {
    storyshots: { disable: true },
  },
} as Meta;
