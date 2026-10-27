import { useEffect, useRef, useState, type ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  as?: 'div' | 'li';
}

// Fades/slides an element in once it scrolls into view. Keeps the element in
// its normal flow (no layout shift) — only opacity/transform animate.
const Reveal = ({ children, className = '', delayMs = 0, as = 'div' }: RevealProps) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Tag = as;

  return (
    <Tag
      ref={ref as never}
      className={`reveal ${isVisible ? 'in-view' : ''} ${className}`}
      style={isVisible ? { animationDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
