import { useMemo, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import uniqBy from 'lodash/uniqBy';
import { useFetchOnScroll } from '@/hooks/useFetchOnScroll';
import { List, ListItem } from '@/ui/List';
import { Avatar, AvatarImage, AvatarPersistentFallback } from '@/ui/Avatar';
import { extractInitials } from '@/utils/string/extractInitials';
import { useHires } from '@/features/hires/general/hooks/useHires';
import { useTaxiDetails } from '@/features/taxis/general/hooks/useTaxiDetails';

export function PreviousTaxiDriversSection() {
  const params = useParams();
  const taxi_id = Number(params.id);
  const { data: taxi } = useTaxiDetails(taxi_id);
  const { driver_id } = taxi;

  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
  } = useHires({ taxi_id });

  const unfilteredFlatData = useMemo(
    () => data?.pages?.flatMap((page) => page.data) ?? [],
    [data],
  );

  // this removes driver that is currently linked to this taxi
  const unfilteredFlatData2 = useMemo(
    () => unfilteredFlatData.filter((hire) => hire.driver_id !== driver_id),
    [unfilteredFlatData, driver_id],
  );

  const flatData = useMemo(
    () => uniqBy(unfilteredFlatData2, 'driver_id'),
    [unfilteredFlatData2],
  );

  const fetchedCount = unfilteredFlatData.length;
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

  if (flatData.length <= 0) return <div>No previous drivers.</div>;

  return (
    <List ref={ref} onScroll={fetchOnScroll}>
      {flatData.map((hire) => (
        <Link key={hire.id} to={`/driver/${hire.driver_id}`} className="hover:opacity-70 transition-opacity">
          <ListItem className="flex items-center gap-3">
            <Avatar>
              {hire.driver_picture_path && (
                <AvatarImage
                  src={hire.driver_picture_path}
                  alt={`driver-${hire.driver_id}`}
                />
              )}
              <AvatarPersistentFallback className="translate-y-[0px]">
                {extractInitials(hire.driver_name)}
              </AvatarPersistentFallback>
            </Avatar>

            <p className="capitalize translate-y-[1px]">
              {hire.driver_name}
            </p>
          </ListItem>
        </Link>
      ))}
    </List>
  );
}
