const path = require('path');

const config = {
  framework: {
    name: '@storybook/react-vite',
  },
  
  core: {
    builder: "@storybook/builder-webpack5",
  },
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  babel: async () => {
    return {
      presets: [
        '@babel/preset-react',
        "@babel/preset-env",
        "@babel/preset-typescript"
      ],
    };
  },
  docs: {
    autodocs: 'tag',
  },
  // staticDirs: ['../public']
};

export default config;