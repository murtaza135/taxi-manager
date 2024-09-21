import { useMemo, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFetchOnScroll } from '@/hooks/useFetchOnScroll';
import { List, ListItem } from '@/ui/List';
import { Avatar, AvatarImage, AvatarPersistentFallback } from '@/ui/Avatar';
import { extractInitials } from '@/utils/string/extractInitials';
import { useHires } from '@/features/hires/general/hooks/useHires';
import { useDriverDetails } from '@/features/drivers/general/hooks/useDriverDetails';

export function PreviousDriverHiresSection() {
  const params = useParams();
  const driver_id = Number(params.id);
  const { data: driver } = useDriverDetails(driver_id);
  const { hire_agreement_id } = driver;

  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
  } = useHires({ driver_id });

  const unfilteredFlatData = useMemo(
    () => data?.pages?.flatMap((page) => page.data) ?? [],
    [data],
  );

  // this removes hire that is currently linked to this taxi
  const flatData = useMemo(
    () => unfilteredFlatData.filter((hire) => hire.id !== hire_agreement_id),
    [unfilteredFlatData, hire_agreement_id],
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

  if (flatData.length <= 0) return <div>No previous hire agreements.</div>;

  return (
    <List ref={ref} onScroll={fetchOnScroll}>
      {flatData.map((hire) => (
        <Link key={hire.id} to={`/hire/${hire.id}`} className="hover:opacity-70 transition-opacity">
          <ListItem className="flex items-center gap-8">
            <div className="relative">
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
              <Avatar className="absolute top-0 left-2/3">
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
            </div>

            <div>
              <p>Hire Agreement {hire.id}</p>
              <p className="uppercase translate-y-[1px] text-xs opacity-70">
                {hire.taxi_number_plate}{hire.taxi_licence_phc_number ? ` (${hire.taxi_licence_phc_number})` : ''}
              </p>
            </div>
          </ListItem>
        </Link>
      ))}
    </List>
  );
}
