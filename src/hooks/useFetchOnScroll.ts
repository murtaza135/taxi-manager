import { useCallback, useRef, RefObject } from 'react';

type UseFetchOnScrollOptions<TData = unknown> = {
  fetchNext: () => Promise<TData | null>;
  hasMore: boolean;
  fetchCondition?: boolean;
  scrollThreshold?: number;
};

type UseFetchOnScrollResult<
  TElement extends HTMLElement = HTMLElement,
  TData = unknown,
> = {
  ref: RefObject<TElement>;
  fetchOnScroll: () => Promise<TData | null>;
};

export function useFetchOnScroll<
  TElement extends HTMLElement = HTMLElement,
  TData = unknown,
>({
  fetchNext,
  hasMore,
  fetchCondition = true,
  scrollThreshold = 0,
}: UseFetchOnScrollOptions<TData>): UseFetchOnScrollResult<TElement, TData> {
  const ref = useRef<TElement>(null);

  const fetchOnScroll = useCallback(async () => {
    const element = ref.current;
    if (element) {
      const { scrollHeight, scrollTop, clientHeight } = element;
      const currentDeltaFromBottom = scrollHeight - scrollTop - clientHeight;

      const shouldFetch = clientHeight !== 0
        && currentDeltaFromBottom <= scrollThreshold
        && hasMore
        && fetchCondition;

      if (shouldFetch) {
        return fetchNext();
      }
    }
    return null;
  }, [ref, fetchNext, hasMore, fetchCondition, scrollThreshold]);

  return { ref, fetchOnScroll } as const;
}
