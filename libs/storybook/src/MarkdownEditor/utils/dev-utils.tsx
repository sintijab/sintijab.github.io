import type { IMarkdownInit, ISaveButtonGroup } from '../types';

export const saveToFile = async ({
  filePath,
  markdown,
}: ISaveButtonGroup): Promise<Response | void | undefined> => {
  try {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        path: filePath,
        data: markdown,
      }),
    };
    return await fetch(`${window.location.origin}/api/docs`, requestOptions)
      .then(() =>
        console.log('done')
      )
      .catch((err) => {
        throw new Error(err as string);
      });
  } catch (e) {
    console.log(e);
  }
};

export const initMarkdown = async ({
  filePath,
}: IMarkdownInit): Promise<Response | void | undefined> => {
  try {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        path: filePath,
      }),
    };
    return await fetch(`${window.location.origin}/api/lookup`, requestOptions)
      .then((res) => {
        if (res.ok) {
          console.log('done')
        }
      })
      .catch((err) => {
        throw new Error(err as string);
      });
  } catch (e) {
    console.log(e);
  }
};
