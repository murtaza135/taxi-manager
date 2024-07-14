import { useEffect, useCallback, RefObject } from 'react';

type UsePrefetchOnScrollOptions<TData = unknown, TElement extends HTMLElement = HTMLElement> = {
  ref: RefObject<TElement>;
  fetchFn: () => Promise<TData | null>;
  isFetching: boolean;
  deltaFromBottom: number;
  fetchedCount?: number;
  totalFetchableCount?: number;
};

type UsePrefetchOnScrollResult<TData = unknown> = [boolean, () => TData];

export function usePrefetchOnScroll({
  ref,
  fetchFn,
  isFetching,
  deltaFromBottom,
  fetchedCount,
  totalFetchableCount,
}: UsePrefetchOnScrollOptions): UsePrefetchOnScrollResult {
  const element = ref.current;

  const prefetchOnScroll = useCallback(async () => {
    if (element) {
      const { scrollHeight, scrollTop, clientHeight } = element;
      const currentDeltaFromBottom = scrollHeight - scrollTop - clientHeight;

      const hasMoreToFetch = (fetchedCount && totalFetchableCount)
        ? fetchedCount < totalFetchableCount
        : true;

      const shouldFetch = currentDeltaFromBottom < deltaFromBottom
        && !isFetching
        && hasMoreToFetch;

      // once the user has scrolled within `delta` px of the bottom of the table, fetch more data if we can
      if (shouldFetch) {
        return fetchFn();
      }
    }
    return null;
  }, [element, fetchFn, isFetching, deltaFromBottom, fetchedCount, totalFetchableCount]);

  // a check on mount and after a fetch to see if the table is already scrolled to the bottom and immediately needs to fetch more data
  useEffect(() => {
    // TODO BUG runs over and over when all rows visible on screen, tries to fetch more over and over without terminating
    void prefetchOnScroll();
  }, [prefetchOnScroll]);

  return [isFetching, prefetchOnScroll];
}
