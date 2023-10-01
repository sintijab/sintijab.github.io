import type { Meta, StoryFn } from '@storybook/react';

import type { IMarkdownEditor } from './types';
import React from 'react';

export const Dual: StoryFn<IMarkdownEditor> = () => {
  return <></>;
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
Dual.parameters = {
  storyshots: { disable: true },
};

export default {
  title: 'Storybook/Markdown Editor',
  args: {},
  parameters: {
    storyshots: { disable: true },
  },
} as Meta;
