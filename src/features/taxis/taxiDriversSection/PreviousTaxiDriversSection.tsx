import { useMemo, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import uniqBy from 'lodash/uniqBy';
import { useFetchOnScroll } from '@/hooks/useFetchOnScroll';
import { List, ListItem } from '@/ui/List';
import { Avatar, AvatarImage, AvatarPersistentFallback } from '@/ui/Avatar';
import { extractInitials } from '@/utils/string/extractInitials';
import { useHires } from '@/features/hires/general/hooks/useHires';

export function PreviousTaxiDriversSection() {
  const params = useParams();
  const driver_id = Number(params.id);

  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
  } = useHires({ driver_id });

  const flatData = useMemo(
    () => uniqBy(data?.pages?.flatMap((page) => page.data) ?? [], 'driver_id'),
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

  if (!fetchedCount) return <div>No previous drivers.</div>;

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
