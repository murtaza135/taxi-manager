import { useCallback, useRef, RefObject } from 'react';

type UsePrefetchOnScrollOptions<TData = unknown> = {
  fetchFn: () => Promise<TData | null>;
  isFetching: boolean;
  deltaFromBottom: number;
  fetchedCount: number;
  totalFetchableCount: number;
};

type UsePrefetchOnScrollResult<TElement extends HTMLElement = HTMLElement, TData = unknown> = {
  ref: RefObject<TElement>;
  isFetching: boolean;
  prefetchOnScroll: () => Promise<TData | null>;
};

export function usePrefetchOnScroll<TElement extends HTMLElement = HTMLElement, TData = unknown>({
  fetchFn,
  isFetching,
  deltaFromBottom,
  fetchedCount,
  totalFetchableCount,
}: UsePrefetchOnScrollOptions<TData>): UsePrefetchOnScrollResult<TElement, TData> {
  const ref = useRef<TElement>(null);

  const prefetchOnScroll = useCallback(async () => {
    if (ref.current) {
      const { scrollHeight, scrollTop, clientHeight } = ref.current;
      const currentDeltaFromBottom = scrollHeight - scrollTop - clientHeight;

      const shouldFetch = currentDeltaFromBottom < deltaFromBottom
        && !isFetching
        && fetchedCount < totalFetchableCount;

      if (shouldFetch) {
        return fetchFn();
      }
    }
    return null;
  }, [ref, fetchFn, isFetching, deltaFromBottom, fetchedCount, totalFetchableCount]);

  return { ref, isFetching, prefetchOnScroll } as const;
}
