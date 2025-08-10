import { useEffect, useRef, useCallback } from "react";

export const useInfiniteScroll = (onIntersect: () => void) => {
  const observerRef = useRef<IntersectionObserver>(null);
  const lastElementRef = useRef<HTMLElement>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        onIntersect();
      }
    },
    [onIntersect]
  );

  const setLastElement = useCallback(
    (node: HTMLElement | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      lastElementRef.current = node;

      if (node) {
        observerRef.current = new IntersectionObserver(handleObserver);
        observerRef.current.observe(node);
      }
    },
    [handleObserver]
  );

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return { setLastElement };
};
