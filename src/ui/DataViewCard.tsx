import { Header, Row, RowData, flexRender } from '@tanstack/react-table';
import chunk from 'lodash/chunk';
import partition from 'lodash/partition';
import keyBy from 'lodash/keyBy';

type DataViewCardProps<TData extends RowData> = {
  headerRow: Header<TData, unknown>[];
  dataRow: Row<TData>;
};

export function DataViewCard<TData extends RowData>(
  { headerRow, dataRow }: DataViewCardProps<TData>,
) {
  const headers = keyBy(headerRow, (header) => header.id);
  const optionsCell = dataRow.getVisibleCells().filter((cell) => cell.column.id === 'options')[0];

  const [options, data] = partition(dataRow.getVisibleCells(), (cell) => cell.column.id === 'options');
  const gridData = chunk(data, 2);

  return (
    <div className="h-full min-h-[27rem] rounded-lg overflow-hidden bg-achromatic-light dark:bg-achromatic-dark">
      <div className="h-28 mb-16 relative">
        <img src="/src/assets/images/sea.jpg" alt="sea" className="object-cover object-center h-full w-full opacity-100" />
        <img src="/src/assets/images/person.jpg" alt="person" className="h-32 w-32 object-cover object-center rounded-full absolute top-full left-1/2 -translate-x-16 -translate-y-16 border-0 border-achromatic-light dark:border-achromatic-dark" />
        <span className="absolute top-full right-0 -translate-x-2 translate-y-2">
          {flexRender(optionsCell.column.columnDef.cell, optionsCell.getContext())}
        </span>
      </div>

      <div className="px-6 pb-8 pt-4 space-y-10">
        <div className="text-center">
          <p className="text-2xl font-semibold">Jane Doe</p>
          <p className="text-achromatic-dark/50 dark:text-achromatic-light/50">AB20 1CD</p>
        </div>

        <div className="space-y-4">
          {gridData
            .map((cell) => (
              <div key={cell[0].id} className="grid grid-cols-[repeat(auto-fit,minmax(9rem,1fr))] gap-x-10 gap-y-4 text-center">
                <div>
                  <div className="text-xs font-semibold text-achromatic-dark/50 dark:text-achromatic-light/50">
                    {flexRender(
                      headers[cell[0].column.id].column.columnDef.header,
                      headers[cell[0].column.id].getContext(),
                    )}
                  </div>
                  <div className="text-ellipsis overflow-hidden">
                    {flexRender(cell[0].column.columnDef.cell, cell[0].getContext())}
                  </div>
                </div>

                {cell[1] && (
                  <div>
                    <div className="text-xs font-semibold text-achromatic-dark/50 dark:text-achromatic-light/50">
                      {flexRender(
                        headers[cell[1].column.id].column.columnDef.header,
                        headers[cell[1].column.id].getContext(),
                      )}
                    </div>
                    <div className="text-ellipsis overflow-hidden">
                      {flexRender(cell[1].column.columnDef.cell, cell[1].getContext())}
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
