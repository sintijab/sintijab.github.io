import { StoryContext } from '@storybook/react';
import { initMarkdown } from '../src/MarkdownEditor/utils/dev-utils';
import { DualEditor } from '../src/MarkdownEditor/MarkdownDual';
import React from "react";
import { Preview } from '@storybook/react';

const isDocsAvailable = ({ path }) => {
  try {
    // nosemgrep: eslint.detect-non-literal-require
    const docContent = require(`../src/${path}`);
    if (typeof docContent === 'string') {
      // Document loaded even with empty content
      return true;
    }
  } catch (e) {
    console.log(e);
    initMarkdown({ filePath: path});
    return true;
  }
}

const withEditor = (storyFn: Function, context: StoryContext) => {
  // Verify if the markdown files exist
  const storyPath = context.parameters.fileName.replace(/.*?src\/(.*?)/, '');
  const markdownDir = storyPath.substr(0, storyPath.lastIndexOf("\/"));
  const markdownFilePath = `${markdownDir}/markdown/${context.name}.md`;
  const markdownAvailable = isDocsAvailable({ path: markdownFilePath });
  return (
      <>
       {!!markdownAvailable && <DualEditor filePath={markdownFilePath} />}
       {storyFn()}
      </>
  );
};

const preview: Preview = {
  decorators: [withEditor],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    options: {
      panelPosition: 'right',
    },
    readme: {
      codeTheme: 'atom-dark',
    },
  }
};

export default preview;
