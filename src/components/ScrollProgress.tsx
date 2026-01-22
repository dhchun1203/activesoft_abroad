import { useState, useEffect, memo, FC } from 'react';
import { throttle } from '../utils/throttle';
import '../styles/ScrollProgress.css';

const ScrollProgress: FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = throttle(() => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollableHeight = documentHeight - windowHeight;
      const progress = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;
      setScrollProgress(progress);
    }, 16); // 약 60fps

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
    };
  }, []);

  return (
    <div className="scroll-progress-container">
      <div
        className="scroll-progress-bar"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};

const MemoizedScrollProgress = memo(ScrollProgress);
MemoizedScrollProgress.displayName = 'ScrollProgress';

export default MemoizedScrollProgress;

