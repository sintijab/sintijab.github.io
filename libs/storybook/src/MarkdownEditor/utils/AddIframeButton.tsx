import 'remirror/styles/all.css';

import React, {
  ChangeEventHandler,
  FormEventHandler,
  MouseEventHandler,
  useCallback,
  useState,
} from 'react';
import { useCommands } from '@remirror/react';

export const AddIframeButton = () => {
  const {addIframe } = useCommands();
  const [href, setHref] = useState<string>('');

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setHref(e.target.value);
  }, []);

  const handleMouseDown: MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
    e.preventDefault();
  }, []);

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      addIframe({ src: href })
      // addYouTubeVideo({ video: href, showControls: true, enhancedPrivacy: true });
    },
    [addIframe, href],
  );
  return (
    <form onSubmit={handleSubmit} style={{ zIndex: 1}}>
      <input type='string' placeholder='Enter video id...' value={href} onChange={handleChange} required />
      <button type='submit' onMouseDown={handleMouseDown}>
        Add embed video
      </button>
    </form>
  );
};

