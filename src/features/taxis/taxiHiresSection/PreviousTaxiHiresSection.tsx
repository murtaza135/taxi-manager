import { useMemo, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFetchOnScroll } from '@/hooks/useFetchOnScroll';
import { List, ListItem } from '@/ui/List';
import { Avatar, AvatarImage, AvatarPersistentFallback } from '@/ui/Avatar';
import { extractInitials } from '@/utils/string/extractInitials';
import { useHires } from '@/features/hires/general/hooks/useHires';

export function PreviousTaxiHiresSection() {
  const params = useParams();
  const taxi_id = Number(params.id);

  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
  } = useHires({ taxi_id });

  const flatData = useMemo(
    () => data?.pages?.flatMap((page) => page.data) ?? [],
    [data],
  );

  const fetchedCount = flatData.length;
  const fetchableCount = data.pages[0].count;

  const { ref, fetchOnScroll } = useFetchOnScroll<React.ElementRef<typeof List>>({
    fetchNext: fetchNextPage,
    hasMore: fetchedCount < fetchableCount,
    fetchCondition: !isFetchingNextPage,
    scrollThreshold: 500,
  });

  useEffect(() => {
    void fetchOnScroll();
  }, [fetchOnScroll]);

  if (!fetchedCount) return <div>No previous hire agreements.</div>;

  return (
    <List ref={ref} onScroll={fetchOnScroll}>
      {flatData.map((hire) => (
        <Link key={hire.id} to={`/hire/${hire.id}`} className="hover:opacity-70 transition-opacity">
          <ListItem className="flex items-center gap-8">
            <div className="relative">
              <Avatar>
                {hire.taxi_picture_path && (
                  <AvatarImage
                    src={hire.taxi_picture_path}
                    alt={`taxi-${hire.taxi_id}`}
                  />
                )}
                <AvatarPersistentFallback className="translate-y-[0px]">
                  {extractInitials(hire.taxi_number_plate)}
                </AvatarPersistentFallback>
              </Avatar>
              <Avatar className="absolute top-0 left-2/3">
                {hire.driver_picture_path && (
                  <AvatarImage
                    src={hire.driver_picture_path}
                    alt={`driver-${hire.taxi_id}`}
                  />
                )}
                <AvatarPersistentFallback className="translate-y-[0px]">
                  {extractInitials(hire.driver_name)}
                </AvatarPersistentFallback>
              </Avatar>
            </div>

            <div>
              <p>Hire Agreement {hire.id}</p>
              <p className="capitalize translate-y-[1px] text-xs opacity-70">
                {hire.driver_name}
              </p>
            </div>
          </ListItem>
        </Link>
      ))}
    </List>
  );
}
