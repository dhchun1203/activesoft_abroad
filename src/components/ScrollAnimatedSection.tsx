import { FC, ReactNode } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import '../styles/ScrollAnimatedSection.css';

interface ScrollAnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animationType?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight';
  delay?: number;
}

const ScrollAnimatedSection: FC<ScrollAnimatedSectionProps> = ({
  children,
  className = '',
  animationType = 'fadeUp',
  delay = 0,
}) => {
  const { elementRef, isVisible } = useScrollAnimation({ triggerOnce: true });

  return (
    <div
      ref={elementRef}
      className={`scroll-animated ${className} ${isVisible ? `animate-${animationType}` : ''}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default ScrollAnimatedSection;

