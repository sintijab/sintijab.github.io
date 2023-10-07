import type { IEditorButton } from '../types';
import { saveToFile } from './dev-utils';

export const SHOW_EDITOR = 'Code Editor';
export const HIDE_EDITOR = 'Visual Editor';
export const SAVE_BUTTON = 'Save';
import React from 'react';
export const MarkDownButtonGroup: React.FC<IEditorButton> = ({
  markdown,
  filePath,
  onEdit,
  editButtonText,
}) => {
  const isEditable = filePath && markdown;

  return (
    <div style={{ display: "flex", justifyContent: "flex-end", zIndex: "1" }}>
      <button onClick={onEdit} style={{ marginRight: "8px" }}>
        {editButtonText}
      </button>
      {isEditable && (
        <button
          onClick={() =>
            saveToFile({
              filePath,
              markdown,
            })
          }
        >
          {SAVE_BUTTON}
        </button>
      )}
    </div>
  );
};
