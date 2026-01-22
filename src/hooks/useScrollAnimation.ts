import { useEffect, useRef, useState, useMemo } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = false,
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  
  // 옵션을 메모이제이션하여 불필요한 재생성 방지
  const observerOptions = useMemo(
    () => ({
      threshold,
      rootMargin,
    }),
    [threshold, rootMargin]
  );

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      observerOptions
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [triggerOnce, observerOptions]);

  return { elementRef, isVisible };
};

