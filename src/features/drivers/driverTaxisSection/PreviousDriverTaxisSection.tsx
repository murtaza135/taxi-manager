import { useMemo, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import uniqBy from 'lodash/uniqBy';
import { useFetchOnScroll } from '@/hooks/useFetchOnScroll';
import { List, ListItem } from '@/ui/List';
import { Avatar, AvatarImage, AvatarPersistentFallback } from '@/ui/Avatar';
import { extractInitials } from '@/utils/string/extractInitials';
import { useHires } from '@/features/hires/general/hooks/useHires';

export function PreviousDriverTaxisSection() {
  const params = useParams();
  const driver_id = Number(params.id);

  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
  } = useHires({ driver_id });

  const flatData = useMemo(
    () => uniqBy(data?.pages?.flatMap((page) => page.data) ?? [], 'taxi_id'),
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

  if (!fetchedCount) return <div>No previous taxis.</div>;

  return (
    <List ref={ref} onScroll={fetchOnScroll}>
      {flatData.map((hire) => (
        <Link key={hire.id} to={`/taxi/${hire.taxi_id}`} className="hover:opacity-70 transition-opacity">
          <ListItem className="flex items-center gap-3">
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

            <p className="uppercase translate-y-[1px]">
              {hire.taxi_number_plate}{hire.taxi_licence_phc_number ? ` (${hire.taxi_licence_phc_number})` : ''}
            </p>
          </ListItem>
        </Link>
      ))}
    </List>
  );
}
