import { DataGridCard } from '@/features/tempTable/DataGridCard';

export function DataGrid() {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-4">
      <DataGridCard />
      <DataGridCard />
      <DataGridCard />
    </div>
  );
}
