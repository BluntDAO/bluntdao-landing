import React, { ReactNode } from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

interface LazyLoadProps {
  children: ReactNode;
  fallback?: ReactNode;
  threshold?: number;
  rootMargin?: string;
}

const LazyLoad: React.FC<LazyLoadProps> = ({ 
  children, 
  fallback,
  threshold = 0.1,
  rootMargin = '100px'
}) => {
  const { targetRef, isIntersecting } = useIntersectionObserver({
    threshold,
    rootMargin,
    triggerOnce: true,
  });

  return (
    <div ref={targetRef}>
      {isIntersecting ? children : (fallback || <div style={{ height: '200px' }} />)}
    </div>
  );
};

export default LazyLoad;
