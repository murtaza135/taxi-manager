import { useCallback, RefObject } from 'react';

type UsePrefetchOnScrollOptions<TData = unknown, TElement extends HTMLElement = HTMLElement> = {
  ref: RefObject<TElement>;
  fetchFn: () => Promise<TData | null>;
  isFetching: boolean;
  deltaFromBottom: number;
  fetchedCount: number;
  totalFetchableCount: number;
};

type UsePrefetchOnScrollResult<TData = unknown> = [boolean, () => Promise<TData | null>];

export function usePrefetchOnScroll<TData = unknown, TElement extends HTMLElement = HTMLElement>({
  ref,
  fetchFn,
  isFetching,
  deltaFromBottom,
  fetchedCount,
  totalFetchableCount,
}: UsePrefetchOnScrollOptions<TData, TElement>): UsePrefetchOnScrollResult<TData> {
  const element = ref.current;

  const prefetchOnScroll = useCallback(async () => {
    if (element) {
      const { scrollHeight, scrollTop, clientHeight } = element;
      const currentDeltaFromBottom = scrollHeight - scrollTop - clientHeight;

      const shouldFetch = currentDeltaFromBottom < deltaFromBottom
        && !isFetching
        && fetchedCount < totalFetchableCount;

      if (shouldFetch) {
        return fetchFn();
      }
    }
    return null;
  }, [element, fetchFn, isFetching, deltaFromBottom, fetchedCount, totalFetchableCount]);

  return [isFetching, prefetchOnScroll] as const;
}
