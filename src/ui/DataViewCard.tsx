import { Header, Row, RowData, flexRender } from '@tanstack/react-table';

type Props<TData extends RowData> = {
  headerRow: Header<TData, unknown>[];
  dataRow: Row<TData>;
};

export function DataViewCard<TData extends RowData>({ headerRow, dataRow }: Props<TData>) {
  // console.log(dataRow.getVisibleCells()[0].column);

  const optionsCell = dataRow.getVisibleCells().filter((cell) => cell.column.id === 'options')[0];

  return (
    <div className="h-full min-h-[27rem] rounded-lg overflow-hidden bg-achromatic-light dark:bg-achromatic-dark">
      <div className="h-28 mb-16 relative">
        <img src="/src/assets/images/sea.jpg" alt="sea" className="object-cover object-center h-full w-full opacity-100" />
        <img src="/src/assets/images/person.jpg" alt="person" className="h-32 w-32 object-cover object-center rounded-full absolute top-full left-1/2 -translate-x-16 -translate-y-16 border-0 border-achromatic-light dark:border-achromatic-dark" />
        <span className="absolute top-full right-0 -translate-x-2 translate-y-2">
          {flexRender(optionsCell.column.columnDef.cell, optionsCell.getContext())}
        </span>
      </div>

      <div className="px-6 pb-10 pt-4 space-y-6">
        <div className="text-center">
          <p className="text-2xl font-semibold">Jane Doe</p>
          <p className="text-achromatic-dark/50 dark:text-achromatic-light/50">AB20 1CD</p>
        </div>

        <div className="space-y-3">
          {dataRow.getVisibleCells()
            .filter((cell) => cell.column.id !== 'options')
            .map((cell, index) => (
              <div key={cell.id}>
                <div className="text-xs font-semibold text-achromatic-dark/50 dark:text-achromatic-light/50">
                  {flexRender(
                    headerRow[index].column.columnDef.header,
                    headerRow[index].getContext(),
                  )}
                </div>
                <div>{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
