import { useEffect, useState, RefObject } from 'react';

interface UseIntersectionObserverProps {
  elementRef: RefObject<Element>;
  threshold?: number;
  rootMargin?: string;
}

export function useIntersectionObserver({
  elementRef,
  threshold = 0.5,
  rootMargin = '0px'
}: UseIntersectionObserverProps): boolean {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [elementRef, threshold, rootMargin]);

  return isIntersecting;
}
