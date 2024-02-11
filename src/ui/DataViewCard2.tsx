import { Header, Row, RowData, flexRender } from '@tanstack/react-table';

type Props<TData extends RowData> = {
  headerRow: Header<TData, unknown>[];
  dataRow: Row<TData>;
};

export function DataViewCard<TData extends RowData>({ headerRow, dataRow }: Props<TData>) {
  // console.log(dataRow.getVisibleCells()[0].column);

  const optionsCell = dataRow.getVisibleCells().filter((cell) => cell.column.id === 'options')[0];

  return (
    <div className="relative h-full min-h-[20rem] rounded-lg overflow-hidden bg-achromatic-light dark:bg-achromatic-dark">
      <img
        src="/src/assets/images/sea.jpg"
        alt="sea"
        className="w-full h-[13.5rem] object-cover object-center"
      />

      <div className="skew-x-[19deg] -skew-y-[9deg] dark:bg-achromatic-dark h-full w-[200%] absolute top-40 -right-24 rounded-[30px]" />

      <div className="relative -top-28 left-10 pr-10 flex flex-col xs:flex-row items-start gap-x-16">
        <div className="flex-shrink-0 flex flex-col items-center gap-4">
          <img src="/src/assets/images/person.jpg" alt="person" className="h-24 w-24 object-cover object-center rounded-full shadow-md shadow-scene-dark/70 border-achromatic-light dark:border-achromatic-dark" />

          <div className="text-center">
            <p className="text-2xl font-semibold">Jane Doe</p>
            <p className="text-achromatic-dark/50 dark:text-achromatic-light/50">AB20 1CD</p>
          </div>
        </div>

        <div className="w-full pr-4 space-y-3 translate-y-14 overflow-hidden">
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
                <div className="text-ellipsis overflow-hidden">{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>
              </div>
            ))}
          <div>
            <div className="text-xs font-semibold text-achromatic-dark/50 dark:text-achromatic-light/50">
              Name
            </div>
            <div className="text-ellipsis overflow-hidden">
              John Doe
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
