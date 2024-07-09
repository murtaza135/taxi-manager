import { useContext, createContext, ReactNode } from 'react';
import { Table as ReactTableType, RowData as ReactTableRowData } from '@tanstack/react-table';

const ReactTableContext = createContext<ReactTableType<ReactTableRowData>>(
  null as unknown as ReactTableType<ReactTableRowData>,
);

export function useReactTableContext<TData extends ReactTableRowData = ReactTableRowData>() {
  const context = useContext<ReactTableType<TData>>(
    ReactTableContext as unknown as React.Context<ReactTableType<TData>>,
  );

  if (!context) {
    throw new Error('useReactTableContext must be used within <ReactTable />');
  }

  return context;
}

type ReactTableProps<TData extends ReactTableRowData = ReactTableRowData> = {
  table: ReactTableType<TData>;
  children: ReactNode;
};

export function ReactTable<TData extends ReactTableRowData = ReactTableRowData>(
  { table, children }: ReactTableProps<TData>,
) {
  return (
    <ReactTableContext.Provider value={table as ReactTableType<ReactTableRowData>}>
      {children}
    </ReactTableContext.Provider>
  );
}
