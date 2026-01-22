import { useState, useEffect, useCallback, memo, FC } from 'react';
import { throttle } from '../utils/throttle';
import '../styles/ScrollToTop.css';

const ScrollToTop: FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = throttle(() => {
      setIsVisible(window.scrollY > 300);
    }, 100);

    window.addEventListener('scroll', toggleVisibility, { passive: true });

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <button
      className={`scroll-to-top ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
      aria-label="맨 위로 이동"
      title="맨 위로 이동"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
};

const MemoizedScrollToTop = memo(ScrollToTop);
MemoizedScrollToTop.displayName = 'ScrollToTop';

export default MemoizedScrollToTop;

