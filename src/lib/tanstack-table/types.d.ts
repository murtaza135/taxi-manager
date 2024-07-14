declare module '@tanstack/table-core' {
  const layouts = ['table', 'grid'] as const;
  type LayoutState = typeof layouts[number];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> extends Record<string, unknown> {
    layout?: LayoutState;
    onLayoutChange?: (layout: LayoutState) => void;
    totalCount?: number;
  }
}

export { };