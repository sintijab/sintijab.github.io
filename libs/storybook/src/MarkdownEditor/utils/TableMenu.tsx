import { useCommands } from '@remirror/react';

export const SHOW_EDITOR = 'Code Editor';
export const HIDE_EDITOR = 'Visual Editor';
export const SAVE_BUTTON = 'Save';

export const TableMenu: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { createTable, ...commands } = useCommands();
  return (
    <div>
      <p
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyItems: 'flex-start',
          alignItems: 'flex-start',
        }}
      >
        <button
          onClick={() => {
            createTable({
              rowsCount: 2,
              columnsCount: 2,
              withHeaderRow: true,
            });
          }}
        >
          insert a table
        </button>
        <button onClick={() => commands.addTableColumnAfter()}>
          add a column after
        </button>
        <button onClick={() => commands.addTableRowAfter()}>
          add a row after
        </button>
        <button onClick={() => commands.deleteTableRow()}>
          delete a selected row
        </button>
        <button onClick={() => commands.deleteTableColumn()}>
          delete a selected column
        </button>
        <button onClick={() => commands.deleteTable()}>
          delete the table
        </button>
      </p>
    </div>
  );
};
