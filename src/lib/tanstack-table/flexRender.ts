import { flexRender, Cell, Header, RowData } from '@tanstack/react-table';

export function flexRenderHeader<TData extends RowData, TValue>(
  header: Header<TData, TValue> | null | undefined,
) {
  if (header) {
    return flexRender(header.column.columnDef.header, header.getContext());
  }

  return null;
}

export function flexRenderCell<TData extends RowData, TValue>(
  cell: Cell<TData, TValue> | null | undefined,
) {
  if (cell) {
    return flexRender(cell.column.columnDef.cell, cell.getContext());
  }

  return null;
}
